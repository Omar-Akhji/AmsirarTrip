import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    // Bundle analyzer - generates stats.html after build
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          i18n: ['i18next', 'i18next-browser-languagedetector', 'react-i18next'],
          datepicker: ['react-datepicker', 'date-fns'],
        },
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize CSS
    cssMinify: true,
  },
  // Enable gzip compression and handle large files
  server: {
    compress: true,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    },
    // Increase timeout for large files
    hmr: {
      timeout: 60000
    },
    // Configure MIME types for video files
    mimeTypes: {
      'video/mp4': ['.mp4']
    },
    // Increase request timeout
    proxy: {
      '/api': 'http://localhost:3001',
    },
    // Allow large request bodies
    middlewareMode: false
  },
})
