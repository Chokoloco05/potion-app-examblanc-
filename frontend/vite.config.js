import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // ← permet d'être accessible depuis l'extérieur (via IP ou nom de domaine)
    port: 5173        // ← ou 3000 si tu préfères
  }
})

