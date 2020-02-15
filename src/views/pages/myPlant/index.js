export default {
  title: '我的电站',
  permission: '',
  icon: 'el-icon-eleme',
  path: 'plant',
  name: 'plant',
  children: [
    {
      permission: '',
      path: 'plant/add',
      name: 'plant-add',
      meta: {
        title: '创建电站',
        component: () => import(/* webpackChunkName: "plant-add" */ '@/views/pages/demo')
      }
    },
    {
      permission: '',
      path: 'plant/list',
      name: 'plant-list',
      meta: {
        title: '电站列表',
        component: () => import(/* webpackChunkName: "plant-list" */ '@/views/pages/demo')
      }
    }
  ]
}
