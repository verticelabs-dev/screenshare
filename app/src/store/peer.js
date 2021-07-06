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
    deafen: false,
  },
  getters: {
    userInMeeting(state) {
      return state.roomCode;
    },
  },
  mutations: {
    [mutations.ADD_PEER](state, peer) {
      state.peers.push(peer);
    },
    [mutations.SET_PEERS](state, peers) {
      state.peers = peers;
    },
    [mutations.DEAFEN_PEERS](state, { deafen }) {
      console.log("HIT HERE", deafen);
      state.deafen = deafen;
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
      const ogVideoStream = context.state.videoStream;
      context.commit(mutations.SET_VIDEO_STREAM, params);

      if (context.state.audioStream && !ogVideoStream) {
        // The audioStream has already been created but no video yet
        context.state.peers.forEach((peer) => {
          if (peer._peerID === "You") return false;

          const tracks = params.videoStream.getTracks();

          tracks.forEach((track) => {
            peer.addTrack(track, context.state.audioStream);
          });
        });
      } else if (ogVideoStream) {
        // A video stream has been added before so we will replace it
        context.state.peers.forEach((peer) => {
          if (peer._peerID === "You") return false;

          const oldTrack = ogVideoStream.getTracks()[0];
          const newTracks = params.videoStream.getTracks();

          oldTrack.stop();

          newTracks.forEach((track) => {
            peer.replaceTrack(oldTrack, track, context.state.audioStream);
          });
        });
      } else {
        // Stream hasn't been created on the peer before
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
    deafenPeers(context, params) {
      context.commit(mutations.DEAFEN_PEERS, params);
    },
    async createPeer(context, { initiator = true, userInfo = {} }) {
      let audioStream = context.state.audioStream;
      if (!audioStream) {
        audioStream = await getAudioInput();
        context.commit(mutations.SET_AUDIO_STREAM, { audioStream });
      }

      const peer = new Peer({ initiator, trickle: false, stream: audioStream });
      peer._peerID = userInfo.id;
      peer._joinRequest = userInfo.joinRequest;
      peer._user = userInfo.user || {};

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
