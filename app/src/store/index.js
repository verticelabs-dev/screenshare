import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const actions = {};
actions.SET_PEER_STREAM = 'SET_PEER_STREAM'

export default new Vuex.Store({
  state: {
    streamUpdates: 0,
    streams: {}
  },
  mutations: {
    ['INCREMENT_STREAM_UPDATES'](state) {
      state.streamUpdates++
    },
    [actions.SET_PEER_STREAM](state, { peerId, stream}) {
      state.streams[peerId] = stream
    }
  },
  actions: {
    incrementStreamUpdates(context) {
      context.commit('INCREMENT_STREAM_UPDATES')
    },
    addPeerStream(context, params) {
      context.commit(actions.SET_PEER_STREAM, params)
    }
  },
  modules: {},
});
