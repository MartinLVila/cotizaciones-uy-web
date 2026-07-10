export function Footer() {
  return (
    <footer className="footer">
      Fuente:{' '}
      <a href="https://github.com/MartinLVila/cotizaciones-uy" target="_blank" rel="noopener" className="footer__link">
        cotizaciones-uy
      </a>
      , espejo de pizarras públicas refrescado cada hora. Cada institución enlaza a su fuente original. Montos tal
      cual los publica la institución; spread calculado en enteros, sin punto flotante.
    </footer>
  )
}
