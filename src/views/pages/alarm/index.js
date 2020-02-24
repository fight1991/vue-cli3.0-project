export default {
  permission: '',
  icon: 'icon-alarm',
  path: '/alarm',
  name: 'alarm',
  meta: {
    title: '告警管理'
  },
  children: [
    {
      permission: '',
      path: '/alarm/realTime',
      name: 'alarm-realTime',
      meta: {
        title: '实时警告',
        component: () => import(/* webpackChunkName: "alarm-realTime" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/alarm/history',
      name: 'alarm-history',
      meta: {
        title: '历史告警查询',
        component: () => import(/* webpackChunkName: "alarm-history" */ '@/views/pages/demo')
      }
    }
  ]
}
