export default {
  permission: '',
  icon: 'icon-alarm',
  path: '/bus/alarm',
  name: 'bus-alarm',
  meta: {
    title: 'alarmM'
  },
  children: [
    {
      permission: '',
      path: '/bus/alarm/realTime',
      name: 'bus-alarm-realTime',
      meta: {
        title: 'alarmTime',
        component: () => import(/* webpackChunkName: "bus-alarm-realTime" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/bus/alarm/history',
      name: 'bus-alarm-history',
      meta: {
        title: 'alarmHistory',
        component: () => import(/* webpackChunkName: "bus-alarm-history" */ '@/views/pages/demo')
      }
    }
  ]
}
