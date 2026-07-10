// Rates never carry more than a handful of decimal digits, but BCU's
// reference rate does (e.g. "45.986405") and BROU's board pads to five
// ("43.75000"). For comparison and spread purposes we only need three
// digits of precision, so amounts are converted to integer milliunits
// (value * 1000) rather than done in floating point.

export function parseMilliunits(raw: string | null | undefined): number | null {
  if (!raw) return null
  const normalized = raw.trim().replace(',', '.')
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null
  const [wholePart, fractionPart = ''] = normalized.split('.')
  const milli = (fractionPart + '000').slice(0, 3)
  return Number(wholePart) * 1000 + Number(milli)
}

export function formatMilliunits(value: number): string {
  const sign = value < 0 ? '-' : ''
  const abs = Math.abs(value)
  const whole = Math.floor(abs / 1000)
  let fraction = String(abs % 1000).padStart(3, '0')
  if (fraction.endsWith('0')) fraction = fraction.slice(0, 2)
  return `${sign}${whole}.${fraction}`
}
