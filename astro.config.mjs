// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server', // <--- ESTO ES VITAL para que el login y la API funcionen
  server: {
    port: 4321,
    host: true, // Esto es VITAL: permite conexiones externas al contenedor
  },
  security: {
    checkOrigin: false,
  },
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({
    mode: 'standalone'
  })
});