import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow access from any IP
    port: 5173,      // Specify your desired port
    strictPort: true // If true, Vite will exit if the port is already in use
  }
});
