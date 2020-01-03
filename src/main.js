import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import * as filters from './filters' // global filters
// font-awesome
import 'font-awesome/css/font-awesome.css'
import './mock' // simulation data
/*
* 注册 - 业务模块
*/
import dashboard from '@/module-dashboard/' // 面板
import demo from '@/module-demo/' // 面板
import saasClients from '@/module-saas-clients/' // 企业管理

import tools from './utils/common.js'
Vue.prototype.$tools = tools

Vue.use(tools)
Vue.use(dashboard, store)
Vue.use(demo, store)
Vue.use(saasClients,store)


/*
* 注册 - 组件
*/

// 饿了么
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
