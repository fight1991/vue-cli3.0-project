export default {
  icon: 'icon-power',
  path: '/bus/plant',
  name: 'bus-plant',
  // hidden: true,
  meta: {
    permission: [1, 2, 3],
    title: 'plantM'
  },
  children: [
    {
      path: '/bus/plant/add',
      name: 'bus-plant-add',
      component: () => import(/* webpackChunkName: "bus-plant-add" */ '@/views/pages/plant/createPlant'),
      meta: {
        permission: [2, 3],
        title: 'plantN',
        opType: 'add'
      }
    },
    {
      path: '/bus/plant/view',
      name: 'bus-plant-view',
      component: () => import(/* webpackChunkName: "bus-plant-view" */ '@/views/pages/plant/showPlant'),
      meta: {
        permission: [1, 2, 3],
        title: 'plantS'
      }
    }
  ]
}
