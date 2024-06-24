// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head: {
      title: 'devsup-admin-web',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    },
  },
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt','@pinia/nuxt'],
  plugins: [
    '~/plugins/lodash.ts',
    '~/plugins/dayjs.ts',
    '~/plugins/axios.ts',
  ],
  css: ['~/assets/css/main.scss', '@mdi/font/css/materialdesignicons.min.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    server: {
      proxy: {
        "/devsup": {
          target: "http://10.0.0.185:8080/",
          changeOrigin: true,
        },
      },
    },
  },
})