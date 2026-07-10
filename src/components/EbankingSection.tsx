import { RateRow, type RateRowData } from './RateRow'

export function EbankingSection({ rows }: { rows: RateRowData[] }) {
  if (rows.length === 0) return null

  return (
    <div className="section section--ebanking">
      <div className="section__title">
        eBanking <span className="section__title-note">· solo homebanking, no comparable con efectivo</span>
      </div>
      {rows.map((row) => (
        <RateRow key={row.key} row={row} showKind={false} />
      ))}
    </div>
  )
}
