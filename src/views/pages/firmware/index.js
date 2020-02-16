import abstract from '@/components/abstract.vue'
export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/firmware',
  name: 'firmware',
  component: abstract,
  meta: {
    title: '固件列表'
  },
  children: [
    {
      permission: '',
      path: '/firmware/harvesterList',
      name: 'firmware-harvesterList',
      meta: {
        title: '采集器列表',
        component: () => import(/* webpackChunkName: "harvesterList" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/firmware/inverterList',
      name: 'firmware-inverterList',
      meta: {
        title: '逆变器列表',
        component: () => import(/* webpackChunkName: "inverterList" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/firmware/eventList',
      name: 'firmware-eventList',
      meta: {
        title: '事件列表',
        component: () => import(/* webpackChunkName: "eventList" */ '@/views/pages/demo')
      }
    }
  ]
}
