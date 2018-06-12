import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 全局filter
import './permission' // 权限
import './utils/jsArrayRemove'

/* element */
import Element from 'element-ui'
Vue.use(Element)

/* icon */
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)
import 'font-awesome/css/font-awesome.min.css'

/* markdown */
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

import 'prismjs/themes/prism-tomorrow.css'

/* calendar */
import fullCalendar from 'vue-fullcalendar'
Vue.component('full-calendar', fullCalendar)

/* 懒加载 */
import LazyRender from 'vue-lazy-render'
Vue.use(LazyRender)

/* datatables */
import DataTables from 'vue-data-tables'
Vue.use(DataTables)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
