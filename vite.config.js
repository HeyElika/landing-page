import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Vercel serves this from the domain root; the internal review host serves
  // it from a prefix. Set BASE_PATH at build time to move it, and everything
  // the pages reference follows: see src/lib/paths.js and check-paths.mjs.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: {
    // Vite rejects requests whose Host header it does not recognise, which
    // blocks previewing the dev server through a tunnel. Dev only: the
    // production build has no server and is unaffected.
    allowedHosts: ['.trycloudflare.com', '.loca.lt', '.ngrok-free.app'],
  },
})
