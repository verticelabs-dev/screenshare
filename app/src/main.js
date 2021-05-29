import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import socket from './services/SocketService'
import "./assets/scss/main.scss";

Vue.config.productionTip = false;

Vue.prototype.$socket = socket

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
