import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueTypeImports from 'vite-plugin-vue-type-imports'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      // When using type-based declaration, we lose the ability to declare default values for the props.
      // This can be resolved by the currently experimental Reactivity Transform
      reactivityTransform: true,
    }),
    VueTypeImports(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
