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
    path: '/index',
    redirect: '/'
  },
  {
    path: '*',
    redirect: {
      name: 'error-404'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/pages/login.vue')
  }
]
routes.push(...Error)
const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
