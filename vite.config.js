import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Vite rejects requests whose Host header it does not recognise, which
    // blocks previewing the dev server through a tunnel. Dev only: the
    // production build has no server and is unaffected.
    allowedHosts: ['.trycloudflare.com', '.loca.lt', '.ngrok-free.app'],
  },
})
