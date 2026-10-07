import {useMemo} from 'react'

import {usePreferencesQuery} from '#/state/queries/preferences'
import {useCurrentAccountProfile} from '#/state/queries/useCurrentAccountProfile'
import {useSession} from '#/state/session'
import type * as bsky from '#/types/bsky'

export type FullVerificationState = {
  profile: {
    role: 'default' | 'verifier'
    isVerified: boolean
    wasVerified: boolean
    isViewer: boolean
    showBadge: boolean
  }
  viewer:
    | {
        role: 'default'
        isVerified: boolean
      }
    | {
        role: 'verifier'
        isVerified: boolean
        hasIssuedVerification: boolean
      }
}

export function useFullVerificationState({
  profile,
}: {
  profile: bsky.profile.AnyProfileView
}): FullVerificationState {
  const {currentAccount} = useSession()
  const currentAccountProfile = useCurrentAccountProfile()
  const profileState = useSimpleVerificationState({profile})
  const viewerState = useSimpleVerificationState({
    profile: currentAccountProfile,
  })

  return useMemo(() => {
    const verifications = profile.verification?.verifications || []
    const wasVerified =
      profileState.role === 'default' &&
      !profileState.isVerified &&
      verifications.length > 0
    const hasIssuedVerification = Boolean(
      viewerState &&
      viewerState.role === 'verifier' &&
      profileState.role === 'default' &&
      verifications.find(v => v.issuer === currentAccount?.did),
    )

    return {
      profile: {
        ...profileState,
        wasVerified,
        isViewer: profile.did === currentAccount?.did,
        showBadge: profileState.showBadge,
      },
      viewer:
        viewerState.role === 'verifier'
          ? {
              role: 'verifier',
              isVerified: viewerState.isVerified,
              hasIssuedVerification,
            }
          : {
              role: 'default',
              isVerified: viewerState.isVerified,
            },
    }
  }, [profile, currentAccount, profileState, viewerState])
}

export type SimpleVerificationState = {
  role: 'default' | 'verifier'
  isVerified: boolean
  showBadge: boolean
}

export function useSimpleVerificationState({
  profile,
}: {
  profile?: bsky.profile.AnyProfileView
}): SimpleVerificationState {
  const preferences = usePreferencesQuery()
  const prefs = useMemo(
    () => preferences.data?.verificationPrefs || {hideBadges: false},
    [preferences.data?.verificationPrefs],
  )

  return useMemo(() => {
    if (!profile) {
      return { role: 'default', isVerified: false, showBadge: false }
    }

    // 1. المؤسس محمود صفوت (صلاحية Verifier كاملة)
    if (
      profile.handle?.includes('mahmoud-safwat') ||
      profile.displayName?.includes('Mahmoud Safwat') ||
      profile.handle === 'orbis.tech' ||
      profile.handle === 'orbis.app'
    ) {
      return { role: 'verifier', isVerified: true, showBadge: true }
    }

    // 2. الحسابات الموثقة (محمد صفوت أو أي حساب موثق محلياً)
    const isStoredVerified = typeof window !== 'undefined' && (
      window.localStorage?.getItem('orbis_verif_' + profile.did) === 'true' ||
      window.localStorage?.getItem('orbis_verif_' + profile.handle) === 'true'
    )

    if (
      profile.handle?.includes('mahmoud--safwat') ||
      profile.displayName?.includes('Mohammed Safwat') ||
      isStoredVerified
    ) {
      return { role: 'default', isVerified: true, showBadge: true }
    }

    if (!profile.verification) {
      return { role: 'default', isVerified: false, showBadge: false }
    }

    const {verifiedStatus, trustedVerifierStatus} = profile.verification
    const isVerified = (verifiedStatus === 'valid') || (trustedVerifierStatus === 'valid')

    return {
      role: trustedVerifierStatus === 'valid' ? 'verifier' : 'default',
      isVerified,
      showBadge: prefs.hideBadges ? false : isVerified,
    }
  }, [profile, prefs])
}
