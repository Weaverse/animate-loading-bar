import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'animate-loading',
      fileName: (format) => `main.js`,
      formats: ['umd']
    },
    outDir: 'dist',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Ensure consistent naming
        assetFileNames: 'main.css'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Enable modern API for Sass
        api: 'modern-compiler'
      }
    }
  }
})
