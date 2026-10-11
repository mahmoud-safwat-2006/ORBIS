import React, {useMemo, useState} from 'react'
import {Pressable, View} from 'react-native'
import {Image} from 'expo-image'
import {LinearGradient} from 'expo-linear-gradient'
import {type ModerationDecision} from '@bsky/sdk/moderation'
import {useLingui} from '@lingui/react/macro'
import Svg, {Path} from 'react-native-svg'

import {sanitizeHandle} from '#/lib/strings/handles'
import {formatCount} from '#/view/com/util/numeric/format'
import {UserAvatar} from '#/view/com/util/UserAvatar'
import {type VideoFeedSourceContext} from '#/screens/VideoFeed/types'
import {atoms as a, useTheme} from '#/alf'
import {BLUE_HUE} from '#/alf/util/colorGeneration'
import {select} from '#/alf/util/themeSelector'
import {useInteractionState} from '#/components/hooks/useInteractionState'
import {EyeSlash_Stroke2_Corner0_Rounded as Eye} from '#/components/icons/EyeSlash'
import {Heart2_Stroke2_Corner0_Rounded as Heart} from '#/components/icons/Heart2'
import {Repost_Stroke2_Corner2_Rounded as Repost} from '#/components/icons/Repost'
import {Link} from '#/components/Link'
import {MediaInsetBorder} from '#/components/MediaInsetBorder'
import * as Hider from '#/components/moderation/Hider'
import {Text} from '#/components/Typography'
import {app} from '#/lexicons'
import * as bsky from '#/types/bsky'

function getBlackColor(t: ReturnType<typeof useTheme>) {
  return select(t.name, {
    light: t.palette.black,
    dark: t.atoms.bg_contrast_25.backgroundColor,
    dim: `hsl(${BLUE_HUE}, 28%, 6%)`,
  })
}

// دالة تنظيف واقتطاع الاسم المعروض فقط
function getCleanDisplayName(displayName?: string, handle?: string) {
  if (!displayName || !displayName.trim()) {
    return handle ? sanitizeHandle(handle, '') : ''
  }
  let clean = displayName.trim()
  if (clean.includes('(')) {
    clean = clean.split('(')[0].trim()
  }
  return clean || displayName
}

