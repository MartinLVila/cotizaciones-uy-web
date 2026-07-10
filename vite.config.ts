import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cotizaciones-uy-web/',
  plugins: [react()],
})
