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
        opType: 'add',
        component: () => import(/* webpackChunkName: "bus-plant-add" */ '@/views/pages/plant/createPlant')
      }
    },
    {
      permission: '',
      path: '/bus/plant/edit',
      name: 'bus-plant-edit',
      hidden: true,
      meta: {
        title: '编辑电站',
        opType: 'edit',
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
    },
    {
      permission: '',
      path: '/bus/plant/detail',
      name: 'bus-plant-detail',
      hidden: true,
      meta: {
        title: '电站详情',
        page: 'detail',
        component: () => import(/* webpackChunkName: "bus-plant-detail" */ '@/views/pages/plant/plantDetail')
      }
    }
  ]
}
