import {
  isAtIdentifierString,
  isDidIdentifier,
  normalizeAndEnsureValidHandle,
} from '@atproto/syntax'
import {
  type InfiniteData,
  type QueryClient,
  type QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query'

import {useAppviewClient, usePdsClient, useSession} from '#/state/session'
import {useAnalytics} from '#/analytics'
import {app, com} from '#/lexicons'

const DEFAULT_SORT = 'latest'
const PAGE_SIZE = 30
type RQPageParam = string | undefined

const RQKEY_ROOT = 'profile-follows'
export const RQKEY = (did: string, sort: 'latest' | 'top' = DEFAULT_SORT) => [
  RQKEY_ROOT,
  did,
  sort,
]

export function useProfileFollowsQuery(
  did: string | undefined,
  {
    limit,
    sort,
  }: {
    limit?: number
    sort?: 'latest' | 'top'
  } = {},
) {
  const ax = useAnalytics()
  const isSortEnabled = ax.features.enabled(ax.features.FollowSortEnable)
  const client = useAppviewClient()
  const pdsClient = usePdsClient()
  const {currentAccount} = useSession()

  const sortParam = isSortEnabled ? sort || DEFAULT_SORT : undefined
  const isMe = Boolean(
    currentAccount &&
    (did === currentAccount.did || did === currentAccount.handle),
  )

  return useInfiniteQuery<
    app.bsky.graph.getFollows.$OutputBody,
    Error,
    InfiniteData<app.bsky.graph.getFollows.$OutputBody>,
    QueryKey,
    RQPageParam
  >({
    staleTime: 0,
    queryKey: RQKEY(did || '', sortParam),
    async queryFn({pageParam}: {pageParam: RQPageParam}) {
      // 1. Try standard appview
      try {
        const res = await client.call(app.bsky.graph.getFollows, {
          actor: did || '',
          limit: limit || PAGE_SIZE,
          cursor: pageParam,
          ...(sortParam ? {sort: sortParam} : {}),
        } as app.bsky.graph.getFollows.$Params)

        // If it's another user, or if appview is already fully synced, return it
        if (!isMe || (res.follows && res.follows.length > 1)) {
          return res
        }
      } catch (e) {
        // Appview failed, fallback to PDS
      }

      // 2. Direct PDS sync fallback for logged-in user when appview is lagging
      if (isMe && currentAccount) {
        try {
          const recordsRes = await pdsClient.call(
            com.atproto.repo.listRecords,
            {
              repo: currentAccount.did,
              collection: 'app.bsky.graph.follow',
              limit: limit || PAGE_SIZE,
              cursor: pageParam,
            },
          )

          const followsList = recordsRes.records.flatMap(record => {
            const subject = (record.value as {subject?: unknown})?.subject
            if (!isAtIdentifierString(subject) || !isDidIdentifier(subject)) {
              return []
            }
            return [{subject, uri: record.uri}]
          })

          if (followsList.length > 0) {
            const subjects = followsList.map(f => f.subject)
            const profilesRes = await client.call(app.bsky.actor.getProfiles, {
              actors: subjects,
            })

            const uriMap = new Map(followsList.map(f => [f.subject, f.uri]))
            const profileMap = new Map(
              profilesRes.profiles.map(p => [p.did, p]),
            )

            const follows: app.bsky.actor.defs.ProfileView[] = subjects.flatMap(
              did => {
                const profile = profileMap.get(did)
                if (!profile) return []
                const {$type: _type, ...profileView} = profile
                return [
                  {
                    ...profileView,
                    viewer: {
                      ...(profile.viewer || {}),
                      following: uriMap.get(did),
                    },
                  },
                ]
              },
            )

            const myProfile = await client
              .call(app.bsky.actor.getProfile, {
                actor: currentAccount.did,
              })
              .catch(() => null)
            const subject: app.bsky.actor.defs.ProfileView = myProfile
              ? (({$type: _type, ...profileView}) => profileView)(myProfile)
              : {
                  did: currentAccount.did,
                  handle: normalizeAndEnsureValidHandle(currentAccount.handle),
                }

            return {
              subject,
              follows,
              cursor: recordsRes.cursor,
            }
          }
        } catch (err) {
          console.error('Error fetching directly from PDS:', err)
        }
      }

      return {
        subject: {
          did: did || '',
          handle: did || '',
        } as app.bsky.actor.defs.ProfileView,
        follows: [],
      }
    },
    initialPageParam: undefined,
    getNextPageParam: lastPage => lastPage.cursor,
    enabled: !!did,
  })
}

export function* findAllProfilesInQueryData(
  queryClient: QueryClient,
  did: string,
): Generator<app.bsky.actor.defs.ProfileView, void> {
  const queryDatas = queryClient.getQueriesData<
    InfiniteData<app.bsky.graph.getFollows.$OutputBody>
  >({
    queryKey: [RQKEY_ROOT],
  })
  for (const [_queryKey, queryData] of queryDatas) {
    if (!queryData?.pages) {
      continue
    }
    for (const page of queryData?.pages) {
      for (const follow of page.follows) {
        if (follow.did === did) {
          yield follow
        }
      }
    }
  }
}
