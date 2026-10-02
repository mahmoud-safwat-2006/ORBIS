import {type Client} from '@atproto/lex'
import {isAtIdentifierString} from '@atproto/syntax'

import {app, com} from '#/lexicons'
import {type FeedAPI, type FeedAPIResponse} from './types'

export class FollowingFeedAPI implements FeedAPI {
  client: Client

  constructor({client}: {client: Client}) {
    this.client = client
  }

  async peekLatest(): Promise<app.bsky.feed.defs.FeedViewPost> {
    const data = await this.client.call(app.bsky.feed.getTimeline, {
      limit: 1,
    })
    return data.feed[0]
  }

  async fetch({
    cursor,
    limit,
  }: {
    cursor: string | undefined
    limit: number
  }): Promise<FeedAPIResponse> {
    try {
      const data = await this.client.call(app.bsky.feed.getTimeline, {
        cursor,
        limit,
      })

      // If official getTimeline returned posts, use them directly
      if (data.feed && data.feed.length > 0) {
        return {
          cursor: data.cursor,
          feed: data.feed,
        }
      }
    } catch (e) {
      // Timeline API failed or empty, fallback to resilient feed
    }

    // Resilient fallback: If timeline is empty due to server lag, fetch latest posts from followed users directly
    try {
      const sessionDid = this.client.did
      if (sessionDid) {
        const recordsRes = await this.client.call(
          com.atproto.repo.listRecords,
          {
            repo: sessionDid,
            collection: 'app.bsky.graph.follow',
            limit: 15,
          },
        )

        const followedDids = recordsRes.records
          .map(r => (r.value as {subject?: string})?.subject)
          .filter(isAtIdentifierString)

        if (followedDids.length > 0) {
          const feedsPromises = followedDids.slice(0, 10).map(actor =>
            this.client
              .call(app.bsky.feed.getAuthorFeed, {
                actor,
                limit: 3,
                filter: 'posts_no_replies',
              })
              .then(res => res.feed)
              .catch(() => []),
          )

          const allFeeds = await Promise.all(feedsPromises)
          const merged = allFeeds.flat().sort((a, b) => {
            return (
              getCreatedAtTimestamp(b.post.record) -
              getCreatedAtTimestamp(a.post.record)
            )
          })

          if (merged.length > 0) {
            return {
              cursor: undefined,
              feed: merged.slice(0, limit),
            }
          }
        }
      }
    } catch (err) {
      console.error('Error fetching resilient fallback feed:', err)
    }

    return {
      cursor: undefined,
      feed: [],
    }
  }
}

function getCreatedAtTimestamp(record: unknown): number {
  if (
    typeof record !== 'object' ||
    record === null ||
    !('createdAt' in record) ||
    typeof record.createdAt !== 'string'
  ) {
    return 0
  }

  return Date.parse(record.createdAt) || 0
}
