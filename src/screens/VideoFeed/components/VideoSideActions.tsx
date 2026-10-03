import {useState} from 'react'
import {Pressable, StyleSheet, View} from 'react-native'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {useNavigation} from '@react-navigation/native'

import {CountWheel} from '#/lib/custom-animations/CountWheel'
import {AnimatedLikeIcon} from '#/lib/custom-animations/LikeIcon'
import {useHaptics} from '#/lib/haptics'
import {type NavigationProp} from '#/lib/routes/types'
import {shareUrl} from '#/lib/sharing'
import {toShareUrl} from '#/lib/strings/url-helpers'
import {type Shadow} from '#/state/cache/types'
import {
  usePostLikeMutationQueue,
  usePostRepostMutationQueue,
} from '#/state/queries/post'
import {PreviewableUserAvatar} from '#/view/com/util/UserAvatar'
import {atoms as a} from '#/alf'
import {ArrowShareRight_Stroke2_Corner2_Rounded as ShareIcon} from '#/components/icons/ArrowShareRight'
import {Bubble_Stroke2_Corner2_Rounded as Bubble} from '#/components/icons/Bubble'
import {Repost_Stroke2_Corner2_Rounded as RepostIcon} from '#/components/icons/Repost'
import {BookmarkButton} from '#/components/PostControls/BookmarkButton'
import {useFormatPostStatCount} from '#/components/PostControls/util'
import {Text} from '#/components/Typography'
import {type app} from '#/lexicons'

export function VideoSideActions({
  post,
  onOpenComments,
}: {
  post: Shadow<app.bsky.feed.defs.PostView>
  onOpenComments: () => void
}) {
  const {_} = useLingui()
  const navigation = useNavigation<NavigationProp>()
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

  // Reposts
  const [queueRepost, queueUnrepost] = usePostRepostMutationQueue(
    post,
    undefined,
    undefined,
    'ImmersiveVideo',
  )
  const isReposted = Boolean(post.viewer?.repost)

  const toggleLike = () => {
    playHaptic('Light')
    setHasLikedToggled(true)
    if (isLiked) {
      void queueUnlike()
    } else {
      void queueLike()
    }
  }

  const toggleRepost = () => {
    playHaptic('Light')
    if (isReposted) {
      void queueUnrepost()
    } else {
      void queueRepost()
    }
  }

  const onShare = () => {
    playHaptic('Light')
    const url = toShareUrl(post.uri)
    void shareUrl(url)
  }

  const navigateToProfile = () => {
    navigation.navigate('Profile', {name: post.author.handle})
  }

  return (
    <View style={styles.container}>
      {/* 1. صاحب الفيديو Avatar */}
      <View style={[a.align_center, a.mb_md]}>
        <Pressable
          onPress={navigateToProfile}
          accessibilityLabel={post.author.displayName || post.author.handle}
          accessibilityHint={_(msg`Opens profile`)}
          accessibilityRole="button"
          style={styles.avatarWrapper}>
          <PreviewableUserAvatar
            size={48}
            profile={post.author}
            moderation={undefined}
          />
        </Pressable>
      </View>

      {/* 2. زر الإعجاب Like Button */}
      <View style={[a.align_center, a.mb_md]}>
        <Pressable
          onPress={toggleLike}
          accessibilityLabel={_(msg`Like`)}
          accessibilityHint={_(msg`Likes the post`)}
          accessibilityRole="button"
          style={styles.actionButton}>
          <AnimatedLikeIcon isLiked={isLiked} hasBeenToggled={hasLikedToggled} big={true} />
        </Pressable>
        <View style={a.mt_xs}>
          <CountWheel
            count={post.likeCount ?? 0}
            isToggled={isLiked}
            hasBeenToggled={hasLikedToggled}
            renderCount={({count}) => (
              <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: '700'}}>
                {formatCount(count)}
              </Text>
            )}
          />
        </View>
      </View>

      {/* 3. زر التعليقات Comments Button */}
      <View style={[a.align_center, a.mb_md]}>
        <Pressable
          onPress={onOpenComments}
          accessibilityLabel={_(msg`Comments`)}
          accessibilityHint={_(msg`Opens comments sheet`)}
          accessibilityRole="button"
          style={styles.actionButton}>
          <Bubble size="xl" fill="#FFFFFF" />
        </Pressable>
        <View style={a.mt_xs}>
          <CountWheel
            count={post.replyCount ?? 0}
            isToggled={false}
            hasBeenToggled={false}
            renderCount={({count}) => (
              <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: '700'}}>
                {formatCount(count)}
              </Text>
            )}
          />
        </View>
      </View>

      {/* 4. زر إعادة النشر Repost Button */}
      <View style={[a.align_center, a.mb_md]}>
        <Pressable
          onPress={toggleRepost}
          accessibilityLabel={_(msg`Repost`)}
          accessibilityHint={_(msg`Reposts the video`)}
          accessibilityRole="button"
          style={styles.actionButton}>
          <RepostIcon size="xl" fill={isReposted ? '#22C55E' : '#FFFFFF'} />
        </Pressable>
        <View style={a.mt_xs}>
          <CountWheel
            count={(post.repostCount ?? 0) + (post.quoteCount ?? 0)}
            isToggled={isReposted}
            hasBeenToggled={false}
            renderCount={({count}) => (
              <Text style={{color: '#FFFFFF', fontSize: 12, fontWeight: '700'}}>
                {formatCount(count)}
              </Text>
            )}
          />
        </View>
      </View>

      {/* 5. زر الحفظ في المفضلة Bookmark */}
      <View style={[a.align_center, a.mb_md]}>
        <BookmarkButton post={post} big={true} logContext="ImmersiveVideo" />
      </View>

      {/* 6. زر المشاركة Share Button */}
      <View style={[a.align_center, a.mb_md]}>
        <Pressable
          onPress={onShare}
          accessibilityLabel={_(msg`Share`)}
          accessibilityHint={_(msg`Shares the video link`)}
          accessibilityRole="button"
          style={styles.actionButton}>
          <ShareIcon size="xl" fill="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    bottom: 50,
    alignItems: 'center',
    zIndex: 50,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 999,
    padding: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 4,
  },
  actionButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
})