import {useCallback, useEffect, useState} from 'react'
import {AccessibilityInfo, View} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {scheduleOnRN} from 'react-native-worklets'
import * as SplashScreen from 'expo-splash-screen'

import {Logo as BrandLogo} from '#/view/icons/Logo'
import {Logotype} from '#/view/icons/Logotype'
import {atoms as a} from '#/alf'
type Props = {
  isReady: boolean
}

export function Splash(props: React.PropsWithChildren<Props>) {
  'use no memo'
  const insets = useSafeAreaInsets()
  const intro = useSharedValue(0)
  const outroLogo = useSharedValue(0)
  const outroApp = useSharedValue(0)
  const outroSplashOpacity = useSharedValue(0)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const [reduceMotion, setReduceMotion] = useState<boolean | undefined>(false)
  const isReady = props.isReady && isLayoutReady && reduceMotion !== undefined

  const logoAnimation = useAnimatedStyle(() => {
    const introScale = interpolate(intro.get(), [0, 1], [0.8, 1], 'clamp')
    const outroScale =
      reduceMotion === true
        ? 1
        : interpolate(outroLogo.get(), [0, 0.08, 1], [1, 0.8, 500], 'clamp')

    const introOpacity = interpolate(intro.get(), [0, 1], [0, 1], 'clamp')
    const outroOpacity = interpolate(
      outroSplashOpacity.get(),
      [0, 0.1, 0.2, 1],
      [1, 1, 0, 0],
      'clamp',
    )

    return {
      opacity: introOpacity * outroOpacity,
      transform: [
        {translateY: -(insets.top / 2)},
        {scale: 0.1 * outroScale * introScale},
      ],
    }
  })
  const bottomLogoAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(intro.get(), [0, 1], [0, 1], 'clamp'),
    }
  })

  const splashAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        outroSplashOpacity.get(),
        [0, 0.1, 0.2, 1],
        [1, 1, 0, 0],
        'clamp',
      ),
    }
  })

  /**
   * Keep the app opaque so iOS blur/glass effects can initialize while the
   * splash hides it.
   */
  const appAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(outroApp.get(), [0, 1], [1.1, 1], 'clamp'),
        },
      ],
    }
  })

  const onFinish = useCallback(() => setIsAnimationComplete(true), [])
  const onLayout = useCallback(() => setIsLayoutReady(true), [])
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync()
        .then(() => {
          intro.set(
            withTiming(
              1,
              {duration: 400, easing: Easing.out(Easing.cubic)},
              () => {
                'worklet'
                // set these values to check animation at specific point
                outroLogo.set(
                  withTiming(
                    1,
                    {duration: 1200, easing: Easing.in(Easing.cubic)},
                    () => {
                      scheduleOnRN(onFinish)
                    },
                  ),
                )
                outroApp.set(
                  withTiming(1, {
                    duration: 1200,
                    easing: Easing.inOut(Easing.cubic),
                  }),
                )
                outroSplashOpacity.set(
                  withTiming(1, {
                    duration: 1200,
                    easing: Easing.in(Easing.cubic),
                  }),
                )
              },
            ),
          )
        })
        .catch(() => {})
    }
  }, [onFinish, intro, outroLogo, outroApp, outroSplashOpacity, isReady])

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion)
  }, [])

  return (
    <View style={{flex: 1}} onLayout={onLayout}>
      {isReady && (
        <Animated.View style={[{flex: 1}, appAnimation]}>
          {props.children}
        </Animated.View>
      )}

      {!isAnimationComplete && (
        <Animated.View
          style={[
            a.absolute,
            a.inset_0,
            {backgroundColor: '#fff'},
            splashAnimation,
          ]}>
          <Animated.View
            style={[
              bottomLogoAnimation,
              {
                position: 'absolute',
                bottom: insets.bottom + 40,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
              },
            ]}>
            <Logotype fill="#fff" width={90} />
          </Animated.View>
        </Animated.View>
      )}

      {isReady && !isAnimationComplete && (
        <Animated.View
          style={[
            a.absolute,
            a.inset_0,
            logoAnimation,
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <BrandLogo width={1000} />
        </Animated.View>
      )}
    </View>
  )
}
