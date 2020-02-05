export default [
  {
    name: 'demo1-test1-1',
    component: () => import(/* webpackChunckName: "demo1-test1-1" */ '@/views/pages/demo1/test1.vue')
  },
  {
    name: 'demo1-test1-2',
    component: () => import(/* webpackChunckName: "demo1-test1-2" */ '@/views/pages/demo1/test1.vue')
  },
  {
    name: 'demo1-test1-3',
    component: () => import(/* webpackChunckName: "demo1-test1-3" */ '@/views/pages/demo1/test1.vue')
  },
  {
    name: 'demo1-test1-4',
    component: () => import(/* webpackChunckName: "demo1-test1-4" */ '@/views/pages/demo1/test1.vue')
  }
]
