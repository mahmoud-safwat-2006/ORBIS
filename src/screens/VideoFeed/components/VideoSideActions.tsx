import React, {useState, useEffect} from 'react'
import {Pressable, StyleSheet, Text, View, Animated} from 'react-native'
import Svg, {Path} from 'react-native-svg'

interface VideoSideActionsProps {
  post: any
  onLikePress?: () => void
  onCommentPress?: () => void
  onOpenComments?: () => void
  onSharePress?: () => void
  onMorePress?: () => void
}

export function VideoSideActions({
  post,
  onLikePress,
  onCommentPress,
  onOpenComments,
  onSharePress,
  onMorePress,
}: VideoSideActionsProps) {
  // التحقق من حالة الإعجاب السابقة إن وجدت
  const initialIsLiked = Boolean(post?.viewer?.like)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const initialLikes = post?.likeCount ?? 0
  const [likeCount, setLikeCount] = useState(initialLikes)
  
  // تأثير نبض خفيف عند الضغط على القلب
  const [scaleAnim] = useState(new Animated.Value(1))

  useEffect(() => {
    if (post?.viewer?.like !== undefined) {
      setIsLiked(Boolean(post.viewer.like))
    }
    if (post?.likeCount !== undefined) {
      setLikeCount(post.likeCount)
    }
  }, [post?.viewer?.like, post?.likeCount])

  const handleLike = () => {
    // حركة نبض للقلب (Pop Animation)
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start()

    if (isLiked) {
      setIsLiked(false)
      setLikeCount((prev: number) => Math.max(0, prev - 1))
    } else {
      setIsLiked(true)
      setLikeCount((prev: number) => prev + 1)
    }
    onLikePress?.()
  }

  // تنسيق الأرقام الكبيرة (مثل 1.2K)
  const formatCount = (count: number) => {
    if (!count || count === 0) return '0'
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  return (
    <View style={styles.container}>
      {/* 1. زر الإعجاب على شكل قلب خالص تفاعلي ❤️ */}
      <View style={styles.actionItem}>
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <Pressable onPress={handleLike} style={styles.iconBtn}>
            <Svg width={34} height={34} viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={isLiked ? '#FF1E56' : 'rgba(0, 0, 0, 0.25)'}
                stroke={isLiked ? '#FF1E56' : '#FFFFFF'}
                strokeWidth={isLiked ? 1 : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </Animated.View>
        <Text style={[styles.actionCount, isLiked && styles.likedCount]}>
          {likeCount > 0 ? formatCount(likeCount) : 'إعجاب'}
        </Text>
      </View>

      {/* 2. زر التعليق 💬 */}
      <View style={styles.actionItem}>
        <Pressable onPress={onOpenComments || onCommentPress} style={styles.iconBtn}>
          <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
            <Path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(0, 0, 0, 0.25)"
            />
          </Svg>
        </Pressable>
        <Text style={styles.actionCount}>
          {post?.replyCount !== undefined ? formatCount(post.replyCount) : 'تعليق'}
        </Text>
      </View>

      {/* 3. زر المشاركة ↗ */}
      <View style={styles.actionItem}>
        <Pressable onPress={onSharePress} style={styles.iconBtn}>
          <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
            <Path
              d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
        <Text style={styles.actionCount}>مشاركة</Text>
      </View>

      {/* 4. زر المزيد ... */}
      <View style={styles.actionItem}>
        <Pressable onPress={onMorePress} style={styles.iconBtn}>
          <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
            <Path
              d="M12 13a1 1 0 100-2 1 1 0 000 2zM19 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z"
              stroke="#FFFFFF"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 14,
    bottom: 95,
    zIndex: 50,
    alignItems: 'center',
    gap: 18,
  },
  actionItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  actionCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
  },
  likedCount: {
    color: '#FF4D6D',
  },
})