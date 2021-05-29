import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import socket from './services/SocketService'
import "./assets/scss/main.scss";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([faUserSecret, faVolumeMute, faVolumeUp])

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.prototype.$socket = socket

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
