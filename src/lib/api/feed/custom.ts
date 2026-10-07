import {
  type Client,
  type XrpcRequestParams,
  XrpcResponseError,
} from '@atproto/lex'

import {PUBLIC_APPVIEW} from '#/lib/constants'
import {createLexClient} from '#/lib/lexClient'
import {
  getAppLanguageAsContentLanguage,
  getContentLanguages,
} from '#/state/preferences/languages'
import {app} from '#/lexicons'
import {type FeedAPI, type FeedAPIResponse} from './types'
import {createBskyTopicsHeader, isORBISOwnedFeed} from './utils'

type GetCustomFeedParams = XrpcRequestParams<typeof app.bsky.feed.getFeed.main>

export class CustomFeedAPI implements FeedAPI {
  client: Client
  params: GetCustomFeedParams
  userInterests?: string

  constructor({
    client,
    feedParams,
    userInterests,
  }: {
    client: Client
    feedParams: GetCustomFeedParams
    userInterests?: string
  }) {
    this.client = client
    this.params = feedParams
    this.userInterests = userInterests
  }

  async peekLatest(): Promise<app.bsky.feed.defs.FeedViewPost> {
    const contentLangs = getContentLanguages().join(',')
    const data = await this.client.call(
      app.bsky.feed.getFeed,
      {
        ...this.params,
        limit: 1,
      },
      {headers: {'Accept-Language': contentLangs}},
    )
    return data.feed[0]
  }

  async fetch({
    cursor,
    limit,
    signal,
  }: {
    cursor: string | undefined
    limit: number
    signal?: AbortSignal
  }): Promise<FeedAPIResponse> {
    const contentLangs = getContentLanguages().join(',')
    const isORBISOwned = isORBISOwnedFeed(this.params.feed)

    let data: app.bsky.feed.getFeed.$OutputBody | null = null

    try {
      data = this.client.did
        ? await this.client.call(
            app.bsky.feed.getFeed,
            {
              ...this.params,
              cursor: cursor?.startsWith('__loop_') ? undefined : cursor,
              limit,
            },
            {
              signal,
              headers: {
                ...(isORBISOwned
                  ? createBskyTopicsHeader(this.userInterests)
                  : {}),
                'Accept-Language': contentLangs,
              },
            },
          )
        : await loggedOutFetch(
            {
              ...this.params,
              cursor: cursor?.startsWith('__loop_') ? undefined : cursor,
              limit,
            },
            signal,
          )
    } catch {
      // If error occurs with custom cursor, retry once with clean cursor
      try {
        data = await loggedOutFetch(
          {...this.params, cursor: undefined, limit},
          signal,
        )
      } catch {
        data = null
      }
    }

    let feed = data?.feed || []
    let nextCursor = data?.cursor

    // TikTok/Facebook Infinite Stream:
    // If the feed reaches its end (no cursor or empty), never stop!
    // Provide a continuous loop cursor so scrolling never halts.
    if (!nextCursor && feed.length > 0) {
      nextCursor = `__loop_${Date.now()}`
    } else if (!nextCursor && feed.length === 0) {
      // Fetch fresh batch if empty
      try {
        const fallback = await loggedOutFetch(
          {...this.params, cursor: undefined, limit},
          signal,
        )
        if (fallback?.feed?.length) {
          feed = fallback.feed
          nextCursor = fallback.cursor || `__loop_${Date.now()}`
        }
      } catch {
        // Silently continue
      }
    }

    return {
      cursor: nextCursor,
      feed,
    }
  }
}

let loggedOutAppviewClient: Client | undefined

function getLoggedOutAppviewClient(): Client {
  return (loggedOutAppviewClient ??= createLexClient(
    {service: PUBLIC_APPVIEW},
    {includeDeviceSessionHeaders: false},
  ))
}

async function loggedOutFetch(
  params: GetCustomFeedParams,
  signal?: AbortSignal,
): Promise<app.bsky.feed.getFeed.$OutputBody | null> {
  const contentLangs = getAppLanguageAsContentLanguage()

  let data = await getFeedOrNull(params, contentLangs, signal)
  if (data?.feed?.length) {
    return data
  }

  data = await getFeedOrNull(params, '', signal)
  return data
}

async function getFeedOrNull(
  params: GetCustomFeedParams,
  contentLangs: string,
  signal?: AbortSignal,
): Promise<app.bsky.feed.getFeed.$OutputBody | null> {
  try {
    return await getLoggedOutAppviewClient().call(
      app.bsky.feed.getFeed,
      params,
      {signal, headers: {'Accept-Language': contentLangs}},
    )
  } catch (e) {
    if (e instanceof XrpcResponseError) {
      return null
    }
    throw e
  }
}
