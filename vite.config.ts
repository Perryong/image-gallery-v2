import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  // When building for GitHub Pages project site, set base to your repo name
  base: process.env.NODE_ENV === 'production'
    ? '/image-gallery-v2/'
    : '/',

  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // Optional: customize build output directory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
