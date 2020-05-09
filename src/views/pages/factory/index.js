export default {
  permission: '',
  icon: 'icon-factory',
  path: '/bus/factory',
  name: 'bus-factory',
  meta: {
    title: 'factM',
    component: () => import(/* webpackChunkName: "bus-factory" */ '@/views/pages/demo')
  }
}
