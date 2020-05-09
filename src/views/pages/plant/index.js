export default {
  permission: '',
  icon: 'icon-power',
  path: '/bus/plant',
  name: 'bus-plant',
  // hidden: true,
  meta: {
    title: 'plantM'
  },
  children: [
    {
      permission: '',
      path: '/bus/plant/add',
      name: 'bus-plant-add',
      meta: {
        title: 'plantN',
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
        title: 'plantE',
        opType: 'edit',
        component: () => import(/* webpackChunkName: "bus-plant-add" */ '@/views/pages/plant/createPlant')
      }
    },
    {
      permission: '',
      path: '/bus/plant/view',
      name: 'bus-plant-view',
      meta: {
        title: 'plantS',
        component: () => import(/* webpackChunkName: "bus-plant-view" */ '@/views/pages/plant/showPlant')
      }
    },
    {
      permission: '',
      path: '/bus/plant/detail',
      name: 'bus-plant-detail',
      hidden: true,
      meta: {
        title: 'plantD',
        page: 'detail',
        component: () => import(/* webpackChunkName: "bus-plant-detail" */ '@/views/pages/plant/plantDetail')
      }
    }
  ]
}
