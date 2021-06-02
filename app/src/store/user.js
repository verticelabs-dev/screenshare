import { mutations } from "./types";

export default {
  namespaced: true,
  state: {
    user: undefined,
  },
  getters: {},
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser(context, params) {
      context.commit(mutations.SET_USER, params);
    },
  },
};