// شارة التوثيق المدمجة لـ ORBIS
function VerifiedIcon({size = 14}: {size?: number}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="#00D2FF"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#0085FF"
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function VideoPostCard({
  post,
  sourceContext,
  moderation,
  onInteract,
}: {
  post: app.bsky.feed.defs.PostView
  sourceContext: VideoFeedSourceContext
  moderation: ModerationDecision
  /**
   * Callback for metrics etc
   */
  onInteract?: () => void
}) {
  const t = useTheme()
  const {t: l, i18n} = useLingui()
  const embed = post.embed
  const {
    state: pressed,
    onIn: onPressIn,
    onOut: onPressOut,
  } = useInteractionState()

  // حالة زر المتابعة
  const [isFollowing, setIsFollowing] = useState(
    Boolean(post.author.viewer?.following)
  )

  const listModUi = moderation.ui('contentList')

  const mergedModui = useMemo(() => {
    const modui = moderation.ui('contentList')
    const mediaModui = moderation.ui('contentMedia')
    modui.alerts = [...modui.alerts, ...mediaModui.alerts]
    modui.blurs = [...modui.blurs, ...mediaModui.blurs]
    modui.filters = [...modui.filters, ...mediaModui.filters]
    modui.informs = [...modui.informs, ...mediaModui.informs]
    return modui
  }, [moderation])

  if (!bsky.isType(app.bsky.embed.video.view, embed)) return null

  const author = post.author
  const text = bsky.isType(app.bsky.feed.post, post.record)
    ? post.record?.text
    : ''
  const likeCount = post?.likeCount ?? 0
  const repostCount = post?.repostCount ?? 0
  const {thumbnail} = embed
  const black = getBlackColor(t)

  const handleToggleFollow = (e: any) => {
    e?.stopPropagation?.()
    e?.preventDefault?.()
    setIsFollowing((prev) => !prev)
  }

  // صف الناشر: الاسم المعروض فقط مقتطع + الشارة + زر المتابعة بجانبه تماماً
  const textAndAuthor = (
    <View style={[a.pr_xs, {paddingTop: 6, gap: 4}]}>
      {text ? (
        <Text style={[a.text_md, a.leading_snug]} numberOfLines={2} emoji>
          {text}
        </Text>
      ) : null}

      <View style={[a.flex_row, a.align_center, a.gap_xs, {flexWrap: 'nowrap', overflow: 'hidden'}]}>
        {/* الصورة الشخصية */}
        <View style={[a.relative, a.rounded_full, {width: 20, height: 20, flexShrink: 0}]}>
          <UserAvatar type="user" size={20} avatar={post.author.avatar} />
          <MediaInsetBorder />
        </View>

        {/* الاسم المعروض فقط مقتطع بذكاء حتى لا يزاحم الشارة والزر */}
        <Text
          style={[
            a.text_sm,
            a.font_bold,
            a.leading_tight,
            t.atoms.text_contrast_high,
            {maxWidth: 105, flexShrink: 1},
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {getCleanDisplayName(post.author.displayName, post.author.handle)}
        </Text>

        {/* شارة التوثيق */}
        <View style={{flexShrink: 0, marginHorizontal: 1}}>
          <VerifiedIcon size={14} />
        </View>

        {/* نقطة فاصلة */}
        <Text style={[{color: '#64748B', fontSize: 10, flexShrink: 0}]}>•</Text>

        {/* زر المتابعة بنظام فيسبوك بجوار الاسم مباشرة */}
        <Pressable
          onPress={handleToggleFollow}
          accessibilityRole="button"
          style={({pressed: btnPressed}) => [
            {
              paddingHorizontal: 7,
              paddingVertical: 2,
              borderRadius: 999,
              flexShrink: 0,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              opacity: btnPressed ? 0.75 : 1,
              backgroundColor: isFollowing ? 'rgba(255, 255, 255, 0.12)' : '#0085FF',
              borderWidth: isFollowing ? 1 : 0,
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
          ]}>
          {isFollowing ? (
            <>
              <Text style={{color: '#00D2FF', fontSize: 10, fontWeight: '800'}}>✓</Text>
              <Text style={{color: '#F1F5F9', fontSize: 10, fontWeight: '700'}}>أتابع</Text>
            </>
          ) : (
            <Text style={{color: '#FFFFFF', fontSize: 10, fontWeight: '700'}}>+ متابعة</Text>
          )}
        </Pressable>
      </View>
    </View>
  )

  return (
    <Link
      accessibilityHint={l`Views video in immersive mode`}
      label={l`Video from ${author.handle}: ${text}`}
      to={{
        screen: 'VideoFeed',
        params: {
          ...sourceContext,
          initialPostUri: post.uri,
        },
      }}
      onPress={() => {
        onInteract?.()
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        a.flex_col,
        {
          alignItems: undefined,
          justifyContent: undefined,
        },
      ]}>
      <Hider.Outer modui={mergedModui}>
        <Hider.Mask>
          <View
            style={[
              a.justify_center,
              a.rounded_md,
              a.overflow_hidden,
              {
                backgroundColor: black,
                aspectRatio: 9 / 16,
              },
            ]}>
            <Image
              source={{uri: thumbnail}}
              style={[a.w_full, a.h_full, {opacity: pressed ? 0.8 : 1}]}
              accessibilityIgnoresInvertColors
              blurRadius={100}
            />
            <MediaInsetBorder />
            <View
              style={[a.absolute, a.inset_0, a.justify_center, a.align_center]}>
              <View
                style={[
                  a.absolute,
                  a.inset_0,
                  a.justify_center,
                  a.align_center,
                  {
                    backgroundColor: 'black',
                    opacity: 0.2,
                  },
                ]}
              />
              <View style={[a.align_center, a.gap_xs]}>
                <Eye size="lg" fill="white" />
                <Text style={[a.text_sm, {color: 'white'}]}>{l`Hidden`}</Text>
              </View>
            </View>
          </View>
          {listModUi.blur ? (
            <VideoPostCardTextPlaceholder author={post.author} />
          ) : (
            textAndAuthor
          )}
        </Hider.Mask>
        <Hider.Content>
          <View
            style={[
              a.justify_center,
              a.rounded_md,
              a.overflow_hidden,
              {
                backgroundColor: black,
                aspectRatio: 9 / 16,
              },
            ]}>
            <Image
              source={{uri: thumbnail}}
              style={[a.w_full, a.h_full, {opacity: pressed ? 0.8 : 1}]}
              accessibilityIgnoresInvertColors
            />
            <MediaInsetBorder />

            <View style={[a.absolute, a.inset_0]}>
              <View
                style={[
                  a.absolute,
                  a.inset_0,
                  a.pt_2xl,
                  {
                    top: 'auto',
                  },
                ]}>
                <LinearGradient
                  colors={[black, 'rgba(0, 0, 0, 0)']}
                  locations={[0.02, 1]}
                  start={{x: 0, y: 1}}
                  end={{x: 0, y: 0}}
                  style={[a.absolute, a.inset_0, {opacity: 0.9}]}
                />

                <View
                  style={[a.relative, a.z_10, a.p_md, a.flex_row, a.gap_md]}>
                  {likeCount > 0 && (
                    <View style={[a.flex_row, a.align_center, a.gap_xs]}>
                      <Heart size="sm" fill="white" />
                      <Text
                        style={[a.text_sm, a.font_semi_bold, {color: 'white'}]}>
                        {formatCount(i18n, likeCount)}
                      </Text>
                    </View>
                  )}
                  {repostCount > 0 && (
                    <View style={[a.flex_row, a.align_center, a.gap_xs]}>
                      <Repost size="sm" fill="white" />
                      <Text
                        style={[a.text_sm, a.font_semi_bold, {color: 'white'}]}>
                        {formatCount(i18n, repostCount)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          {textAndAuthor}
        </Hider.Content>
      </Hider.Outer>
    </Link>
  )
}

export function VideoPostCardPlaceholder() {
  const t = useTheme()
  const black = getBlackColor(t)

  return (
    <View style={[a.flex_1]}>
      <View
        style={[
          a.rounded_md,
          a.overflow_hidden,
          {
            backgroundColor: black,
            aspectRatio: 9 / 16,
          },
        ]}>
        <MediaInsetBorder />
      </View>
      <VideoPostCardTextPlaceholder />
    </View>
  )
}

export function VideoPostCardTextPlaceholder({
  author,
}: {
  author?: app.bsky.actor.defs.ProfileViewBasic
}) {
  const t = useTheme()

  return (
    <View style={[a.flex_1]}>
      <View style={[a.pr_xs, {paddingTop: 8, gap: 6}]}>
        <View
          style={[
            a.w_full,
            a.rounded_xs,
            t.atoms.bg_contrast_50,
            {
              height: 14,
            },
          ]}
        />
        <View
          style={[
            a.w_full,
            a.rounded_xs,
            t.atoms.bg_contrast_50,
            {
              height: 14,
              width: '70%',
            },
          ]}
        />
        {author ? (
          <View style={[a.flex_row, a.gap_xs, a.align_center]}>
            <View style={[a.relative, a.rounded_full, {width: 20, height: 20}]}>
              <UserAvatar type="user" size={20} avatar={author.avatar} />
              <MediaInsetBorder />
            </View>
            <Text
              style={[
                a.flex_1,
                a.text_sm,
                a.leading_tight,
                t.atoms.text_contrast_medium,
              ]}
              numberOfLines={1}>
              {getCleanDisplayName(author.displayName, author.handle)}
            </Text>
          </View>
        ) : (
          <View style={[a.flex_row, a.gap_xs, a.align_center]}>
            <View
              style={[
                a.rounded_full,
                t.atoms.bg_contrast_50,
                {
                  width: 20,
                  height: 20,
                },
              ]}
            />
            <View
              style={[
                a.rounded_xs,
                t.atoms.bg_contrast_25,
                {
                  height: 12,
                  width: '75%',
                },
              ]}
            />
          </View>
        )}
      </View>
    </View>
  )
}

export function CompactVideoPostCard({
  post,
  sourceContext,
  moderation,
  onInteract,
}: {
  post: app.bsky.feed.defs.PostView
  sourceContext: VideoFeedSourceContext
  moderation: ModerationDecision
  /**
   * Callback for metrics etc
   */
  onInteract?: () => void
}) {
  const t = useTheme()
  const {t: l, i18n} = useLingui()
  const embed = post.embed
  const {
    state: pressed,
    onIn: onPressIn,
    onOut: onPressOut,
  } = useInteractionState()

  const mergedModui = useMemo(() => {
    const modui = moderation.ui('contentList')
    const mediaModui = moderation.ui('contentMedia')
    modui.alerts = [...modui.alerts, ...mediaModui.alerts]
    modui.blurs = [...modui.blurs, ...mediaModui.blurs]
    modui.filters = [...modui.filters, ...mediaModui.filters]
    modui.informs = [...modui.informs, ...mediaModui.informs]
    return modui
  }, [moderation])

  if (!bsky.isType(app.bsky.embed.video.view, embed)) return null

  const likeCount = post?.likeCount ?? 0
  const showLikeCount = false
  const {thumbnail} = embed
  const black = getBlackColor(t)

  return (
    <Link
      label={l`View video`}
      to={{
        screen: 'VideoFeed',
        params: {
          ...sourceContext,
          initialPostUri: post.uri,
        },
      }}
      onPress={() => {
        onInteract?.()
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        a.flex_col,
        a.rounded_xl,
        t.atoms.shadow_md,
        {
          alignItems: undefined,
          justifyContent: undefined,
        },
      ]}>
      <Hider.Outer modui={mergedModui}>
        <Hider.Mask>
          <View
            style={[
              a.justify_center,
              a.rounded_xl,
              a.overflow_hidden,
              a.border,
              t.atoms.border_contrast_low,
              {
                backgroundColor: black,
                aspectRatio: 9 / 16,
              },
            ]}>
            <Image
              source={{uri: thumbnail}}
              style={[a.w_full, a.h_full, {opacity: pressed ? 0.8 : 1}]}
              accessibilityIgnoresInvertColors
              blurRadius={100}
            />
            <MediaInsetBorder />
            <View
              style={[a.absolute, a.inset_0, a.justify_center, a.align_center]}>
              <View
                style={[
                  a.absolute,
                  a.inset_0,
                  a.justify_center,
                  a.align_center,
                  a.border,
                  t.atoms.border_contrast_low,
                  {
                    backgroundColor: 'black',
                    opacity: 0.2,
                  },
                ]}
              />
              <View style={[a.align_center, a.gap_xs]}>
                <Eye size="lg" fill="white" />
                <Text style={[a.text_sm, {color: 'white'}]}>{l`Hidden`}</Text>
              </View>
            </View>
          </View>
        </Hider.Mask>
        <Hider.Content>
          <View
            style={[
              a.justify_center,
              a.rounded_xl,
              a.overflow_hidden,
              a.border,
              t.atoms.border_contrast_low,
              {
                backgroundColor: black,
                aspectRatio: 9 / 16,
              },
            ]}>
            <Image
              source={{uri: thumbnail}}
              style={[a.w_full, a.h_full, {opacity: pressed ? 0.8 : 1}]}
              accessibilityIgnoresInvertColors
            />
            <MediaInsetBorder />

            <View style={[a.absolute, a.inset_0, t.atoms.shadow_md]}>
              <View style={[a.absolute, a.inset_0, a.p_sm, {bottom: 'auto'}]}>
                <View
                  style={[
                    a.relative,
                    a.rounded_full,
                    {
                      width: 24,
                      height: 24,
                    },
                  ]}>
                  <UserAvatar
                    type="user"
                    size={24}
                    avatar={post.author.avatar}
                  />
                  <MediaInsetBorder />
                </View>
              </View>

              {showLikeCount && (
                <View
                  style={[
                    a.absolute,
                    a.inset_0,
                    a.pt_2xl,
                    {
                      top: 'auto',
                    },
                  ]}>
                  <LinearGradient
                    colors={[black, 'rgba(0, 0, 0, 0)']}
                    locations={[0.02, 1]}
                    start={{x: 0, y: 1}}
                    end={{x: 0, y: 0}}
                    style={[a.absolute, a.inset_0, {opacity: 0.9}]}
                  />

                  <View
                    style={[a.relative, a.z_10, a.p_sm, a.flex_row, a.gap_md]}>
                    {likeCount > 0 && (
                      <View style={[a.flex_row, a.align_center, a.gap_xs]}>
                        <Heart size="sm" fill="white" />
                        <Text
                          style={[
                            a.text_sm,
                            a.font_semi_bold,
                            {color: 'white'},
                          ]}>
                          {formatCount(i18n, likeCount)}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            </View>
          </View>
        </Hider.Content>
      </Hider.Outer>
    </Link>
  )
}

export function CompactVideoPostCardPlaceholder() {
  const t = useTheme()
  const black = getBlackColor(t)

  return (
    <View style={[a.flex_1, t.atoms.shadow_md]}>
      <View
        style={[
          a.rounded_xl,
          a.overflow_hidden,
          a.border,
          t.atoms.border_contrast_low,
          {
            backgroundColor: black,
            aspectRatio: 9 / 16,
          },
        ]}>
        <MediaInsetBorder />
      </View>
    </View>
  )
}