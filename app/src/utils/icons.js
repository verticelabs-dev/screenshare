import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
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
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

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
  faCheckCircle
]);

Vue.component("font-awesome-icon", FontAwesomeIcon);
