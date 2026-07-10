# cotizaciones-uy-web

Frontend for [cotizaciones-uy](https://github.com/MartinLVila/cotizaciones-uy),
an open dataset of currency exchange rates in Uruguay. This app has no
backend of its own: it reads the dataset's published JSON directly and
renders it.

## Status

Live at https://martinlvila.github.io/cotizaciones-uy-web/. Financial-terminal
layout: per-currency comparison, best buy/sell highlighted, BCU reference,
integer-milliunit spread. Reads the public dataset published by
[cotizaciones-uy](https://github.com/MartinLVila/cotizaciones-uy).

Deployed automatically to GitHub Pages on every push to `main` (see
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).

## Development

```
npm install
npm run dev
```

```
npm run build    # type-check and produce a static build in dist/
npm run lint      # oxlint
```

## License

MIT, see [LICENSE](LICENSE). The dataset this app reads is a separate
project with its own license (code MIT, data CC0), see
[cotizaciones-uy](https://github.com/MartinLVila/cotizaciones-uy).
