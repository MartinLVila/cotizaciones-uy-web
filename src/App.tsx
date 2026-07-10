import { useMemo, useState } from 'react'
import './App.css'
import { BestOfPanel } from './components/BestOfPanel'
import { CurrencyTabs } from './components/CurrencyTabs'
import { EbankingSection } from './components/EbankingSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { OfficialReference } from './components/OfficialReference'
import type { RateRowData } from './components/RateRow'
import { RatesSection } from './components/RatesSection'
import { StatusBanner } from './components/StatusBanner'
import { useNow } from './hooks/useNow'
import { useRates } from './hooks/useRates'
import { useTheme } from './hooks/useTheme'
import { institutionName, sortCurrencies } from './lib/institutions'
import { formatMilliunits, parseMilliunits } from './lib/money'
import { formatRelative } from './lib/time'
import type { Rate } from './lib/types'
import { rateKey } from './lib/types'

function buildRow(rate: Rate, now: number, flashingKeys: ReadonlySet<string>): RateRowData {
  const buy = parseMilliunits(rate.buy)
  const sell = parseMilliunits(rate.sell)
  const spread = buy !== null && sell !== null ? sell - buy : null

  return {
    key: rateKey(rate),
    institution: rate.institution,
    name: rate.institution_name,
    buyStr: rate.buy || 's/d',
    sellStr: rate.sell || 's/d',
    buyValue: buy,
    sellValue: sell,
    spreadStr: spread === null ? 's/d' : formatMilliunits(spread),
    pctStr: spread !== null && buy ? `· ${((spread / buy) * 100).toFixed(1).replace('.', ',')}%` : '',
    quotedRel: formatRelative(rate.quoted_at, now),
    quotedFull: `cotización: ${rate.quoted_at || 's/d'} - relevado: ${rate.fetched_at || 's/d'}`,
    sourceUrl: rate.source_url,
    isBestBuy: false,
    isBestSell: false,
    flash: flashingKeys.has(rateKey(rate)),
  }
}

function App() {
  const { data, error, loading, demo, flashingKeys, retry } = useRates()
  const [theme, toggleTheme] = useTheme()
  const [currency, setCurrency] = useState('USD')
  const now = useNow(30_000)

  const rates = useMemo(() => data?.rates ?? [], [data])

  const currencies = useMemo(() => {
    const found = new Set<string>()
    for (const r of rates) {
      if (r.rate_type !== 'official') found.add(r.currency)
    }
    const codes = sortCurrencies([...found])
    return codes.length > 0 ? codes : ['USD', 'EUR']
  }, [rates])

  const view = useMemo(() => {
    const cashRows = rates
      .filter((r) => r.currency === currency && r.rate_type === 'cash')
      .map((r) => buildRow(r, now, flashingKeys))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'))

    let bestBuy: RateRowData | null = null
    let bestSell: RateRowData | null = null
    for (const row of cashRows) {
      if (row.buyValue !== null && (bestBuy === null || row.buyValue > bestBuy.buyValue!)) bestBuy = row
      if (row.sellValue !== null && (bestSell === null || row.sellValue < bestSell.sellValue!)) bestSell = row
    }
    for (const row of cashRows) {
      row.isBestBuy = bestBuy?.key === row.key
      row.isBestSell = bestSell?.key === row.key
    }

    const official = rates.find((r) => r.currency === currency && r.rate_type === 'official')
    const ebankingRows = rates
      .filter((r) => r.currency === currency && r.rate_type === 'ebanking')
      .map((r) => buildRow(r, now, flashingKeys))

    const failures = Object.entries(data?.failures ?? {}).map(([slug, reason]) => ({
      name: institutionName(slug),
      reason: reason.slice(0, 80),
    }))

    return { cashRows, bestBuy, bestSell, official, ebankingRows, failures }
  }, [rates, currency, now, flashingKeys, data])

  return (
    <main className="shell">
      <Header
        generatedRel={data ? formatRelative(data.generated_at, now) : '...'}
        generatedFull={data ? `generado: ${data.generated_at}` : ''}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {error && !data && <StatusBanner variant="fatal" error={error} onRetry={retry} />}
      {demo && <StatusBanner variant="demo" error={error ?? ''} onRetry={retry} />}

      <CurrencyTabs currencies={currencies} active={currency} onSelect={setCurrency} />

      {view.cashRows.length > 0 && (
        <BestOfPanel
          bestForSelling={view.bestBuy && { name: view.bestBuy.name, value: view.bestBuy.buyStr }}
          bestForBuying={view.bestSell && { name: view.bestSell.name, value: view.bestSell.sellStr }}
        />
      )}

      {view.official && (
        <OfficialReference
          value={view.official.buy === view.official.sell ? view.official.buy : `${view.official.buy} / ${view.official.sell}`}
          when={formatRelative(view.official.quoted_at, now)}
        />
      )}

      <RatesSection rows={view.cashRows} loading={loading && !data} failures={view.failures} />

      <EbankingSection rows={view.ebankingRows} />

      <Footer />
    </main>
  )
}

export default App
