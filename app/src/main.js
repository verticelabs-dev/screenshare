import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import socket from "./services/SocketService";
import "./assets/scss/main.scss";

// Load Font Awesome Icons
require("./utils/icons");
require("./events/SocketEvents");

Vue.config.productionTip = false;

Vue.prototype.$socket = socket;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
