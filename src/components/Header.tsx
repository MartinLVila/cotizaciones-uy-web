import type { Theme } from '../hooks/useTheme'

interface HeaderProps {
  generatedRel: string
  generatedFull: string
  theme: Theme
  onToggleTheme: () => void
}

export function Header({ generatedRel, generatedFull, theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <div className="header__brand">
          cotizaciones<span className="header__brand-suffix">.uy</span>
        </div>
        <div className="header__sub mono-label">Pizarra de cambio · Uruguay</div>
      </div>
      <div className="header__meta">
        <span className="header__generated" title={generatedFull}>
          <span className="pulse-dot" />
          {generatedRel}
        </span>
        <button type="button" className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? 'Claro' : 'Oscuro'}
        </button>
      </div>
    </header>
  )
}
