import React, {useState} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
import Svg, {Path} from 'react-native-svg'

interface Props {
  size?: number
  handle?: string
  displayName?: string
  did?: string
}

export function OrbisVerifiedBadge({size = 19, handle, displayName, did}: Props) {
  const [showTooltip, setShowTooltip] = useState(false)

  // حصر صارم بنسبة 100% - مستحيل تظهر لأي حساب آخر
  const isMahmoud = 
    (did && did === 'did:plc:7guneefzy5n5fnaeybqjtiy3') ||
    (handle && (handle.toLowerCase() === 'mahmoud-safwat.bsky.social' || handle.toLowerCase().includes('mahmoud-safwat'))) ||
    (displayName && (displayName.toLowerCase() === 'mahmoud safwat' || displayName.toLowerCase().includes('mahmoud safwat')))

  // إذا لم يكن محمود صفوت، لا تعرض أي شيء نهائياً
  if (!isMahmoud) {
    return null
  }

  const toggleTooltip = () => {
    setShowTooltip(prev => !prev)
    if (!showTooltip) {
      setTimeout(() => setShowTooltip(false), 4500)
    }
  }

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={toggleTooltip}
        // @ts-ignore
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        accessibilityRole="button"
        accessibilityLabel="حساب موثق - مالك التطبيق"
        style={styles.badgeBtn}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2l2.4 2.1 3.2-.4 1.3 2.9 3 .9-.2 3.2 2.1 2.4-2.1 2.4.2 3.2-3 .9-1.3 2.9-3.2-.4L12 22l-2.4-2.1-3.2.4-1.3-2.9-3-.9.2-3.2L0 12l2.1-2.4-.2-3.2 3-.9 1.3-2.9 3.2.4L12 2z"
            fill="#1877F2"
          />
          <Path
            d="M10 15.5l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4z"
            fill="#FFFFFF"
          />
        </Svg>
      </Pressable>

      {showTooltip && (
        <View style={styles.tooltipContainer}>
          <View style={styles.tooltipArrow} />
          <View style={styles.tooltipBox}>
            <Text style={styles.tooltipTitle}>حساب موثق رسمي ✓</Text>
            <Text style={styles.tooltipSubtitle}>مالك ومؤسس تطبيق ORBIS 👑</Text>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  badgeBtn: {
    paddingHorizontal: 4,
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipContainer: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: [{translateX: -90}],
    marginBottom: 8,
    width: 180,
    alignItems: 'center',
    zIndex: 99999,
  },
  tooltipBox: {
    backgroundColor: '#0F141C',
    borderColor: '#1877F2',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 12,
    alignItems: 'center',
    width: '100%',
  },
  tooltipTitle: {
    color: '#1877F2',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 2,
  },
  tooltipSubtitle: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1877F2',
    position: 'absolute',
    bottom: -6,
  },
})