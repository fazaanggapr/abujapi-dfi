import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ganti dengan host yang muncul di error kamu (bisa dynamic jika pakai ngrok)
const allowedHost = '613ba3fe8d39.ngrok-free.app'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [allowedHost] 
  }
})
