import abstract from '@/components/abstract.vue'
export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/equipment',
  name: 'equipment',
  component: abstract,
  meta: {
    title: '设备管理'
  },
  children: [
    {
      permission: '',
      path: '/equipment/collectPart',
      name: '/equipment-collectPart',
      meta: {
        title: '采集器固件',
        component: () => import(/* webpackChunkName: "collectPart" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/equipment/inverterPart',
      name: 'equipment-inverterPart',
      meta: {
        title: '逆变器固件',
        component: () => import(/* webpackChunkName: "inverterPart" */ '@/views/pages/demo')
      }
    }
  ]
}
