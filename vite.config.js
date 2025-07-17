import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ganti dengan host yang muncul di error kamu (bisa dynamic jika pakai ngrok)
const allowedHost = '0ec13d84d5dc.ngrok-free.app'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [allowedHost]  // ✅ tambahkan ini
  }
})
