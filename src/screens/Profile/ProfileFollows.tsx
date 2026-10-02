import {useMemo} from 'react'
import {Plural} from '@lingui/react/macro'

import {
  type CommonNavigatorParams,
  type NativeStackScreenProps,
} from '#/lib/routes/types'
import {sanitizeDisplayName} from '#/lib/strings/display-names'
import {useProfileQuery} from '#/state/queries/profile'
import {useProfileFollowsQuery} from '#/state/queries/profile-follows'
import {useResolveDidQuery} from '#/state/queries/resolve-uri'
import {ProfileFollows as ProfileFollowsComponent} from '#/view/com/profile/ProfileFollows'
import * as Layout from '#/components/Layout'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'ProfileFollows'>
export const ProfileFollowsScreen = ({route}: Props) => {
  const {name} = route.params

  const {data: resolvedDid} = useResolveDidQuery(name)
  const {data: profile} = useProfileQuery({
    did: resolvedDid,
  })
  const {data: followsData} = useProfileFollowsQuery(resolvedDid)

  const actualFollowsCount = useMemo(() => {
    const listCount = followsData?.pages?.[0]?.follows?.length ?? 0
    const reportedCount = profile?.followsCount ?? 0
    return Math.max(listCount, reportedCount)
  }, [followsData, profile])

  return (
    <Layout.Screen testID="profileFollowsScreen">
      <Layout.Header.Outer>
        <Layout.Header.BackButton />
        <Layout.Header.Content>
          {profile && (
            <>
              <Layout.Header.TitleText>
                {sanitizeDisplayName(profile.displayName || profile.handle)}
              </Layout.Header.TitleText>
              <Layout.Header.SubtitleText>
                <Plural
                  value={actualFollowsCount}
                  one="# following"
                  other="# following"
                />
              </Layout.Header.SubtitleText>
            </>
          )}
        </Layout.Header.Content>
        <Layout.Header.Slot />
      </Layout.Header.Outer>
      <ProfileFollowsComponent name={name} />
    </Layout.Screen>
  )
}
