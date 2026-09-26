import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({

  plugins: [
    react(),
  ],

  // GitHub Pages:
  // https://ladyred145.github.io/NatGamez/
  base: '/NatGamez/',

  build: {

    outDir: 'dist',

    emptyOutDir: true,

  },

});