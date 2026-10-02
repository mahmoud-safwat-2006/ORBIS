import {Platform} from 'react-native'
import type * as SentryRN from '@sentry/react-native'

let RN: typeof SentryRN | undefined
if (Platform.OS !== 'web') {
  RN = require('@sentry/react-native') as typeof SentryRN
}

export const Sentry = {
  addBreadcrumb: (...args: Parameters<typeof SentryRN.addBreadcrumb>) =>
    RN!.addBreadcrumb(...args),
  captureException: (...args: Parameters<typeof SentryRN.captureException>) =>
    RN!.captureException(...args),
  captureFeedback: (...args: Parameters<typeof SentryRN.captureFeedback>) =>
    RN!.captureFeedback(...args),
  captureMessage: (...args: Parameters<typeof SentryRN.captureMessage>) =>
    RN!.captureMessage(...args),
  featureFlagsIntegration: RN?.featureFlagsIntegration,
  getClient: () => RN?.getClient(),
  setUser: (...args: Parameters<typeof SentryRN.setUser>) =>
    RN!.setUser(...args),
  startInactiveSpan: (...args: Parameters<typeof SentryRN.startInactiveSpan>) =>
    RN!.startInactiveSpan(...args),
  withActiveSpan: <T>(
    span: SentryRN.Span | null,
    callback: (scope: SentryRN.Scope) => T,
  ): T => RN!.withActiveSpan(span, callback),
  withScope: (...args: Parameters<typeof SentryRN.withScope>) =>
    RN!.withScope(...args),
  wrap: (...args: Parameters<typeof SentryRN.wrap>) => RN!.wrap(...args),
}
