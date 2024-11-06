import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    basicSsl(),
    react(),
    svgr({ include: '**/*.svg' }) // needed to in-line svg files
  ],
  server: {
    host: true,
    port: 443,
    proxy: {
      '/api': {
        // point fetch calls to /api to gateway service
        target: 'http://127.0.0.1:8080/api'
      }
    }
  },
  build: {
    manifest: true
  }
});
