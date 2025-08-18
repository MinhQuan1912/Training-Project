// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@pinia/nuxt", "@vueuse/nuxt", "@nuxt/icon"],

  css: [
    "~/assets/css/main.css",
    
    
    "~/assets/css/fonts.css"
  ],
  ssr: true,
  future: {
    compatibilityVersion: 4,
  },
  ui: {
    colorMode: false,
  },

  compatibilityDate: "2024-11-27",
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
        },
      ],
    },
  },
});
