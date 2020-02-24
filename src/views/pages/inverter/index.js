export default {
  permission: '',
  icon: 'icon-nibianqi',
  path: '/inverter',
  name: 'inverter',
  meta: {
    title: '逆变器管理'
  },
  children: [
    {
      permission: '',
      path: '/inverter/add',
      name: 'inverter-add',
      meta: {
        title: '逆变器创建',
        component: () => import(/* webpackChunkName: "inverter-add" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/inverter/info',
      name: 'inverter-info',
      meta: {
        title: '逆变器信息查询',
        component: () => import(/* webpackChunkName: "inverter-info" */ '@/views/pages/demo')
      }
    }
  ]
}
