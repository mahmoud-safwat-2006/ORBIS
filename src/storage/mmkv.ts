import {MMKV as RealMMKV} from 'react-native-mmkv'

const globalStores = new Map<string, Map<string, string>>()
const globalListeners = new Map<string, Set<(key: string) => void>>()

function getStore(id: string): Map<string, string> {
  let s = globalStores.get(id)
  if (!s) {
    s = new Map<string, string>()
    globalStores.set(id, s)
  }
  return s
}

function getListeners(id: string): Set<(key: string) => void> {
  let l = globalListeners.get(id)
  if (!l) {
    l = new Set<(key: string) => void>()
    globalListeners.set(id, l)
  }
  return l
}

export class SafeMMKV {
  private mmkv: RealMMKV | null = null
  private id: string

  constructor({id}: {id?: string} = {}) {
    this.id = id || 'default'
    try {
      this.mmkv = new RealMMKV({id})
    } catch (e) {
      this.mmkv = null
    }
  }

  set(key: string, value: string | boolean | number): void {
    if (this.mmkv) {
      try {
        this.mmkv.set(key, value)
      } catch {}
    }
    getStore(this.id).set(key, String(value))
    getListeners(this.id).forEach(cb => {
      try { cb(key) } catch {}
    })
  }

  getString(key: string): string | undefined {
    if (this.mmkv) {
      try {
        const val = this.mmkv.getString(key)
        if (val !== undefined && val !== null) return val
      } catch {}
    }
    return getStore(this.id).get(key)
  }

  delete(key: string): void {
    if (this.mmkv) {
      try {
        this.mmkv.delete(key)
      } catch {}
    }
    getStore(this.id).delete(key)
    getListeners(this.id).forEach(cb => {
      try { cb(key) } catch {}
    })
  }

  clearAll(): void {
    if (this.mmkv) {
      try {
        this.mmkv.clearAll()
      } catch {}
    }
    getStore(this.id).clear()
    getListeners(this.id).forEach(cb => {
      try { cb('') } catch {}
    })
  }

  addOnValueChangedListener(callback: (key: string) => void): {remove: () => void} {
    if (this.mmkv) {
      try {
        return this.mmkv.addOnValueChangedListener(callback)
      } catch {}
    }
    const set = getListeners(this.id)
    set.add(callback)
    return {
      remove: () => {
        set.delete(callback)
      },
    }
  }
}

export const MMKV = SafeMMKV