import React from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import Svg, {Path, Circle} from 'react-native-svg'

export type VerifiedTier = 'personal' | 'business' | 'official'

export interface OrbisVerifiedBadgeProps {
  size?: number
  tier?: VerifiedTier
  onPress?: () => void
  style?: any
}

export function OrbisVerifiedBadge({
  size = 18,
  tier = 'personal',
  onPress,
  style,
}: OrbisVerifiedBadgeProps) {
  // Personal = ORBIS Blue, Business = Gold, Official = Cyan
  const badgeColor =
    tier === 'business'
      ? '#D97706' // Deep Gold
      : tier === 'official'
      ? '#0EA5E9' // Vivid Cyan
      : '#0085FF' // ORBIS Signature Electric Blue

  const content = (
    <View style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Scalloped Verified Seal Background */}
        <Path
          d="M12 2L14.39 4.26L17.65 3.91L18.89 6.94L21.92 8.18L21.57 11.44L23.83 13.83L21.57 16.22L21.92 19.48L18.89 20.72L17.65 23.75L14.39 23.4L12 25.66L9.61 23.4L6.35 23.75L5.11 20.72L2.08 19.48L2.43 16.22L0.17 13.83L2.43 11.44L2.08 8.18L5.11 6.94L6.35 3.91L9.61 4.26L12 2Z"
          fill={badgeColor}
          transform="scale(0.85) translate(2, 0.5)"
        />
        {/* Crisp Checkmark */}
        <Path
          d="M8.5 12.2L10.8 14.5L15.5 9.5"
          stroke="#FFFFFF"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  )

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="ORBIS Verified Badge"
        onPress={onPress}
        hitSlop={4}>
        {content}
      </Pressable>
    )
  }

  return content
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    display: 'flex',
  },
})
