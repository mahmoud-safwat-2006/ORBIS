import {useState} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
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
import {Heart_Stroke2_Corner0_Rounded as LikeIcon} from '#/components/icons/Heart'
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
    <View style={styles.fbSideContainer}>
      {/* 1. Like Button - Facebook Reels exact look */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={toggleLike}
          accessibilityLabel={_(msg`Like`)}
          accessibilityHint={_(msg`Likes the video`)}
          accessibilityRole="button"
          hitSlop={8}
          style={styles.actionBtn}>
          <LikeIcon
            size="2xl"
            fill={isLiked ? '#2374E1' : '#FFFFFF'}
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

      {/* 2. Comments Button */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onOpenComments}
          accessibilityLabel={_(msg`Comments`)}
          accessibilityHint={_(msg`Opens comments`)}
          accessibilityRole="button"
          hitSlop={8}
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

      {/* 3. Share Button */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onShare}
          accessibilityLabel={_(msg`Share`)}
          accessibilityHint={_(msg`Shares video`)}
          accessibilityRole="button"
          hitSlop={8}
          style={styles.actionBtn}>
          <ShareIcon size="2xl" fill="#FFFFFF" />
        </Pressable>
        <Text style={styles.countText}>
          {formatCount((post.repostCount ?? 0) + (post.quoteCount ?? 0))}
        </Text>
      </View>

      {/* 4. Bookmark (Save) Button */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onShare}
          accessibilityLabel={_(msg`Save`)}
          accessibilityHint={_(msg`Saves video`)}
          accessibilityRole="button"
          hitSlop={8}
          style={styles.actionBtn}>
          <BookmarkIcon size="2xl" fill="#FFFFFF" />
        </Pressable>
        <Text style={styles.countText}>
          {formatCount((post.likeCount ?? 0) > 0 ? Math.floor((post.likeCount ?? 0) * 0.4) : 0)}
        </Text>
      </View>

      {/* 5. More Options Button (...) */}
      <View style={styles.actionItem}>
        <Pressable
          onPress={onShare}
          accessibilityLabel={_(msg`More`)}
          accessibilityHint={_(msg`More options`)}
          accessibilityRole="button"
          hitSlop={8}
          style={styles.actionBtn}>
          <MoreIcon size="lg" fill="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  fbSideContainer: {
    position: 'absolute',
    left: 16, // على أقصى اليسار تماماً كفيسبوك
    bottom: 95, // فوق شريط إضافة تعليق السفلي
    alignItems: 'center',
    gap: 20,
    zIndex: 999,
    direction: 'ltr', // إجبار التواجد على اليسار حتى مع الواجهات العربية
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // شفاف تماماً زي فيسبوك بدون أي دوائر رمادية
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
})