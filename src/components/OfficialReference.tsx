interface OfficialReferenceProps {
  value: string
  when: string
}

export function OfficialReference({ value, when }: OfficialReferenceProps) {
  return (
    <div className="official-bar">
      <div className="official-bar__label">
        Referencia BCU <span className="official-bar__note">· oficial, no transaccionable</span>
      </div>
      <div className="official-bar__value">
        {value} <span className="official-bar__when">{when}</span>
      </div>
    </div>
  )
}
