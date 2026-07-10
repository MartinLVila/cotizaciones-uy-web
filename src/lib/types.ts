export type RateType = 'official' | 'cash' | 'ebanking'

export interface Rate {
  institution: string
  institution_name: string
  currency: string
  buy: string
  sell: string
  rate_type: RateType
  quoted_at: string
  fetched_at: string
  source_url: string
}

export interface Payload {
  schema_version: number
  generated_at: string
  rates: Rate[]
  failures: Record<string, string>
}

export function rateKey(rate: Rate): string {
  return `${rate.institution}|${rate.currency}|${rate.rate_type}`
}
