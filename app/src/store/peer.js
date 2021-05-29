import Peer from "simple-peer";
import { mutations } from "./types";
import socket from "../services/SocketService";
import { getAudioInput } from "../services/StreamCaptureService";

export default {
  namespaced: true,
  state: {
    peers: [{ id: "You", _peerID: "You" }],
    roomCode: undefined,
    audioStream: undefined,
    videoStream: undefined,
  },
  mutations: {
    [mutations.ADD_PEER](state, peer) {
      state.peers.push(peer);
    },
    [mutations.SET_PEERS](state, peers) {
      state.peers = peers;
    },
    [mutations.SET_ROOM_CODE](state, { roomCode }) {
      state.roomCode = roomCode;
    },
    [mutations.SET_AUDIO_STREAM](state, { audioStream }) {
      state.audioStream = audioStream;
    },
    [mutations.SET_VIDEO_STREAM](state, { videoStream }) {
      state.videoStream = videoStream;
    },
  },
  actions: {
    setVideoStream(context, params) {
      context.commit(mutations.SET_VIDEO_STREAM, params);

      if (context.state.audioStream) {
        context.state.peers.forEach((peer) => {
          if (peer._peerID !== "You") {
            params.videoStream.getTracks().forEach((track) => {
              peer.addTrack(track, context.state.audioStream);
            });
          }
        });
      } else {
        context.state.peers.forEach((peer) => {
          if (peer._peerID !== "You") {
            peer.addStream(params.videoStream);
          }
        });
      }
    },
    setRoomCode(context, params) {
      context.commit(mutations.SET_ROOM_CODE, params);
    },
    addPeer(context, params) {
      context.commit(mutations.ADD_PEER, params);
    },
    async initPeer(context, { initiator = true, userInfo = {} }) {
      let audioStream = context.state.audioStream;
      if (!audioStream) {
        audioStream = await getAudioInput();
        context.commit(mutations.SET_AUDIO_STREAM, { audioStream });
      }

      const peer = new Peer({ initiator, trickle: false, stream: audioStream });
      peer._peerID = userInfo.id;
      peer._joinRequest = userInfo.joinRequest;

      if (userInfo.signal) peer.signal(userInfo.signal);
      if (context.state.videoStream) peer.addStream(context.state.videoStream);

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
        const newPeers = context.state.peers.filter((p) => p._id !== peer._id);

        context.commit(mutations.SET_PEERS, newPeers);
        console.log("CLOSE", err);
      });

      peer.on("connect", () => {
        peer.send("New peer connected!");
      });

      context.commit(mutations.ADD_PEER, peer);
    },
  },
};
