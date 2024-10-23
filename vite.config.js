// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/~khaic/S2024/threejs/',
  build: {
    outDir: 'dist'
  },
  server: {
    open: true,
  }
});
