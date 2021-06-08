import Vue from "vue";
import Vuex from "vuex";
import peer from "./peer";
import user from "./user";

// import { mutations } from "./types"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    peer,
    user,
  },
  state: {},
  mutations: {},
  actions: {},
});
