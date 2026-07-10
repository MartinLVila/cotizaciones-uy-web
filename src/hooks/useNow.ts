import { useEffect, useState } from 'react'

// Re-renders periodically so relative timestamps ("hace 5 min") stay
// current without the user reloading the page.
export function useNow(intervalMs: number): number {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  return now
}
