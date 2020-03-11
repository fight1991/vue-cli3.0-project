export default {
  permission: '',
  icon: 'icon-power',
  path: '/bus/plant',
  name: 'bus-plant',
  // hidden: true,
  meta: {
    title: '电站管理'
  },
  children: [
    {
      permission: '',
      path: '/bus/plant/add',
      name: 'bus-plant-add',
      meta: {
        title: '创建电站',
        component: () => import(/* webpackChunkName: "bus-plant-add" */ '@/views/pages/plant/createPlant')
      }
    },
    {
      permission: '',
      path: '/bus/plant/view',
      name: 'bus-plant-view',
      meta: {
        title: '电站显示',
        component: () => import(/* webpackChunkName: "bus-plant-view" */ '@/views/pages/plant/showPlant')
      }
    }
  ]
}
