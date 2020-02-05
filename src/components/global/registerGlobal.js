import Vue from 'vue'
import demo1 from '@/views/pages/demo1/page'
console.log(demo1)
let global = [
  ...demo1
]
global.forEach(v => {
  Vue.component(v.name, v.component)
})
