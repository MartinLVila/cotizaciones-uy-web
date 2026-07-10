import { RateRow, type RateRowData } from './RateRow'

interface Failure {
  name: string
  reason: string
}

interface RatesSectionProps {
  rows: RateRowData[]
  loading: boolean
  failures: Failure[]
}

export function RatesSection({ rows, loading, failures }: RatesSectionProps) {
  return (
    <div className="section">
      <div className="section__title">Efectivo</div>

      {loading && <div className="loading">Conectando...</div>}

      {!loading && rows.length === 0 && (
        <div className="empty">Sin cotizaciones en efectivo para esta moneda.</div>
      )}

      {rows.map((row) => (
        <RateRow key={row.key} row={row} showKind />
      ))}

      {failures.length > 0 && (
        <div className="failures">
          <div className="failures__title">Sin dato en este relevamiento</div>
          {failures.map((f) => (
            <div key={f.name} className="failures__item">
              <span className="failures__name">{f.name}</span> - {f.reason}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
