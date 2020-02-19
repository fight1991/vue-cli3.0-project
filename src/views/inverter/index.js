export default [
  {
    permisson: '',
    path: '/inverter/other',
    name: 'inverter-other',
    meta: {
      title: '逆变器展示'
    },
    component: () => import(/* webpackChunkName: "inverter-other" */ './index.vue')
  }
]
