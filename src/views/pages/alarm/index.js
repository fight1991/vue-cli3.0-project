export default {
  permission: '',
  icon: 'icon-alarm',
  path: '/bus/alarm',
  name: 'bus-alarm',
  meta: {
    title: '告警管理'
  },
  children: [
    {
      permission: '',
      path: '/bus/alarm/realTime',
      name: 'bus-alarm-realTime',
      meta: {
        title: '实时警告',
        component: () => import(/* webpackChunkName: "bus-alarm-realTime" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/bus/alarm/history',
      name: 'bus-alarm-history',
      meta: {
        title: '历史告警查询',
        component: () => import(/* webpackChunkName: "bus-alarm-history" */ '@/views/pages/demo')
      }
    }
  ]
}
