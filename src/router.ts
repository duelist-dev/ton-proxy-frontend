import Index from '@/pages/Index.vue'
import type { RouterOptions } from 'vite-ssg'

const routes = [
  { path: '/', component: Index, meta: {prerender: true} },
  { path: '/:pathMatch(.*)*', redirect: "/" }
]

export const router: RouterOptions = {
  base: import.meta.env.BASE_URL,
  routes,
};
