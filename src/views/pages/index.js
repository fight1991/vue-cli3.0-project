import DataView from './dataView'
import Plant from './plant'
import Inverter from './inverter'
import Module from './module'
import Battery from './battery'
import Alarm from './alarm'
import Factory from './factory'
import AfterSale from './afterSale'
import Upgrade from './upgrade'
import Message from './message'
import Relog from './relog'
const Home = {
  path: '/index',
  hidden: true,
  name: 'tab-index',
  meta: {
    title: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/pages/home')
  }
}
export default [
  Home,
  DataView,
  Plant,
  Inverter,
  Module,
  Battery,
  Alarm,
  Factory,
  AfterSale,
  Upgrade,
  Message,
  Relog
]
