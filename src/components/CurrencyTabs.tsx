interface CurrencyTabsProps {
  currencies: string[]
  active: string
  onSelect: (currency: string) => void
}

export function CurrencyTabs({ currencies, active, onSelect }: CurrencyTabsProps) {
  return (
    <div className="tabs-row">
      <div className="currency-tabs">
        {currencies.map((code) => (
          <button
            key={code}
            type="button"
            className={code === active ? 'currency-tab currency-tab--active' : 'currency-tab'}
            onClick={() => onSelect(code)}
          >
            {code}
          </button>
        ))}
      </div>
      <div className="tabs-row__hint">compra: te pagan · venta: pagás</div>
    </div>
  )
}
