import React, {useState} from 'react'
import {Pressable, StyleSheet, Text, View} from 'react-native'
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
  const [isLiked, setIsLiked] = useState(false)
  const initialLikes = post?.likeCount ?? 0
  const [likeCount, setLikeCount] = useState(initialLikes)

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false)
      setLikeCount((prev: number) => Math.max(0, prev - 1))
    } else {
      setIsLiked(true)
      setLikeCount((prev: number) => prev + 1)
    }
    onLikePress?.()
  }

  return (
    <View style={styles.container}>
      {/* 1. زر الإعجاب لايك فيسبوك ريلز 👍 */}
      <View style={styles.actionItem}>
        <Pressable onPress={handleLike} style={styles.iconBtn}>
          <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
            <Path
              d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isLiked ? '#1877F2' : 'none'}
            />
          </Svg>
        </Pressable>
        <Text style={styles.actionCount}>{likeCount > 0 ? likeCount : 'إعجاب'}</Text>
      </View>

      {/* 2. زر التعليق 💬 */}
      <View style={styles.actionItem}>
        <Pressable onPress={onOpenComments || onCommentPress} style={styles.iconBtn}>
          <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
            <Path
              d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Pressable>
        <Text style={styles.actionCount}>{post?.replyCount ?? 'تعليق'}</Text>
      </View>

      {/* 3. زر المشاركة ↗ */}
      <View style={styles.actionItem}>
        <Pressable onPress={onSharePress} style={styles.iconBtn}>
          <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
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

      {/* 4. المزيد ... */}
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
    left: 12,
    bottom: 90,
    zIndex: 50,
    alignItems: 'center',
    gap: 16,
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
    textShadowRadius: 3,
  },
})