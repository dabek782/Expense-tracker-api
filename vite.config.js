import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Vite config for a JavaScript React app (Radix UI works with this setup)
// - Uses the official React plugin
// - Adds an alias `@` -> `src`
// - Proxies `/api` requests to a backend on localhost:5000 (adjust if needed)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
  },
})