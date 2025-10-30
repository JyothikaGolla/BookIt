import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config = {
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    alias: {
      '@assets': '/src/assets'
    }
  }
}

export default defineConfig(config)
