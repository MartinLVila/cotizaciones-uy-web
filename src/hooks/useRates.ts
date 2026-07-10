import { useCallback, useEffect, useRef, useState } from 'react'
import { sampleData } from '../lib/sampleData'
import { rateKey, type Payload } from '../lib/types'

const LATEST_URL = 'https://martinlvila.github.io/cotizaciones-uy/data/v1/latest.json'
const POLL_INTERVAL_MS = 10 * 60 * 1000
const FLASH_DURATION_MS = 1800

export interface RatesState {
  data: Payload | null
  error: string | null
  loading: boolean
  demo: boolean
  flashingKeys: ReadonlySet<string>
  retry: () => void
}

export function useRates(): RatesState {
  const [data, setData] = useState<Payload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [demo, setDemo] = useState(false)
  const [flashingKeys, setFlashingKeys] = useState<ReadonlySet<string>>(new Set())

  const previousValues = useRef<Map<string, string> | null>(null)
  const isDemo = useRef(false)
  const hasData = useRef(false)
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const load = useCallback(async () => {
    try {
      const response = await fetch(LATEST_URL, { cache: 'no-store' })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const payload = (await response.json()) as Payload

      if (previousValues.current && !isDemo.current) {
        const changed = new Set<string>()
        for (const rate of payload.rates) {
          const key = rateKey(rate)
          const value = `${rate.buy}/${rate.sell}`
          const previous = previousValues.current.get(key)
          if (previous && previous !== value) changed.add(key)
        }
        if (changed.size > 0) {
          clearTimeout(flashTimeout.current)
          setFlashingKeys(changed)
          flashTimeout.current = setTimeout(() => setFlashingKeys(new Set()), FLASH_DURATION_MS)
        }
      }
      previousValues.current = new Map(payload.rates.map((r) => [rateKey(r), `${r.buy}/${r.sell}`]))

      isDemo.current = false
      hasData.current = true
      setData(payload)
      setError(null)
      setDemo(false)
      setLoading(false)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      setLoading(false)
      if (!hasData.current || isDemo.current) {
        isDemo.current = true
        hasData.current = true
        setData(sampleData())
        setDemo(true)
      }
    }
  }, [])

  useEffect(() => {
    load()
    const poll = setInterval(load, POLL_INTERVAL_MS)
    return () => {
      clearInterval(poll)
      clearTimeout(flashTimeout.current)
    }
  }, [load])

  return { data, error, loading, demo, flashingKeys, retry: load }
}
