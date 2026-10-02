import {type I18n} from '@lingui/core'
import {msg} from '@lingui/core/macro'

import {DISCOVER_FEED_URI, TIMELINE_SAVED_FEED} from '#/lib/constants'

type FeedNameSource = {
  displayName: string
  uri: string
}

const ARABIC_FEED_NAMES: Record<string, string> = {
  discover: 'استكشف',
  following: 'المتابعون',
  video: 'فيديو',
  videos: 'فيديوهات',
  trending: 'الأكثر تداولاً',
  'popular with friends': 'شائع بين الأصدقاء',
  'whats hot': 'الأكثر رواجاً',
  "what's hot": 'الأكثر رواجاً',
  mutuals: 'الأصدقاء المشتركون',
}

export function getLocalizedFeedName(feed: FeedNameSource, i18n: I18n): string {
  const isArabic = i18n.locale?.startsWith('ar')

  if (feed.uri === TIMELINE_SAVED_FEED.value) {
    return isArabic ? 'المتابعون' : i18n._(msg({message: 'Following', context: 'feed-name'}))
  }
  if (feed.uri === DISCOVER_FEED_URI) {
    return isArabic ? 'استكشف' : i18n._(msg({message: 'Discover', context: 'feed-name'}))
  }

  if (isArabic) {
    const lowerName = feed.displayName?.trim().toLowerCase()
    if (lowerName && ARABIC_FEED_NAMES[lowerName]) {
      return ARABIC_FEED_NAMES[lowerName]
    }
  }

  return feed.displayName
}
