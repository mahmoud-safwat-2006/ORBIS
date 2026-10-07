import {useRef, useState} from 'react'
import {Keyboard, Pressable, type TextInput, View} from 'react-native'
import Svg, {Path} from 'react-native-svg'
import {LexAuthFactorError} from '@atproto/lex-password-session'
import {Trans, useLingui} from '@lingui/react/macro'

import {DEFAULT_SERVICE, HITSLOP_10, HITSLOP_20} from '#/lib/constants'
import {useRequestNotificationsPermission} from '#/lib/notifications/notifications'
import {cleanError, isNetworkError} from '#/lib/strings/errors'
import {createFullHandle} from '#/lib/strings/handles'
import {isORBISHostedUrl, toNiceHostingUrl} from '#/lib/strings/url-helpers'
import {logger} from '#/logger'
import {useSetHasCheckedForStarterPack} from '#/state/preferences/used-starter-packs'
import {
  type HostingProviderState,
  useHostingProvider,
} from '#/state/queries/pds-detection'
import {useSession, useSessionApi} from '#/state/session'
import {useLoggedOutViewControls} from '#/state/shell/logged-out'
import {atoms as a, native, tokens, useBreakpoints, useTheme} from '#/alf'
import * as Admonition from '#/components/Admonition'
import {Button, ButtonIcon, ButtonText} from '#/components/Button'
import {useDialogControl} from '#/components/Dialog'
import * as TextField from '#/components/forms/TextField'
import {At_Stroke2_Corner0_Rounded as AtIcon} from '#/components/icons/At'
import {TinyChevronBottom_Stroke2_Corner0_Rounded as TinyChevronIcon} from '#/components/icons/Chevron'
import {Envelope_Stroke2_Corner0_Rounded as EmailIcon} from '#/components/icons/Envelope'
import {Eye_Stroke2_Corner0_Rounded as EyeIcon} from '#/components/icons/Eye'
import {EyeSlash_Stroke2_Corner0_Rounded as EyeSlashIcon} from '#/components/icons/EyeSlash'
import {Lock_Stroke2_Corner0_Rounded as LockIcon} from '#/components/icons/Lock'
import {Ticket_Stroke2_Corner0_Rounded as TicketIcon} from '#/components/icons/Ticket'
import {createStaticClick, InlineLinkText} from '#/components/Link'
import {Loader} from '#/components/Loader'
import {Text} from '#/components/Typography'
import {IS_IOS, IS_NATIVE} from '#/env'
import {type com} from '#/lexicons'
import {ConfirmHostingProviderDialog} from './components/ConfirmHostingProviderDialog'
import {HostingProviderDialog} from './components/HostingProviderDialog'
import {FormContainer} from './FormContainer'

type ServiceDescription = com.atproto.server.describeServer.$OutputBody

