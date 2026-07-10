// Presentation-only metadata, not part of the payload. Matches the slugs in
// https://github.com/MartinLVila/cotizaciones-uy/blob/main/data/v1/institutions.json
const KIND: Record<string, string> = {
  bcu: 'referencia',
  itau: 'banco',
  brou: 'banco',
  bbva: 'banco',
  varlix: 'casa de cambio',
  gales: 'casa de cambio',
  matriz: 'casa de cambio',
}

export function institutionKind(slug: string): string {
  return KIND[slug] ?? 'casa de cambio'
}

// Used only for the `failures` list, where we have a slug but no `Rate`
// (and therefore no `institution_name`) to read a display name from.
const NAME: Record<string, string> = {
  bcu: 'Banco Central del Uruguay',
  itau: 'Itau Uruguay',
  brou: 'Banco de la Republica Oriental del Uruguay',
  bbva: 'BBVA Uruguay',
  varlix: 'Varlix',
  gales: 'Gales',
  matriz: 'Cambio Matriz',
}

export function institutionName(slug: string): string {
  return NAME[slug] ?? slug
}

const CURRENCY_PRIORITY: Record<string, number> = { USD: 0, EUR: 1 }

export function sortCurrencies(codes: string[]): string[] {
  return [...codes].sort((a, b) => {
    const pa = CURRENCY_PRIORITY[a] ?? 99
    const pb = CURRENCY_PRIORITY[b] ?? 99
    return pa - pb || a.localeCompare(b)
  })
}
