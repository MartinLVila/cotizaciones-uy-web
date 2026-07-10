export function formatRelative(iso: string | null | undefined, now: number): string {
  if (!iso) return 's/d'

  const dateOnly = iso.length === 10
  const date = new Date(dateOnly ? `${iso}T12:00:00` : iso)
  if (Number.isNaN(date.getTime())) return iso

  if (dateOnly) {
    return `del ${date.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' })}`
  }

  const minutes = (now - date.getTime()) / 60_000
  if (minutes < 1) return 'hace <1 min'
  if (minutes < 60) return `hace ${Math.round(minutes)} min`
  if (minutes < 48 * 60) return `hace ${Math.round(minutes / 60)} h`
  return date.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' })
}
