// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],

  devtools: { enabled: true },

  // 全局 CSS
  css: ['~/assets/css/main.css'],

  // ========== GitHub Pages 静态部署配置 ==========
  // 如果是用户主页 (username.github.io)，baseURL 设为 '/'
  // 如果是项目主页 (username.github.io/repo-name)，改为 '/repo-name/'
  app: {
    baseURL: '/',
  },

  // 静态生成配置
  nitro: {
    preset: 'github-pages',
  },
})
