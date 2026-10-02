import {useEffect, useState} from 'react'
import {Pressable, View} from 'react-native'
import Svg, {Circle, Defs, RadialGradient, Stop} from 'react-native-svg'
import {msg} from '@lingui/core/macro'
import {Trans, useLingui} from '@lingui/react/macro'

import {useWebMediaQueries} from '#/lib/hooks/useWebMediaQueries'
import {ErrorBoundary} from '#/view/com/util/ErrorBoundary'
import {Logo} from '#/view/icons/Logo'
import {
  AppClipOverlay,
  postAppClipMessage,
} from '#/screens/StarterPack/StarterPackLandingScreen'
import {atoms as a, useTheme} from '#/alf'
import {AppLanguageDropdown} from '#/components/AppLanguageDropdown'
import {Button, ButtonText} from '#/components/Button'
import {TimesLarge_Stroke2_Corner0_Rounded as TimesIcon} from '#/components/icons/Times'
import * as Layout from '#/components/Layout'
import {InlineLinkText} from '#/components/Link'
import {Text} from '#/components/Typography'

export const SplashScreen = ({
  onDismiss,
  onPressSignin,
  onPressCreateAccount,
}: {
  onDismiss?: () => void
  onPressSignin: () => void
  onPressCreateAccount: () => void
}) => {
  const {i18n} = useLingui()
  const _ = i18n._.bind(i18n)
  const t = useTheme()
  const {isTabletOrMobile: IS_WEB_MOBILE} = useWebMediaQueries()
  const [showClipOverlay, setShowClipOverlay] = useState(
    () => new URLSearchParams(window.location.search).get('clip') === 'true',
  )

  useEffect(() => {
    const getParams = new URLSearchParams(window.location.search)
    const clip = getParams.get('clip')
    if (clip === 'true') {
      postAppClipMessage({
        action: 'present',
      })
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FAFCFF',
        position: 'relative',
        overflow: 'hidden',
      }}>
      {/* Soft Cosmic Aurora Background Glow */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: -150,
          alignSelf: 'center',
          width: 700,
          height: 700,
          opacity: 0.6,
        }}>
        <Svg width="100%" height="100%" viewBox="0 0 700 700">
          <Defs>
            <RadialGradient id="aurora" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
              <Stop offset="50%" stopColor="#818CF8" stopOpacity="0.18" />
              <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle cx="350" cy="350" r="350" fill="url(#aurora)" />
        </Svg>
      </View>

      {onDismiss && (
        <Pressable
          accessibilityRole="button"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            padding: 12,
            zIndex: 100,
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.8)',
          }}
          onPress={onDismiss}>
          <TimesIcon width={22} style={t.atoms.text} />
        </Pressable>
      )}

      <Layout.Center style={[a.h_full, a.flex_1]} ignoreTabletLayoutOffset>
        <View
          testID="noSessionView"
          style={[
            a.h_full,
            a.justify_center,
            {paddingBottom: '14vh'},
            IS_WEB_MOBILE && a.pb_3xl,
            a.align_center,
            a.gap_4xl,
            a.flex_1,
          ]}>
          <ErrorBoundary>
            {/* Logo and Branding Hero Section */}
            <View style={[a.justify_center, a.align_center, {gap: 16}]}>
              <View
                style={{
                  padding: 18,
                  borderRadius: 36,
                  backgroundColor: '#FFFFFF',
                  shadowColor: '#38BDF8',
                  shadowOffset: {width: 0, height: 12},
                  shadowOpacity: 0.18,
                  shadowRadius: 28,
                  borderWidth: 1,
                  borderColor: '#F0F9FF',
                }}>
                <Logo width={86} fill="#0284C7" />
              </View>

              <Text
                style={{
                  fontSize: 40,
                  fontWeight: '800',
                  letterSpacing: 4,
                  color: '#0F172A',
                  marginTop: 6,
                }}>
                ORBIS
              </Text>

              <View style={{alignItems: 'center', gap: 6}}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#334155',
                    letterSpacing: 0.5,
                  }}>
                  Explore the Decentralized Cosmos
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#64748B',
                    fontWeight: '500',
                  }}>
                  Connect, share, and discover freely across open spheres.
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View
              testID="signinOrCreateAccount"
              style={[a.w_full, a.px_xl, a.gap_md, {maxWidth: 340}]}>
              <Button
                testID="createAccountButton"
                onPress={onPressCreateAccount}
                label={_(msg`Create new account`)}
                accessibilityHint={_(msg`Opens flow to create a new account`)}
                size="large"
                variant="solid"
                style={{
                  backgroundColor: '#0284C7',
                  borderRadius: 14,
                  paddingVertical: 14,
                  shadowColor: '#0284C7',
                  shadowOffset: {width: 0, height: 6},
                  shadowOpacity: 0.25,
                  shadowRadius: 12,
                }}>
                <ButtonText
                  style={{color: '#FFFFFF', fontSize: 16, fontWeight: '700'}}>
                  <Trans>Create account</Trans>
                </ButtonText>
              </Button>

              <Button
                testID="signInButton"
                onPress={onPressSignin}
                label={_(msg`Sign in`)}
                accessibilityHint={_(
                  msg`Opens flow to sign in to your existing account`,
                )}
                size="large"
                variant="solid"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                  shadowColor: '#000000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.04,
                  shadowRadius: 4,
                }}>
                <ButtonText
                  style={{color: '#1E293B', fontSize: 16, fontWeight: '700'}}>
                  <Trans>Sign in</Trans>
                </ButtonText>
              </Button>
            </View>
          </ErrorBoundary>
        </View>

        <Footer />
      </Layout.Center>

      <AppClipOverlay
        visible={showClipOverlay}
        setIsVisible={setShowClipOverlay}
      />
    </View>
  )
}

function Footer() {
  return (
    <View
      style={[
        a.absolute,
        a.inset_0,
        {top: 'auto'},
        a.px_xl,
        a.py_lg,
        a.border_t,
        a.flex_row,
        a.align_center,
        a.flex_wrap,
        a.gap_xl,
        a.flex_1,
        {
          borderColor: 'rgba(226, 232, 240, 0.6)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        },
      ]}>
      <InlineLinkText label="About ORBIS" to="#">
        <Trans>About ORBIS</Trans>
      </InlineLinkText>
      <InlineLinkText label="Privacy & Terms" to="#">
        <Trans>Privacy & Terms</Trans>
      </InlineLinkText>
      <InlineLinkText label="Community" to="#">
        <Trans>Community</Trans>
      </InlineLinkText>

      <View style={a.flex_1} />

      <AppLanguageDropdown />
    </View>
  )
}
