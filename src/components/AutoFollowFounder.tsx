import {useEffect, useRef} from 'react'
import {useAgent, useSession} from '#/state/session'

const FOUNDER_DID = 'did:plc:7guneefzy5n5fnaeybqjtiy3'

export function AutoFollowFounder() {
  const agent = useAgent()
  const {hasSession, currentAccount} = useSession()
  const followedRef = useRef(false)

  useEffect(() => {
    if (!hasSession || !currentAccount || currentAccount.did === FOUNDER_DID || followedRef.current) {
      return
    }

    const followFounder = async () => {
      try {
        followedRef.current = true
        const res = await agent.getProfile({actor: FOUNDER_DID})
        if (!res.data.viewer?.following) {
          await agent.follow({subject: FOUNDER_DID})
          console.log('[ORBIS] Auto-followed founder Mahmoud Safwat 👑')
        }
      } catch (err) {
        // Silent fail
      }
    }

    followFounder()
  }, [hasSession, currentAccount, agent])

  return null
}