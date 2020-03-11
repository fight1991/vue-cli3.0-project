export default {
  permission: '',
  icon: 'icon-nibianqi',
  path: '/bus/inverter',
  name: 'bus-inverter',
  meta: {
    title: '逆变器管理'
  },
  children: [
    {
      permission: '',
      path: '/bus/inverter/add',
      name: 'bus-inverter-add',
      meta: {
        title: '逆变器创建',
        component: () => import(/* webpackChunkName: "bus-inverter-add" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: 'bus/inverter/info',
      name: '/bus-inverter-info',
      meta: {
        title: '逆变器信息查询',
        component: () => import(/* webpackChunkName: "bus-inverter-info" */ '@/views/pages/demo')
      }
    }
  ]
}
