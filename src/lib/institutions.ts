// Presentation-only metadata, not part of the payload. Matches the slugs in
// https://github.com/MartinLVila/cotizaciones-uy/blob/main/data/v1/institutions.json
interface InstitutionMeta {
  name: string
  kind: string
}

const INSTITUTIONS: Record<string, InstitutionMeta> = {
  bcu: { name: 'Banco Central del Uruguay', kind: 'referencia' },
  itau: { name: 'Itau Uruguay', kind: 'banco' },
  brou: { name: 'Banco de la Republica Oriental del Uruguay', kind: 'banco' },
  bbva: { name: 'BBVA Uruguay', kind: 'banco' },
  varlix: { name: 'Varlix', kind: 'casa de cambio' },
  gales: { name: 'Gales', kind: 'casa de cambio' },
  matriz: { name: 'Cambio Matriz', kind: 'casa de cambio' },
}

export function institutionKind(slug: string): string {
  return INSTITUTIONS[slug]?.kind ?? 'casa de cambio'
}

// Used only for the `failures` list, where we have a slug but no `Rate`
// (and therefore no `institution_name`) to read a display name from.
export function institutionName(slug: string): string {
  return INSTITUTIONS[slug]?.name ?? slug
}

const CURRENCY_PRIORITY: Record<string, number> = { USD: 0, EUR: 1 }

export function sortCurrencies(codes: string[]): string[] {
  return [...codes].sort((a, b) => {
    const pa = CURRENCY_PRIORITY[a] ?? 99
    const pb = CURRENCY_PRIORITY[b] ?? 99
    return pa - pb || a.localeCompare(b)
  })
}
