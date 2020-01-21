// import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/main.vue'
// Vue.use(VueRouter)
import Error from '@/views/error'
const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  }
]
routes.push(...Error)
const router = new VueRouter({
  routes
})

export default router
