import { mutations } from "./types";

export default {
  namespaced: true,
  state: {
    user: undefined,
    friends: undefined,
  },
  getters: {},
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user;
    },
    [mutations.SET_FRIENDS](state, friends) {
      state.friends = friends;
    },
  },
  actions: {
    setUser(context, params) {
      context.commit(mutations.SET_USER, params);
    },
    setFriends(context, params) {
      context.commit(mutations.SET_FRIENDS, params);
    },
  },
};
