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
import { NO_DATA, rateKey, type Rate } from './lib/types'

type BaseRow = Omit<RateRowData, 'isBestBuy' | 'isBestSell'>

function buildRow(rate: Rate, flashingKeys: ReadonlySet<string>): BaseRow {
  const key = rateKey(rate)
  const buy = parseMilliunits(rate.buy)
  const sell = parseMilliunits(rate.sell)
  const spread = buy !== null && sell !== null ? sell - buy : null

  return {
    key,
    institution: rate.institution,
    name: rate.institution_name,
    buyStr: rate.buy || NO_DATA,
    sellStr: rate.sell || NO_DATA,
    buyValue: buy,
    sellValue: sell,
    spreadStr: spread === null ? NO_DATA : formatMilliunits(spread),
    pctStr: spread !== null && buy ? `· ${((spread / buy) * 100).toFixed(1).replace('.', ',')}%` : '',
    quotedAt: rate.quoted_at,
    fetchedAt: rate.fetched_at,
    sourceUrl: rate.source_url,
    flash: flashingKeys.has(key),
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

  // Deliberately does not depend on `now`: this rebuilds the comparison
  // (filter, sort, best-of scan) only when the data or currency actually
  // change, not on every 30s clock tick. Relative-time strings are
  // formatted from `now` at render time instead (see RateRow).
  const comparison = useMemo(() => {
    const cashBase = rates
      .filter((r) => r.currency === currency && r.rate_type === 'cash')
      .map((r) => buildRow(r, flashingKeys))
      .sort((a, b) => a.name.localeCompare(b.name, 'es'))

    let bestBuy: BaseRow | null = null
    let bestBuyValue = -Infinity
    let bestSell: BaseRow | null = null
    let bestSellValue = Infinity
    for (const row of cashBase) {
      if (row.buyValue !== null && row.buyValue > bestBuyValue) {
        bestBuy = row
        bestBuyValue = row.buyValue
      }
      if (row.sellValue !== null && row.sellValue < bestSellValue) {
        bestSell = row
        bestSellValue = row.sellValue
      }
    }

    const cashRows: RateRowData[] = cashBase.map((row) => ({
      ...row,
      isBestBuy: row.key === bestBuy?.key,
      isBestSell: row.key === bestSell?.key,
    }))

    const official = rates.find((r) => r.currency === currency && r.rate_type === 'official')
    const ebankingRows: RateRowData[] = rates
      .filter((r) => r.currency === currency && r.rate_type === 'ebanking')
      .map((r) => ({ ...buildRow(r, flashingKeys), isBestBuy: false, isBestSell: false }))

    return { cashRows, bestBuy, bestSell, official, ebankingRows }
  }, [rates, currency, flashingKeys])

  const failures = useMemo(
    () =>
      Object.entries(data?.failures ?? {}).map(([slug, reason]) => ({
        name: institutionName(slug),
        reason: reason.slice(0, 80),
      })),
    [data],
  )

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

      {comparison.cashRows.length > 0 && (
        <BestOfPanel
          bestForSelling={comparison.bestBuy && { name: comparison.bestBuy.name, value: comparison.bestBuy.buyStr }}
          bestForBuying={comparison.bestSell && { name: comparison.bestSell.name, value: comparison.bestSell.sellStr }}
        />
      )}

      {comparison.official && (
        <OfficialReference
          value={
            comparison.official.buy === comparison.official.sell
              ? comparison.official.buy
              : `${comparison.official.buy} / ${comparison.official.sell}`
          }
          when={formatRelative(comparison.official.quoted_at, now)}
        />
      )}

      <RatesSection rows={comparison.cashRows} now={now} loading={loading && !data} failures={failures} />

      <EbankingSection rows={comparison.ebankingRows} now={now} />

      <Footer />
    </main>
  )
}

export default App
