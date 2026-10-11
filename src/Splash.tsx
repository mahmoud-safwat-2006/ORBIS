import React, {useCallback, useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import * as SplashScreen from 'expo-splash-screen'

type Props = {
  isReady: boolean
}

export function Splash(props: React.PropsWithChildren<Props>) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const opacity = useSharedValue(1)

  const dismissSplash = useCallback(() => {
    void SplashScreen.hideAsync().catch(() => {})
    opacity.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    }, () => {
      setIsAnimationComplete(true)
    })
  }, [opacity])

  // إخفاء الشاشة البيضاء بمجرد جاهزية التطبيق
  useEffect(() => {
    if (props.isReady) {
      dismissSplash()
    }
  }, [props.isReady, dismissSplash])

  // صمام أمان إجباري (Fail-safe): لو تأخر التطبيق لأكثر من ثانية واحدة، تُخفى الشاشة البيضاء فوراً
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      dismissSplash()
    }, 1200)
    return () => clearTimeout(safetyTimer)
  }, [dismissSplash])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View style={styles.container}>
      {props.children}
      {!isAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, styles.splashOverlay, animatedStyle]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashOverlay: {
    backgroundColor: '#0085ff', // أو اللون الأساسي للتطبيق لمنع الوميض الأبيض المزعج
  },
})