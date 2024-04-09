import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/app/shared'),
      '@modules': path.resolve(__dirname, './src/app/modules'),
    },
  },
  plugins: [react()],
});
