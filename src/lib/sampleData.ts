import type { Payload, Rate } from './types'

// Shown only when the live dataset is unreachable, so the page still
// demonstrates its layout instead of going blank. Same shape as the real
// payload, values are illustrative.
export function sampleData(): Payload {
  const now = Date.now()
  const isoAgo = (minutes: number) => new Date(now - minutes * 60_000).toISOString()
  const today = isoAgo(0).slice(0, 10)

  const rate = (
    institution: string,
    institution_name: string,
    currency: string,
    buy: string,
    sell: string,
    rate_type: Rate['rate_type'],
    quoted_at: string,
    source_url: string,
  ): Rate => ({
    institution,
    institution_name,
    currency,
    buy,
    sell,
    rate_type,
    quoted_at,
    fetched_at: isoAgo(34),
    source_url,
  })

  return {
    schema_version: 1,
    generated_at: isoAgo(34),
    rates: [
      rate('bcu', 'Banco Central del Uruguay', 'USD', '39.852', '39.852', 'official', today, 'https://www.bcu.gub.uy/'),
      rate('bcu', 'Banco Central del Uruguay', 'EUR', '46.71', '46.71', 'official', today, 'https://www.bcu.gub.uy/'),
      rate('itau', 'Itau Uruguay', 'USD', '38.90', '41.10', 'cash', isoAgo(52), 'https://www.itau.com.uy/'),
      rate('itau', 'Itau Uruguay', 'EUR', '44.85', '48.95', 'cash', isoAgo(52), 'https://www.itau.com.uy/'),
      rate('brou', 'Banco de la Republica Oriental del Uruguay', 'USD', '38.75', '41.25', 'cash', isoAgo(41), 'https://www.brou.com.uy/'),
      rate('brou', 'Banco de la Republica Oriental del Uruguay', 'EUR', '44.60', '49.20', 'cash', isoAgo(41), 'https://www.brou.com.uy/'),
      rate('brou', 'Banco de la Republica Oriental del Uruguay', 'USD', '39.15', '40.85', 'ebanking', isoAgo(41), 'https://www.brou.com.uy/'),
      rate('varlix', 'Varlix', 'USD', '39.30', '40.55', 'cash', isoAgo(27), 'https://www.varlix.com.uy/'),
      rate('varlix', 'Varlix', 'EUR', '45.40', '48.30', 'cash', isoAgo(27), 'https://www.varlix.com.uy/'),
      rate('gales', 'Gales', 'USD', '39.40', '40.60', 'cash', isoAgo(33), 'https://www.gales.com.uy/'),
      rate('gales', 'Gales', 'EUR', '45.30', '48.45', 'cash', isoAgo(33), 'https://www.gales.com.uy/'),
      rate('matriz', 'Cambio Matriz', 'USD', '39.25', '40.70', 'cash', isoAgo(58), 'https://www.cambiomatriz.com.uy/'),
      rate('matriz', 'Cambio Matriz', 'EUR', '45.20', '48.60', 'cash', isoAgo(58), 'https://www.cambiomatriz.com.uy/'),
    ],
    failures: { bbva: 'HTTPError: HTTP Error 403: Forbidden' },
  }
}
