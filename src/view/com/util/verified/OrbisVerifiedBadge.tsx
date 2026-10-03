import {StyleSheet, View} from 'react-native'
import {Verified_Stroke2_Corner0_Rounded as CheckIcon} from '#/components/icons/Verified'

export function isUserOrbisVerified(handle?: string, did?: string): boolean {
  if (!handle && !did) return false
  const h = (handle || '').toLowerCase()
  // حسابك محمود صفوت فقط هو الموثق رسمياً دائماً
  if (
    h.includes('mahmoud') ||
    h.includes('safwat') ||
    h === 'mahmoud-safwat.bsky.social'
  ) {
    return true
  }
  return false
}

export function OrbisVerifiedBadge({
  handle,
  did,
  size = 16,
}: {
  handle?: string
  did?: string
  size?: number
}) {
  if (!isUserOrbisVerified(handle, did)) {
    return null
  }

  return (
    <View style={[styles.badge, {width: size, height: size, borderRadius: size / 2}]}>
      <CheckIcon size="xs" fill="#0084FF" />
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    marginLeft: 4,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
})