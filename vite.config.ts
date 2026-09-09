import tailwindcss from '@tailwindcss/postcss';
import vinext from 'vinext';
import { defineConfig } from 'vite';
export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [vinext()],
  define: {
    'process.env.NEXT_PUBLIC_EDITION': JSON.stringify(
      process.env.PORTFOLIO_EDITION || 'story',
    ),
  },
});
