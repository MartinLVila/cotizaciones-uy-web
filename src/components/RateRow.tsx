import { institutionKind } from '../lib/institutions'

export interface RateRowData {
  key: string
  institution: string
  name: string
  buyStr: string
  sellStr: string
  buyValue: number | null
  sellValue: number | null
  spreadStr: string
  pctStr: string
  quotedRel: string
  quotedFull: string
  sourceUrl: string
  isBestBuy: boolean
  isBestSell: boolean
  flash: boolean
}

export function RateRow({ row, showKind }: { row: RateRowData; showKind: boolean }) {
  return (
    <a
      href={row.sourceUrl}
      target="_blank"
      rel="noopener"
      title={row.quotedFull}
      className={row.flash ? 'rate-row rate-row--flash' : 'rate-row'}
    >
      <div className="rate-row__head">
        <div className="rate-row__name-group">
          <span className="rate-row__name">{row.name}</span>
          {showKind && <span className="rate-row__kind">{institutionKind(row.institution)}</span>}
        </div>
        <span className="rate-row__when">{row.quotedRel}</span>
      </div>
      <div className="rate-row__grid">
        <div className="rate-cell">
          <div className="rate-cell__label">Compra</div>
          <div className={row.isBestBuy ? 'rate-cell__value rate-cell__value--accent' : 'rate-cell__value'}>
            {row.buyStr}
          </div>
        </div>
        <div className="rate-cell">
          <div className="rate-cell__label">Venta</div>
          <div className={row.isBestSell ? 'rate-cell__value rate-cell__value--accent' : 'rate-cell__value'}>
            {row.sellStr}
          </div>
        </div>
        <div className="rate-cell">
          <div className="rate-cell__label">Spread</div>
          <div className="rate-cell__spread">
            {row.spreadStr} <span className="rate-cell__pct">{row.pctStr}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
