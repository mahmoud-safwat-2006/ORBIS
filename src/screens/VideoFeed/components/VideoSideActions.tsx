import {useState} from 'react'
import {I18nManager, Pressable, StyleSheet, Text, View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'

import {CountWheel} from '#/lib/custom-animations/CountWheel'
import {useHaptics} from '#/lib/haptics'
import {shareUrl} from '#/lib/sharing'
import {toShareUrl} from '#/lib/strings/url-helpers'
import {type Shadow} from '#/state/cache/types'
import {
  usePostLikeMutationQueue,
  usePostRepostMutationQueue,
} from '#/state/queries/post'
import {ArrowShareRight_Stroke2_Corner2_Rounded as ShareIcon} from '#/components/icons/ArrowShareRight'
import {Bookmark_Stroke2_Corner0_Rounded as BookmarkIcon} from '#/components/icons/Bookmark'
import {Bubble_Stroke2_Corner2_Rounded as Bubble} from '#/components/icons/Bubble'
import {DotGrid_Stroke2_Corner0_Rounded as MoreIcon} from '#/components/icons/DotGrid'
import {Heart_Stroke2_Corner0_Rounded as HeartIcon} from '#/components/icons/Heart'
import {useFormatPostStatCount} from '#/components/PostControls/util'
import {type app} from '#/lexicons'

export function VideoSideActions({
  post,
  onOpenComments,
}: {
  post: Shadow<app.bsky.feed.defs.PostView>
  onOpenComments: () => void
}) {
  const {_} = useLingui()
  const playHaptic = useHaptics()
  const formatCount = useFormatPostStatCount()

  // Likes
  const [queueLike, queueUnlike] = usePostLikeMutationQueue(
    post,
    undefined,
    undefined,
    'ImmersiveVideo',
  )
  const isLiked = Boolean(post.viewer?.like)
  const [hasLikedToggled, setHasLikedToggled] = useState(false)

  const toggleLike = () => {
    playHaptic('Light')
    setHasLikedToggled(true)
    if (isLiked) {
      void queueUnlike()
    } else {
      void queueLike()
    }
  }

  const onShare = () => {
    playHaptic('Light')
    const url = toShareUrl(post.uri)
    void shareUrl(url)
  }

  return (
    <View style={styles.fbContainer}>
      {/* 1. Like Button - Facebook Style */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={toggleLike}
          accessibilityLabel={_(msg`Like`)}
          accessibilityHint={_(msg`Likes the video`)}
          accessibilityRole="button"
          style={styles.actionBtn}>
          <HeartIcon
            size="2xl"
            fill={isLiked ? '#FA383E' : '#FFFFFF'}
          />
        </Pressable>
        <CountWheel
          count={post.likeCount ?? 0}
          isToggled={isLiked}
          hasBeenToggled={hasLikedToggled}
          renderCount={({count}) => (
            <Text style={styles.countText}>{formatCount(count)}</Text>
          )}
        />
      </View>

      {/* 2. Comments Button - Facebook Style */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onOpenComments}
          accessibilityLabel={_(msg`Comments`)}
          accessibilityHint={_(msg`Opens comments`)}
          accessibilityRole="button"
          style={styles.actionBtn}>
          <Bubble size="2xl" fill="#FFFFFF" />
        </Pressable>
        <CountWheel
          count={post.replyCount ?? 0}
          isToggled={false}
          hasBeenToggled={false}
          renderCount={({count}) => (
            <Text style={styles.countText}>{formatCount(count)}</Text>
          )}
        />
      </View>

      {/* 3. Share Button - Facebook Style */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onShare}
          accessibilityLabel={_(msg`Share`)}
          accessibilityHint={_(msg`Shares video`)}
          accessibilityRole="button"
          style={styles.actionBtn}>
          <ShareIcon size="2xl" fill="#FFFFFF" />
        </Pressable>
        <Text style={styles.countText}>
          {formatCount((post.repostCount ?? 0) + (post.quoteCount ?? 0))}
        </Text>
      </View>

      {/* 4. Bookmark (Save) Button - Facebook Style */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onShare}
          accessibilityLabel={_(msg`Save`)}
          accessibilityHint={_(msg`Saves video`)}
          accessibilityRole="button"
          style={styles.actionBtn}>
          <BookmarkIcon size="2xl" fill="#FFFFFF" />
        </Pressable>
        <Text style={styles.countText}>حفظ</Text>
      </View>

      {/* 5. More Options Button (...) */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onShare}
          accessibilityLabel={_(msg`More`)}
          accessibilityHint={_(msg`More options`)}
          accessibilityRole="button"
          style={styles.actionBtn}>
          <MoreIcon size="xl" fill="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fbContainer: {
    position: 'absolute',
    left: 14, // دائماً وأبداً على أقصى اليسار مثل فيسبوك ريلز
    bottom: 40,
    alignItems: 'center',
    gap: 18,
    zIndex: 99,
    // إجبار الاتجاه من اليسار حتى مع الواجهة العربية
    direction: 'ltr',
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
    textAlign: 'center',
  },
})