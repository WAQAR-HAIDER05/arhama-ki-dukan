import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/arhama-ki-dukan/', // Important for GitHub Pages!
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
