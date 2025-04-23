// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: this must match your GitHub repo name so
  // generated asset URLs are correct on GitHub Pages
  base: '/image-gallery-v2/',

  plugins: [
    react(),               // JSX / Fast Refresh support
  ],

  resolve: {
    alias: {
      // Allows absolute imports with "@/…" instead of relative paths
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // Optional – purely cosmetic / organisation preferences
  build: {
    outDir: 'dist',        // default is 'dist', shown just for clarity
    assetsDir: 'assets',   // all JS/CSS/images go in dist/assets
    // You can also tweak rollupOptions here if you have multiple entry points
  },
});
