import { NO_DATA } from '../lib/types'

interface BestEntry {
  name: string
  value: string
}

interface BestOfPanelProps {
  bestForSelling: BestEntry | null
  bestForBuying: BestEntry | null
}

export function BestOfPanel({ bestForSelling, bestForBuying }: BestOfPanelProps) {
  return (
    <div className="best-grid">
      <div className="best-card">
        <div className="best-card__label mono-label">Mejor para vender</div>
        <div className="best-card__row">
          <span className="best-card__name">{bestForSelling?.name ?? NO_DATA}</span>
          <span className="best-card__value mono-num">{bestForSelling?.value ?? NO_DATA}</span>
        </div>
      </div>
      <div className="best-card">
        <div className="best-card__label mono-label">Mejor para comprar</div>
        <div className="best-card__row">
          <span className="best-card__name">{bestForBuying?.name ?? NO_DATA}</span>
          <span className="best-card__value mono-num">{bestForBuying?.value ?? NO_DATA}</span>
        </div>
      </div>
    </div>
  )
}
