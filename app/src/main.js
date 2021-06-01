import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import socket from "./services/SocketService";
import "./assets/scss/main.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faVolumeMute,
  faVolumeUp,
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faVideo,
  faVideoSlash,
  faTv,
  faCircle,
  faHome,
  faCalendar,
  faUserFriends,
  faCogs,
  faQuestionCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

import {} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([
  faVolumeMute,
  faVolumeUp,
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faVideo,
  faVideoSlash,
  faTv,
  faCircle,
  faHome,
  faCalendar,
  faUserFriends,
  faCogs,
  faQuestionCircle,
  faCheckCircle,
]);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.prototype.$socket = socket;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
