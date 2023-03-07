import { createRouter, createWebHistory } from 'vue-router'
// const Container = () => import('@/components/Container.vue')
import Container from '@/components/Container.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/themePreview'
    },
    {
      path: '/themePreview',
      component: Container
    }
  ]
})
export default router