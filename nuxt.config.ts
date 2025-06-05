// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-auth-utils",
  ],

  css: ["~/assets/css/main.css"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-11-27",

  build: {
    // transpile: ["@prisma/client"],
  },

  ui: {
    colorMode: false,
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || "",
  },
});