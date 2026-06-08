import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'

import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

import { uiConfig } from './ui.config.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vueDevTools(),
    vue(),
    ui({
      prefix: 'N',
      ui: uiConfig,
      components: {
        globs: [
          'src/shared/**/*.vue',
          'src/layouts/**/*.vue',
          'src/pages/**/*.vue',
        ],
      },
      autoImport: {
        imports: [
          'vue-router',
          'pinia',
          'vue',
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/breakpoints" as *;
          @use "@/styles/mixins" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: true,
        // Опционально: если вы не хотите, чтобы в запросах передавался префикс /api
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
