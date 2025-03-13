import './assets/main.css'
import App from './App.vue'
//import { createApp } from 'vue'
import { ViteSSG } from 'vite-ssg'
import { createI18n } from 'vue-i18n'
import { router } from '@/router.ts'

const i18n = createI18n({
  fallbackLocale: 'en',
  availableLocales: ['ru', 'en'],
  messages: {
    en: {
      start: {
        title: 'Proxy to .ton domains',
        description: 'Visit TON Site without any plugin.',
        moreLink: 'More about TON Sites'
      },
      search: {
        inputPlaceholder: 'Enter domain'
      }
    },
    ru: {
      start: {
        title: 'Прокси для доменов .ton',
        description: 'Просматривайте сайты TON без плагинов.',
        moreLink: 'Подробнее о сайтах TON'
      },
      search: {
        inputPlaceholder: 'Введите домен'
      }
    }
  }
});

//createApp(App).mount('#app')
export const createApp = ViteSSG(App, {...router}, ({app}) =>{
  app.use(i18n)
});

