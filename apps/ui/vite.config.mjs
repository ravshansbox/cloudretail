import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  clearScreen: false,
  plugins: [viteReact()],
});
