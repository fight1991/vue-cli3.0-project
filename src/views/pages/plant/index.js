export default {
  permission: '',
  icon: 'icon-power',
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
        component: () => import(/* webpackChunkName: "plant-add" */ '@/views/pages/plant/createPlant')
      }
    },
    {
      permission: '',
      path: '/plant/view',
      name: 'plant-view',
      meta: {
        title: '电站显示',
        component: () => import(/* webpackChunkName: "plant-view" */ '@/views/pages/plant/showPlant')
      }
    }
  ]
}
