import i18n from "./i18n/index";

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "amazing-talker-calendar",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ["@nuxtjs/proxy", "@nuxtjs/axios", ["nuxt-i18n", i18n]],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
  axios: {
    proxy: true,
  },
  proxy: {
    "/api": {
      target:
        "https://api.amazingtalker.com/v1/guest/teachers/amy-estrada/schedule",
      pathRewrite: {
        "^/api": "/",
        changeOrigin: true,
      },
    },
  },
};
