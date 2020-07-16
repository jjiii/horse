import Vue from 'vue'

import App from './App'
import router from './router'
import menu from './components/menu/Menu'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>',
  beforeCreate(){
      //渲染进程调用主进程设置菜单
      //menu.setupAppMenu();
  }
}).$mount('#app')
