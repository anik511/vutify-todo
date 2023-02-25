import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { VueEditor } from "vue2-editor";


Vue.config.productionTip = false
Vue.component('VueEditor', VueEditor)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
