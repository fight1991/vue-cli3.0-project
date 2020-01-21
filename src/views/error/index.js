export default [
  {
    path: '/error/403',
    name: 'error-403',
    component: import(/* webpackChunkName: "error-403" */ './403.vue')
  },
  {
    path: '/error/5xx',
    name: 'error-5xx',
    component: import(/* webpackChunkName: "error-5xx" */ './5xx.vue')
  }
]