export const LoginForm = ({
  error,
  serviceUrl,
  serviceDescription,
  initialHandle,
  setError,
  setServiceUrl,
  onPressRetryConnect,
  onPressBack,
  onPressForgotPassword,
  onAttemptSuccess,
  onAttemptFailed,
  onPressCreateAccount,
}: {
  error: string
  serviceUrl: string
  serviceDescription: ServiceDescription | undefined
  initialHandle: string
  setError: (v: string) => void
  setServiceUrl: (v: string) => void
  onPressRetryConnect: () => void
  onPressBack: () => void
  onPressForgotPassword: () => void
  onAttemptSuccess: () => void
  onAttemptFailed: () => void
  onPressCreateAccount: () => void
}) => {
  const t = useTheme()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorField, setErrorField] = useState<
    'none' | 'identifier' | 'password' | '2fa'
  >('none')
  const [isAuthFactorTokenNeeded, setIsAuthFactorTokenNeeded] = useState(false)
  const [showResolveError, setShowResolveError] = useState(false)
  const identifierValueRef = useRef(initialHandle || '')
  const passwordValueRef = useRef('')
  const [identifier, setIdentifier] = useState(initialHandle || '')
  const [identifierFocused, setIdentifierFocused] = useState(false)
  const [authFactorToken, setAuthFactorToken] = useState('')
  const identifierRef = useRef<React.ComponentRef<typeof TextInput>>(null)
  const passwordRef = useRef<React.ComponentRef<typeof TextInput>>(null)
  const hasFocusedOnce = useRef(false)
  const [hasPassword, setHasPassword] = useState(false)
  const [revealPassword, setRevealPassword] = useState(false)
  const {t: l} = useLingui()
  const {login} = useSessionApi()
  const {accounts} = useSession()
  const requestNotificationsPermission = useRequestNotificationsPermission()
  const {setShowLoggedOut} = useLoggedOutViewControls()
  const setHasCheckedForStarterPack = useSetHasCheckedForStarterPack()
  const serverInputControl = useDialogControl()
  const confirmHostingProviderControl = useDialogControl()
  const [pendingLogin, setPendingLogin] = useState<{
    service: string
    fullIdent: string
    passwordLength: number
  } | null>(null)
  const hostingProvider = useHostingProvider({
    identifier,
    defaultService: serviceUrl,
  })
  const {gtMobile} = useBreakpoints()

  const showUnresolvedError =
    hostingProvider.state.status === 'unresolved' && !identifierFocused

  const attemptLogin = async (service: string, fullIdent: string) => {
    const password = passwordValueRef.current
    setIsProcessing(true)

    try {
      await login(
        {
          service,
          identifier: fullIdent,
          password,
          authFactorToken: authFactorToken.trim(),
        },
        'LoginForm',
      )
      onAttemptSuccess()
      setShowLoggedOut(false)
      setHasCheckedForStarterPack(true)
      void requestNotificationsPermission('Login')
    } catch (err) {
      const errMsg = String(err)
      setIsProcessing(false)
      if (err instanceof LexAuthFactorError) {
        setIsAuthFactorTokenNeeded(true)
      } else {
        onAttemptFailed()
        if (errMsg.includes('Token is invalid')) {
          logger.debug('Failed to login due to invalid 2fa token', {
            error: errMsg,
          })
          setError(l`Invalid 2FA confirmation code.`)
          setErrorField('2fa')
        } else if (
          errMsg.includes('Authentication Required') ||
          errMsg.includes('Invalid identifier or password')
        ) {
          logger.debug('Failed to login due to invalid credentials', {
            error: errMsg,
          })
          setError(l`Incorrect username or password`)
        } else if (isNetworkError(err)) {
          logger.warn('Failed to login due to network error', {error: errMsg})
          setError(
            l`Unable to contact your service. Please check your Internet connection.`,
          )
        } else {
          logger.warn('Failed to login', {error: errMsg})
          setError(cleanError(err))
        }
      }
    }
  }

  const onPressNext = async () => {
    if (isProcessing) return
    Keyboard.dismiss()
    setError('')
    setErrorField('none')
    setShowResolveError(false)

    const identifier = identifierValueRef.current.toLowerCase().trim()
    const password = passwordValueRef.current

    if (!identifier) {
      setError(l`Please enter your username`)
      setErrorField('identifier')
      return
    }

    if (!password) {
      setError(l`Please enter your password`)
      setErrorField('password')
      return
    }

    setIsProcessing(true)

    let fullIdent = identifier
    if (
      !identifier.includes('@') &&
      !identifier.includes('.') &&
      !identifier.startsWith('did:') &&
      serviceDescription &&
      serviceDescription.availableUserDomains.length > 0
    ) {
      let matched = false
      for (const domain of serviceDescription.availableUserDomains) {
        if (fullIdent.endsWith(domain)) {
          matched = true
        }
      }
      if (!matched) {
        fullIdent = createFullHandle(
          identifier,
          serviceDescription.availableUserDomains[0],
        )
      }
    }

    let resolution: Awaited<ReturnType<typeof hostingProvider.resolveService>>
    try {
      resolution = await hostingProvider.resolveService(identifier)
    } catch (err) {
      logger.debug('Failed to resolve hosting provider', {error: String(err)})
      setIsProcessing(false)
      setShowResolveError(true)
      return
    }
    const {service, did} = resolution

    const isKnownAccount =
      did != null && accounts.some(account => account.did === did)
    const needsConfirmation =
      !isORBISHostedUrl(service) &&
      hostingProvider.state.status !== 'overridden' &&
      !isKnownAccount

    if (needsConfirmation) {
      setIsProcessing(false)
      setPendingLogin({service, fullIdent, passwordLength: password.length})
      confirmHostingProviderControl.open()
      return
    }

    await attemptLogin(service, fullIdent)
  }

  return (
    <FormContainer testID="loginForm" titleText={<Trans>Sign in</Trans>}>
      <HostingProviderDialog
        control={serverInputControl}
        currentOverride={
          hostingProvider.state.status === 'overridden'
            ? hostingProvider.state.pdsUrl
            : null
        }
        isEmail={hostingProvider.state.status === 'email'}
        onSelectManual={url => {
          hostingProvider.override(url)
          setServiceUrl(url)
        }}
        onSelectAutomatic={() => {
          hostingProvider.clearOverride()
          setServiceUrl(DEFAULT_SERVICE)
        }}
      />
      <ConfirmHostingProviderDialog
        control={confirmHostingProviderControl}
        host={toNiceHostingUrl(pendingLogin?.service ?? '')}
        identifier={pendingLogin?.fullIdent ?? ''}
        passwordLength={pendingLogin?.passwordLength ?? 0}
        onConfirm={() => {
          if (pendingLogin) {
            void attemptLogin(pendingLogin.service, pendingLogin.fullIdent)
          }
        }}
      />

      {/* ORBIS Social Auth Buttons */}
      <View style={{gap: 12, marginBottom: 16}}>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            window.location.href = 'https://accounts.google.com'
          }}
          style={({pressed}) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            backgroundColor: pressed ? '#F8FAFC' : '#FAFAFA',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            cursor: 'pointer',
          })}>
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.04h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
            />
            <Path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.04c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.27 21.39 7.33 24 12 24z"
            />
            <Path
              fill="#FBBC05"
              d="M5.28 14.28c-.25-.72-.38-1.49-.38-2.28s.13-1.56.38-2.28V6.59H1.26C.46 8.19 0 9.99 0 12s.46 3.81 1.26 5.41l4.02-3.13z"
            />
            <Path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.26 6.59l4.02 3.13c.95-2.83 3.6-4.97 6.72-4.97z"
            />
          </Svg>
          <Text style={{fontSize: 15, fontWeight: '600', color: '#1E293B'}}>
            Continue with Google
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            window.location.href = 'https://www.facebook.com'
          }}
          style={({pressed}) => ({
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            backgroundColor: pressed ? '#F8FAFC' : '#FAFAFA',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 16,
            cursor: 'pointer',
          })}>
          <Svg width={20} height={20} viewBox="0 0 24 24">
            <Path
              fill="#1877F2"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </Svg>
          <Text style={{fontSize: 15, fontWeight: '600', color: '#1E293B'}}>
            Continue with Facebook
          </Text>
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 6,
            gap: 12,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#E2E8F0'}} />
          <Text
            style={{
              fontSize: 11,
              fontWeight: '700',
              color: '#94A3B8',
              letterSpacing: 0.5,
            }}>
            OR CONTINUE WITH ACCOUNT
          </Text>
          <View style={{flex: 1, height: 1, backgroundColor: '#E2E8F0'}} />
        </View>
      </View>

      <View>
        <TextField.LabelText>
          <Trans>Username or email</Trans>
        </TextField.LabelText>
        <TextField.Root
          isInvalid={errorField === 'identifier' || showUnresolvedError}>
          <TextField.Icon
            icon={hostingProvider.state.status === 'email' ? EmailIcon : AtIcon}
          />
          <TextField.Input
            testID="loginUsernameInput"
            inputRef={identifierRef}
            label={l`Username or email address`}
            placeholder={null}
            autoCapitalize="none"
            autoFocus={!IS_IOS && !initialHandle}
            autoCorrect={false}
            autoComplete="username"
            returnKeyType="next"
            textContentType="username"
            defaultValue={initialHandle || ''}
            onChangeText={v => {
              identifierValueRef.current = v
              setIdentifier(v)
              if (errorField) setErrorField('none')
              if (showResolveError) setShowResolveError(false)
            }}
            onFocus={() => setIdentifierFocused(true)}
            onBlur={() => setIdentifierFocused(false)}
            onSubmitEditing={() => {
              passwordRef.current?.focus()
            }}
            blurOnSubmit={false}
            editable={!isProcessing}
            accessibilityHint={l`Enter the username or email address you used when you created your account`}
          />
        </TextField.Root>
        {showUnresolvedError && (
          <Text
            style={[
              a.text_sm,
              a.leading_snug,
              a.mt_sm,
              {color: t.palette.negative_500},
            ]}>
            <Trans>
              We couldn't find an account with that username. Please check that
              you've typed it correctly, or{' '}
              <InlineLinkText
                label={l`set your hosting provider manually`}
                style={[a.text_sm, a.leading_snug]}
                {...createStaticClick(() => serverInputControl.open())}>
                set your hosting provider manually
              </InlineLinkText>
              .
            </Trans>
          </Text>
        )}
      </View>

      <View>
        <TextField.LabelText>
          <Trans>Password</Trans>
        </TextField.LabelText>
        <TextField.Root isInvalid={errorField === 'password'}>
          <TextField.Icon icon={LockIcon} />
          <TextField.Input
            testID="loginPasswordInput"
            inputRef={passwordRef}
            label={l`Password`}
            placeholder={null}
            autoCapitalize="none"
            autoFocus={!IS_IOS && !!initialHandle}
            autoCorrect={false}
            autoComplete="current-password"
            returnKeyType="done"
            enablesReturnKeyAutomatically={true}
            secureTextEntry={!revealPassword}
            onChangeText={v => {
              passwordValueRef.current = v
              if (errorField) setErrorField('none')
              setHasPassword(!!v)
            }}
            onSubmitEditing={() => void onPressNext()}
            blurOnSubmit={false}
            editable={!isProcessing}
            accessibilityHint={l`Enter your password`}
            onLayout={
              IS_IOS
                ? () => {
                    if (hasFocusedOnce.current) return
                    hasFocusedOnce.current = true
                    if (initialHandle) {
                      passwordRef.current?.focus()
                    } else {
                      identifierRef.current?.focus()
                    }
                  }
                : undefined
            }
            hitSlop={{...HITSLOP_20, right: 0}}
          />
          <RevealPasswordButton
            active={revealPassword}
            hasPassword={hasPassword}
            onPress={() => setRevealPassword(r => !r)}
          />
        </TextField.Root>

        {!isAuthFactorTokenNeeded && (
          <Button
            label={l`Forgot password?`}
            accessibilityHint={l`Reset your password by sending a code to your email`}
            style={[a.mt_md, a.self_start]}
            hoverStyle={{opacity: 0.5}}
            hitSlop={HITSLOP_10}
            onPress={onPressForgotPassword}>
            <ButtonText style={[t.atoms.text_contrast_medium]}>
              <Trans>Forgot password?</Trans>
            </ButtonText>
          </Button>
        )}
      </View>

      {isAuthFactorTokenNeeded && (
        <View>
          <TextField.LabelText>
            <Trans>2FA Confirmation</Trans>
          </TextField.LabelText>
          <TextField.Root isInvalid={errorField === '2fa'}>
            <TextField.Icon icon={TicketIcon} />
            <TextField.Input
              testID="loginAuthFactorTokenInput"
              label={l`Confirmation code`}
              autoCapitalize="none"
              autoFocus
              autoCorrect={false}
              autoComplete="one-time-code"
              returnKeyType="done"
              blurOnSubmit={false}
              value={authFactorToken}
              onChangeText={text => {
                setAuthFactorToken(text)
                if (errorField) setErrorField('none')
              }}
              onSubmitEditing={() => void onPressNext()}
              editable={!isProcessing}
              accessibilityHint={l`Input the code which has been emailed to you`}
              style={{
                textTransform: authFactorToken === '' ? 'none' : 'uppercase',
              }}
            />
          </TextField.Root>
          <Text style={[a.text_sm, t.atoms.text_contrast_medium, a.mt_sm]}>
            <Trans>
              Check your email for a sign in code and enter it here.
            </Trans>
          </Text>
        </View>
      )}

      {!showUnresolvedError &&
        (showResolveError ? (
          <Admonition.Outer type="error">
            <Admonition.Row>
              <Admonition.Icon />
              <Admonition.Content>
                <Admonition.Text>
                  <Trans>
                    We couldn’t verify your network connection. Check your
                    internet connection, or{' '}
                    <InlineLinkText
                      label={l`Set network manually`}
                      style={[a.text_sm, a.leading_snug]}
                      {...createStaticClick(() => serverInputControl.open())}>
                      set network manually
                    </InlineLinkText>
                    .
                  </Trans>
                </Admonition.Text>
              </Admonition.Content>
            </Admonition.Row>
          </Admonition.Outer>
        ) : (
          error && (
            <Admonition.Admonition type="error">{error}</Admonition.Admonition>
          )
        ))}

      <View
        style={[
          a.pt_md,
          gtMobile && [a.justify_between, a.flex_row, a.gap_sm],
        ]}>
        {gtMobile && (
          <>
            <Button
              label={l`Back`}
              color="secondary"
              size="large"
              onPress={onPressBack}>
              <ButtonText>
                <Trans>Back</Trans>
              </ButtonText>
            </Button>

            <View style={[a.flex_shrink, a.justify_center, a.ml_auto]}>
              <HostingProviderIndicator
                state={hostingProvider.state}
                onPress={() => serverInputControl.open()}
              />
            </View>
          </>
        )}
        {!serviceDescription && error ? (
          <Button
            testID="loginRetryButton"
            label={l`Retry`}
            accessibilityHint={l`Retries signing in`}
            color="primary_subtle"
            size="large"
            onPress={onPressRetryConnect}>
            <ButtonText>
              <Trans>Retry</Trans>
            </ButtonText>
          </Button>
        ) : !serviceDescription ? (
          <Button
            label={l`Connecting to service…`}
            size="large"
            color="secondary"
            disabled>
            <ButtonIcon icon={Loader} />
            <ButtonText>
              <Trans>Connecting…</Trans>
            </ButtonText>
          </Button>
        ) : (
          <Button
            testID="loginNextButton"
            label={l`Sign in`}
            accessibilityHint={l`Navigates to the next screen`}
            color="primary"
            size="large"
            onPress={() => void onPressNext()}>
            <ButtonText>
              <Trans>Sign in</Trans>
            </ButtonText>
            {isProcessing && <ButtonIcon icon={Loader} />}
          </Button>
        )}
      </View>

      {IS_NATIVE && (
        <Text style={[a.text_md, native([a.text_center, a.mx_auto]), a.mt_sm]}>
          <Trans>
            New to ORBIS?{' '}
            <InlineLinkText
              label={l`Sign up`}
              style={[a.text_md, native(a.text_center)]}
              {...createStaticClick(() => onPressCreateAccount())}>
              Sign up
            </InlineLinkText>
          </Trans>
        </Text>
      )}

      {!gtMobile && (
        <HostingProviderIndicator
          state={hostingProvider.state}
          onPress={() => serverInputControl.open()}
        />
      )}
    </FormContainer>
  )
}

function RevealPasswordButton({
  active,
  hasPassword,
  onPress,
}: {
  active: boolean
  hasPassword: boolean
  onPress: () => void
}) {
  const t = useTheme()
  const {t: l} = useLingui()
  const context = TextField.useTextFieldContext()

  const Icon = active ? EyeSlashIcon : EyeIcon

  if (!hasPassword && !context.focused) return null

  return (
    <View style={[a.z_10, a.pl_sm, {marginRight: tokens.space.xs * -1}]}>
      <Button
        testID="showPasswordButton"
        onPress={onPress}
        label={active ? l`Hide password` : l`Reveal password`}
        color="secondary"
        size="small"
        shape="round"
        style={[a.bg_transparent]}
        hitSlop={tokens.space.sm}>
        <Icon
          size="md"
          style={[
            context.focused ? t.atoms.text : t.atoms.text_contrast_medium,
          ]}
        />
      </Button>
    </View>
  )
}

function HostingProviderIndicator({
  state,
  onPress,
}: {
  state: HostingProviderState
  onPress: () => void
}) {
  const t = useTheme()
  const {t: l} = useLingui()
  const {gtMobile} = useBreakpoints()

  return null
}

