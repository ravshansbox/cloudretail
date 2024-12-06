import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  exclude: [],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  jsxFramework: 'react',
  outdir: 'styled-system',
  preflight: true,
  theme: { extend: {} },
});
