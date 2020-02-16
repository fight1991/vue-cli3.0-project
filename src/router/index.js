import VueRouter from 'vue-router'
import Error from '@/views/error'
import businessRouter from '@/views/pages/index.js'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../views/main.vue'),
    children: [...businessRouter]
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
