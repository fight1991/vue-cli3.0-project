export default [
  {
    path: '/product/index',
    name: 'product-index',
    meta: {
      title: 'Introduction'
    },
    component: () => import(/* webpackChunkName: "product-introduction" */ '@/views/product/introduct')
  }
]
