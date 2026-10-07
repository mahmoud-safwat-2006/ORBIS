import {memo, useCallback} from 'react'
import {Pressable, type StyleProp, View, type ViewStyle} from 'react-native'
import {type ModerationDecision} from '@bsky/sdk/moderation'
import {msg} from '@lingui/core/macro'
import {useLingui} from '@lingui/react'
import {useQueryClient} from '@tanstack/react-query'

import {makeProfileLink} from '#/lib/routes/links'
import {forceLTR} from '#/lib/strings/bidi'
import {sanitizeDisplayName} from '#/lib/strings/display-names'
import {niceDate} from '#/lib/strings/time'
import {useProfileShadow} from '#/state/cache/profile-shadow'
import {
  unstableCacheProfileView,
  useProfileFollowMutationQueue,
} from '#/state/queries/profile'
import {useRequireAuth, useSession} from '#/state/session'
import {OrbisVerifiedBadge} from '#/view/com/util/verified/OrbisVerifiedBadge'
import {atoms as a, useTheme, web} from '#/alf'
import {WebOnlyInlineLinkText} from '#/components/Link'
import {ProfileBadges} from '#/components/ProfileBadges'
import {ProfileHoverCard} from '#/components/ProfileHoverCard'
import {Text} from '#/components/Typography'
import {IS_ANDROID} from '#/env'
import {useActorStatus} from '#/features/liveNow'
import {type app} from '#/lexicons'
import {TimeElapsed} from './TimeElapsed'
import {PreviewableUserAvatar} from './UserAvatar'

interface PostMetaOpts {
  author: app.bsky.actor.defs.ProfileViewBasic
  moderation: ModerationDecision | undefined
  postHref: string
  timestamp: string
  linkDisabled?: boolean
  showAvatar?: boolean
  avatarSize?: number
  onOpenAuthor?: () => void
  style?: StyleProp<ViewStyle>
}

let PostMeta = (opts: PostMetaOpts): React.ReactNode => {
  const t = useTheme()
  const {i18n, _} = useLingui()

  const author = useProfileShadow(opts.author)
  const displayName = author.displayName || author.handle
  const profileLink = makeProfileLink(author)
  const queryClient = useQueryClient()
  const {currentAccount} = useSession()
  const requireAuth = useRequireAuth()
  const [queueFollow, queueUnfollow] = useProfileFollowMutationQueue(
    author,
    'PostMeta',
  )

  const isMe = currentAccount?.did === author.did
  const isFollowing = Boolean(author.viewer?.following)

  const onToggleFollow = useCallback(() => {
    requireAuth(async () => {
      try {
        if (isFollowing) {
          await queueUnfollow()
        } else {
          await queueFollow()
        }
      } catch {}
    })
  }, [requireAuth, isFollowing, queueUnfollow, queueFollow])

  const onOpenAuthor = opts.onOpenAuthor
  const onBeforePressAuthor = useCallback(() => {
    unstableCacheProfileView(queryClient, author)
    onOpenAuthor?.()
  }, [queryClient, author, onOpenAuthor])
  const onBeforePressPost = useCallback(() => {
    unstableCacheProfileView(queryClient, author)
  }, [queryClient, author])

  const timestampLabel = niceDate(i18n, opts.timestamp)
  const {isActive: live} = useActorStatus(author)

  const MaybeLinkText = opts.linkDisabled ? Text : WebOnlyInlineLinkText

  return (
    <View
      style={[
        a.flex_1,
        a.flex_row,
        a.align_center,
        a.pb_xs,
        a.gap_xs,
        a.z_20,
        opts.style,
      ]}>
      {opts.showAvatar && (
        <View style={[a.self_center, a.mr_2xs]}>
          <PreviewableUserAvatar
            size={opts.avatarSize || 16}
            profile={author}
            moderation={opts.moderation?.ui('avatar')}
            type={author.associated?.labeler ? 'labeler' : 'user'}
            live={live}
            hideLiveBadge
            disableNavigation={opts.linkDisabled}
          />
        </View>
      )}
      <View style={[a.flex_row, a.align_center, a.flex_shrink, a.gap_2xs]}>
        <ProfileHoverCard did={author.did}>
          <View style={[a.flex_row, a.align_center, a.flex_shrink]}>
            <MaybeLinkText
              emoji
              numberOfLines={1}
              to={profileLink}
              label={_(msg`View profile`)}
              disableMismatchWarning
              onPress={opts.linkDisabled ? undefined : onBeforePressAuthor}
              style={[
                a.text_md,
                a.font_bold,
                t.atoms.text,
                a.leading_tight,
                {maxWidth: 165, flexShrink: 1},
                web({direction: 'ltr', unicodeBidi: 'isolate'}),
              ]}>
              {forceLTR(
                sanitizeDisplayName(
                  displayName,
                  opts.moderation?.ui('displayName'),
                ),
              )}
            </MaybeLinkText>

            <OrbisVerifiedBadge
              size={18}
              did={author.did}
              handle={author.handle}
              displayName={author.displayName}
            />

            <ProfileBadges
              profile={author}
              size="sm"
              style={[a.pl_2xs, a.self_center]}
            />
          </View>
        </ProfileHoverCard>

        {!isMe && (
          <View style={[a.flex_row, a.align_center, a.gap_2xs]}>
            <Text
              style={[a.text_sm, t.atoms.text_contrast_medium]}
              accessible={false}>
              &middot;
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={e => {
                e.stopPropagation?.()
                onToggleFollow()
              }}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 6,
                backgroundColor: isFollowing
                  ? 'rgba(148, 163, 184, 0.16)'
                  : 'rgba(24, 119, 242, 0.15)',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '700',
                  color: isFollowing ? '#94A3B8' : '#1877F2',
                }}>
                {isFollowing ? 'أتابعه ✓' : '+ متابعة'}
              </Text>
            </Pressable>
          </View>
        )}

        <TimeElapsed timestamp={opts.timestamp}>
          {({timeElapsed}) => (
            <MaybeLinkText
              to={opts.postHref}
              label={timestampLabel}
              title={timestampLabel}
              disableMismatchWarning
              disableUnderline
              onPress={opts.linkDisabled ? undefined : onBeforePressPost}
              style={[
                a.pl_2xs,
                a.text_sm,
                a.leading_tight,
                IS_ANDROID && a.flex_grow,
                a.text_right,
                t.atoms.text_contrast_medium,
                web({
                  whiteSpace: 'nowrap',
                }),
              ]}>
              &middot; {timeElapsed}
            </MaybeLinkText>
          )}
        </TimeElapsed>
      </View>
    </View>
  )
}
PostMeta = memo(PostMeta)
export {PostMeta}
