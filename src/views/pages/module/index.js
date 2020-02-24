export default {
  permission: '',
  icon: 'icon-mokuaiguanli',
  path: '/module',
  name: 'module',
  meta: {
    title: '模块管理',
    component: () => import(/* webpackChunkName: "module" */ '@/views/pages/demo')
  }
}
