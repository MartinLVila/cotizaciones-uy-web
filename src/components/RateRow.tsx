import { institutionKind } from '../lib/institutions'
import { NO_DATA } from '../lib/types'
import { formatRelative } from '../lib/time'

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
  quotedAt: string
  fetchedAt: string
  sourceUrl: string
  isBestBuy: boolean
  isBestSell: boolean
  flash: boolean
}

interface RateRowProps {
  row: RateRowData
  now: number
  showKind: boolean
}

export function RateRow({ row, now, showKind }: RateRowProps) {
  const quotedRel = formatRelative(row.quotedAt, now)
  const quotedFull = `cotización: ${row.quotedAt || NO_DATA} - relevado: ${row.fetchedAt || NO_DATA}`

  return (
    <a
      href={row.sourceUrl}
      target="_blank"
      rel="noopener"
      title={quotedFull}
      className={row.flash ? 'rate-row rate-row--flash' : 'rate-row'}
    >
      <div className="rate-row__head">
        <div className="rate-row__name-group">
          <span className="rate-row__name">{row.name}</span>
          {showKind && <span className="rate-row__kind">{institutionKind(row.institution)}</span>}
        </div>
        <span className="rate-row__when">{quotedRel}</span>
      </div>
      <div className="rate-row__grid">
        <div className="rate-cell">
          <div className="rate-cell__label mono-label">Compra</div>
          <div className={row.isBestBuy ? 'rate-cell__value mono-num rate-cell__value--accent' : 'rate-cell__value mono-num'}>
            {row.buyStr}
          </div>
        </div>
        <div className="rate-cell">
          <div className="rate-cell__label mono-label">Venta</div>
          <div className={row.isBestSell ? 'rate-cell__value mono-num rate-cell__value--accent' : 'rate-cell__value mono-num'}>
            {row.sellStr}
          </div>
        </div>
        <div className="rate-cell">
          <div className="rate-cell__label mono-label">Spread</div>
          <div className="rate-cell__spread mono-num">
            {row.spreadStr} <span className="rate-cell__pct">{row.pctStr}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
