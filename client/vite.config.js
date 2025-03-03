import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
//import basicSsl from '@vitejs/plugin-basic-ssl'

// define proxy to forward requests from the client to the Flask server
export default defineConfig({
  base: '/',
  plugins: [
    //basicSsl(),
    react(),
    svgr({ include: '**/*.svg' }) // needed to in-line svg files
  ],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/health': {
        // point calls to /health to proxy flask service running on this port
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    manifest: true
  }
});
