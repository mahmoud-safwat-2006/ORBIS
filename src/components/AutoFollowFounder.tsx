import {useEffect, useRef} from 'react'
import {follow} from '@bsky/sdk'
import {type DidString} from '@atproto/syntax'
import {useMaybePdsClient, useSession} from '#/state/session'

const FOUNDER_DID = 'did:plc:7guneefzy5n5fnaeybqjtiy3' as DidString

export function AutoFollowFounder() {
  const pdsClient = useMaybePdsClient()
  const {hasSession, currentAccount} = useSession()
  const attemptedRef = useRef(false)

  useEffect(() => {
    if (!hasSession || !currentAccount || !pdsClient || currentAccount.did === FOUNDER_DID || attemptedRef.current) {
      return
    }

    attemptedRef.current = true

    const followFounder = async () => {
      try {
        await pdsClient.call(follow, {did: FOUNDER_DID})
        console.log('[ORBIS] Followed founder Mahmoud Safwat successfully 👑')
      } catch (err) {
        // إذا كان يتابعه بالفعل أو فشل صامت، لا يحدث أي خطأ
      }
    }

    followFounder()
  }, [hasSession, currentAccount, pdsClient])

  return null
}