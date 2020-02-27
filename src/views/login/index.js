export default {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login'
  },
  component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
}
