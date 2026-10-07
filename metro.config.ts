// Learn more https://docs.expo.io/guides/customizing-metro
import {type CustomResolver} from '@expo/metro/metro-resolver'
import {getDefaultConfig} from '@expo/metro-config'

const projectRoot = import.meta.dirname
const config = getDefaultConfig(projectRoot)

if (typeof process.env.RN_SRC_EXT === 'string') {
  // inject `.e2e.ts` and `.e2e.tsx` into the sourceExts when running tests
  config.resolver.sourceExts.unshift(...process.env.RN_SRC_EXT.split(','))
}

config.resolver.assetExts = [...config.resolver.assetExts, 'woff2']

if (process.env.BSKY_PROFILE) {
  // @ts-expect-error readonly property
  config.cacheVersion += ':PROFILE'
}

const resolver: CustomResolver = (context, moduleName, platform) => {
  if (moduleName.startsWith('@bsky.app/expo-orbis-')) {
    const mapped = moduleName.replace('@bsky.app/expo-orbis-', '@bsky.app/expo-orbis-');
    return context.resolveRequest(context, mapped, platform);
  }
  if (
    platform === 'web' &&
    /^react-native-gesture-handler(\/|$)/.test(moduleName)
  ) {
    throw new Error(
      `react-native-gesture-handler must not be imported on web (requested from ${context.originModulePath})`,
    )
  }
  /*
   * react-native-webview has no web implementation (its fallback renders
   * "does not support this platform"), so swap in react-native-web-webview
   * to keep external media embeds working. Mirrors the old webpack alias.
   */
  if (platform === 'web' && moduleName === 'react-native-webview') {
    return context.resolveRequest(context, 'react-native-web-webview', platform)
  }
  if (
    process.env.BSKY_PROFILE &&
    moduleName.endsWith('ReactNativeRenderer-prod')
  ) {
    return context.resolveRequest(
      context,
      moduleName.replace('-prod', '-profiling'),
      platform,
    )
  }
  return context.resolveRequest(context, moduleName, platform)
}

// @ts-expect-error readonly property
config.resolver.resolveRequest = resolver

;(config.transformer as any).getTransformOptions = () =>
  Promise.resolve({
    transform: {
      experimentalImportSupport: true,
      inlineRequires: true as false,
    },
  })

export default config
