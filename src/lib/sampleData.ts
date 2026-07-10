import type { Payload, Rate } from './types'

type SampleRate = Omit<Rate, 'fetched_at'> & { agoMinutes: number }

// Shown only when the live dataset is unreachable, so the page still
// demonstrates its layout instead of going blank. Same shape as the real
// payload, values are illustrative.
export function sampleData(): Payload {
  const now = Date.now()
  const isoAgo = (minutes: number) => new Date(now - minutes * 60_000).toISOString()

  const samples: SampleRate[] = [
    { institution: 'bcu', institution_name: 'Banco Central del Uruguay', currency: 'USD', buy: '39.852', sell: '39.852', rate_type: 'official', quoted_at: isoAgo(0).slice(0, 10), source_url: 'https://www.bcu.gub.uy/', agoMinutes: 34 },
    { institution: 'bcu', institution_name: 'Banco Central del Uruguay', currency: 'EUR', buy: '46.71', sell: '46.71', rate_type: 'official', quoted_at: isoAgo(0).slice(0, 10), source_url: 'https://www.bcu.gub.uy/', agoMinutes: 34 },
    { institution: 'itau', institution_name: 'Itau Uruguay', currency: 'USD', buy: '38.90', sell: '41.10', rate_type: 'cash', quoted_at: isoAgo(52), source_url: 'https://www.itau.com.uy/', agoMinutes: 52 },
    { institution: 'itau', institution_name: 'Itau Uruguay', currency: 'EUR', buy: '44.85', sell: '48.95', rate_type: 'cash', quoted_at: isoAgo(52), source_url: 'https://www.itau.com.uy/', agoMinutes: 52 },
    { institution: 'brou', institution_name: 'Banco de la Republica Oriental del Uruguay', currency: 'USD', buy: '38.75', sell: '41.25', rate_type: 'cash', quoted_at: isoAgo(41), source_url: 'https://www.brou.com.uy/', agoMinutes: 41 },
    { institution: 'brou', institution_name: 'Banco de la Republica Oriental del Uruguay', currency: 'EUR', buy: '44.60', sell: '49.20', rate_type: 'cash', quoted_at: isoAgo(41), source_url: 'https://www.brou.com.uy/', agoMinutes: 41 },
    { institution: 'brou', institution_name: 'Banco de la Republica Oriental del Uruguay', currency: 'USD', buy: '39.15', sell: '40.85', rate_type: 'ebanking', quoted_at: isoAgo(41), source_url: 'https://www.brou.com.uy/', agoMinutes: 41 },
    { institution: 'varlix', institution_name: 'Varlix', currency: 'USD', buy: '39.30', sell: '40.55', rate_type: 'cash', quoted_at: isoAgo(27), source_url: 'https://www.varlix.com.uy/', agoMinutes: 27 },
    { institution: 'varlix', institution_name: 'Varlix', currency: 'EUR', buy: '45.40', sell: '48.30', rate_type: 'cash', quoted_at: isoAgo(27), source_url: 'https://www.varlix.com.uy/', agoMinutes: 27 },
    { institution: 'gales', institution_name: 'Gales', currency: 'USD', buy: '39.40', sell: '40.60', rate_type: 'cash', quoted_at: isoAgo(33), source_url: 'https://www.gales.com.uy/', agoMinutes: 33 },
    { institution: 'gales', institution_name: 'Gales', currency: 'EUR', buy: '45.30', sell: '48.45', rate_type: 'cash', quoted_at: isoAgo(33), source_url: 'https://www.gales.com.uy/', agoMinutes: 33 },
    { institution: 'matriz', institution_name: 'Cambio Matriz', currency: 'USD', buy: '39.25', sell: '40.70', rate_type: 'cash', quoted_at: isoAgo(58), source_url: 'https://www.cambiomatriz.com.uy/', agoMinutes: 58 },
    { institution: 'matriz', institution_name: 'Cambio Matriz', currency: 'EUR', buy: '45.20', sell: '48.60', rate_type: 'cash', quoted_at: isoAgo(58), source_url: 'https://www.cambiomatriz.com.uy/', agoMinutes: 58 },
  ]

  return {
    schema_version: 1,
    generated_at: isoAgo(34),
    rates: samples.map(({ agoMinutes, ...rate }) => ({ ...rate, fetched_at: isoAgo(agoMinutes) })),
    failures: { bbva: 'HTTPError: HTTP Error 403: Forbidden' },
  }
}
