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
        <div className="best-card__label">Mejor para vender</div>
        <div className="best-card__row">
          <span className="best-card__name">{bestForSelling?.name ?? 's/d'}</span>
          <span className="best-card__value">{bestForSelling?.value ?? 's/d'}</span>
        </div>
      </div>
      <div className="best-card">
        <div className="best-card__label">Mejor para comprar</div>
        <div className="best-card__row">
          <span className="best-card__name">{bestForBuying?.name ?? 's/d'}</span>
          <span className="best-card__value">{bestForBuying?.value ?? 's/d'}</span>
        </div>
      </div>
    </div>
  )
}
