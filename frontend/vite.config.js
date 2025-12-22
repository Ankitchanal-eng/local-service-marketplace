import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vitejs.dev
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // All requests that start with /api will be sent here:
      '/api': {
        target: 'http://localhost:5000', // <-- !! REPLACE 5000 with your actual backend port/URL !!
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Use false if your backend is running on http
      },
    },
  },
})
