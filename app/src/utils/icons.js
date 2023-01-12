import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCalendar,
  faCheckCircle,
  faCircle,
  faCogs,
  faHome,
  faLink,
  faMagic,
  faMicrophoneAlt,
  faMicrophoneAltSlash,
  faQuestionCircle,
  faTv,
  faUserCircle,
  faUserFriends,
  faVideo,
  faVideoSlash,
  faVolumeMute,
  faVolumeUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';

library.add([
  faVolumeMute,
  faVolumeUp,
  faMagic,
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
  faUserCircle,
  faLink
]);

Vue.component("font-awesome-icon", FontAwesomeIcon);
