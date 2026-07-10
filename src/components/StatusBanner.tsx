interface StatusBannerProps {
  variant: 'fatal' | 'demo'
  error: string
  onRetry: () => void
}

export function StatusBanner({ variant, error, onRetry }: StatusBannerProps) {
  if (variant === 'fatal') {
    return (
      <div className="banner banner--fatal">
        <div className="banner__text">
          No se pudo leer la fuente <span className="banner__detail">{error}</span>
        </div>
        <button type="button" className="banner__retry banner__retry--fatal" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="banner banner--demo">
      <div className="banner__text">
        <span className="banner__demo-label">Datos de ejemplo</span>{' '}
        <span className="banner__detail">la fuente no respondió ({error}). Mismo esquema.</span>
      </div>
      <button type="button" className="banner__retry" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  )
}
