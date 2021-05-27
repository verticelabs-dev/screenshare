import Peer from "simple-peer";
import { mutations } from "./types";
import socket from "../services/SocketService";

export default {
  namespaced: true,
  state: {
    peers: [],
    roomCode: undefined
  },
  mutations: {
    [mutations.ADD_PEER](state, peer) {
      state.peers.push(peer);
    },
    [mutations.SET_ROOM_CODE](state, { roomCode }) {
      state.roomCode = roomCode;
    }
  },
  actions: {
    setRoomCode(context, params) {
      context.commit(mutations.SET_ROOM_CODE, params);
    },
    addPeer(context, params) {
      context.commit(mutations.ADD_PEER, params);
    },
    initPeer(context, { initiator = true, userInfo = {} }) {
      const peer = new Peer({ initiator, trickle: false });
      peer._peerID = userInfo.id;
      peer._joinRequest = userInfo.joinRequest;

      if (userInfo.signal) peer.signal(userInfo.signal);

      peer.on("signal", async (data) => {
        if (data.type === "offer" && peer._joinRequest) {
          peer._joinRequest = false;
          socket.emit("room:join:request:answer", {
            roomCode: context.state.roomCode,
            token: { id: peer._peerID },
            signal: data,
          });
        } else {
          // console.log("GOT SIGNAL 2", data);
          socket.emit("room:stream:create", {
            roomCode: context.state.roomCode,
            signal: data,
            token: { id: peer._peerID },
          });
        }
      });

      peer.on("error", (err) => {
        console.log("error", err);
      });

      peer.on("close", (err) => {
        // self.peers = self.peers.filter((p) => p._id === peer._id);
        console.log("CLOSE", err);
      });

      peer.on("connect", () => {
        peer.send("New peer connected!");
      });

      context.commit(mutations.ADD_PEER, peer);
    },
  },
};
