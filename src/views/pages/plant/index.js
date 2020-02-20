export default {
  permission: '',
  icon: 'el-icon-eleme',
  path: '/plant',
  name: 'plant',
  // hidden: true,
  meta: {
    title: '电站管理'
  },
  children: [
    {
      permission: '',
      path: '/plant/add',
      name: 'plant-add',
      meta: {
        title: '创建电站',
        component: () => import(/* webpackChunkName: "plant-add" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: '/plant/view',
      name: 'plant-view',
      meta: {
        title: '电站显示',
        component: () => import(/* webpackChunkName: "plant-view" */ '@/views/pages/demo')
      }
    }
  ]
}
