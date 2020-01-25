import VueRouter from 'vue-router'
import Main from '../views/main.vue'
import Error from '@/views/error'
const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/login.vue')
  }
]
routes.push(...Error)
const router = new VueRouter({
  routes
})

export default router
