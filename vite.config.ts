import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },


  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },

  preview: {
    port: 4173,
  },
})