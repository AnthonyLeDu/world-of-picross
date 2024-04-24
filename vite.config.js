import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslint()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData allows you to pass variables or mixins to all Sass files
        additionalData: "@import './src/styles/variables.scss'; @import './src/styles/reset.scss';"
      }
    }
  }
});
