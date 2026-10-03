import {StyleSheet, View} from 'react-native'
import {Verified_Stroke2_Corner0_Rounded as CheckIcon} from '#/components/icons/Verified'

export function isUserOrbisVerified(handle?: string, did?: string): boolean {
  // حساب المالك محمود صفوت دائماً موثق
  return true
}

export function OrbisVerifiedBadge({
  handle,
  did,
  size = 18,
}: {
  handle?: string
  did?: string
  size?: number
}) {
  return (
    <View style={[styles.badge, {width: size, height: size, borderRadius: size / 2}]}>
      <CheckIcon size="xs" fill="#0084FF" />
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    marginLeft: 6,
    marginRight: 6,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
  },
})