<template>
  <div>
    <div class="flex flex-row justify-center mt-10">
      <RoomControl
        :join-room="joinRoom"
        :create-room="createRoom"
        :room-data.sync="roomData"
        :peer-connection.sync="peerConnection"
      />
    </div>

    <div class="flex flex-row justify-center mt-5">
      <button class="btn btn-sm btn-primary" @click="handleStartStreaming">
        Start Streaming
      </button>
    </div>

    <div class="video-container">
      <video id="video1"></video>
      <video id="video2"></video>
    </div>
  </div>
</template>

<script>
import RoomControl from "./RoomControl";
import {
  getCaptureScreen,
  displayVideoStream,
  getAudioInput,
} from "../services/StreamCaptureService";

import io from "socket.io-client";
import Peer from "simple-peer";
// import jwt_decode from "jwt-decode";

export default {
  components: {
    RoomControl,
  },
  props: {
    msg: String,
  },
  created() {
    const self = this;
    this.socket = io("localhost:8989");

    this.socket.on("token", (token) => {
      this.token = token;
    });

    this.socket.on("error", (err) => {
      console.error(err);
    });

    // A peer is sending a singal ( We may or may not know about them already )
    this.socket.on("room:signal", (signalData) => {
      const matchingPeer = self.peers.find(d => d._peerID === signalData.id)

      if (matchingPeer) {
        matchingPeer.signal(signalData.signal);
      } else {
        self.initPeer(false, {id: signalData.id, signal: signalData.signal})
      }
    });
  },
  data() {
    return {
      peerConnection: false,
      roomData: {},
      roomCode: "",
      peers: [],
      joinRequest: false,
      renegotiate: false,
      audioStream: undefined,
      token: "",
    };
  },
  methods: {
    async handleStartStreaming() {
      const captureStream = await getCaptureScreen({
        video: true,
        audio: true,
      });

      displayVideoStream("video1", captureStream);

      // this.addTrack(audioStream, captureStream);
      this.addTrack(captureStream, this.audioStream);
    },
    async createRoom() {
      const self = this;
      self.socket.emit("room:create", {}); //- could pass auth here

      self.socket.on("room:join:request", (userInfo) => {
        self.joinRequest = true;
        // console.log(jwt_decode(userInfo)); - we can view the data but not edit it  - this way we can verify the user is valid on our server (uncomment import to use)
        self.initPeer(true, userInfo);
      });

      self.socket.on("room:newID", (data) => {
        self.roomData = {
          roomCode: data.roomCode,
        };
      });
    },
    async initPeer(initiator = true, userInfo = {}) {
      const self = this;
      const audioStream = self.audioStream || (await getAudioInput());
      if (!self.audioStream) self.audioStream = audioStream;
      const peer = new Peer({ initiator, trickle: false, stream: audioStream });
      peer._peerID = userInfo.id;
      if (userInfo.signal) peer.signal(userInfo.signal);
      self.peerListeners(peer, userInfo);
      self.peerConnection = true;
    },
    async joinRoom(roomCode) {
      const self = this;
      self.roomCode = roomCode;
      self.roomData = {
        roomCode: roomCode,
      };

      // self.initPeer(false);

      self.socket.emit("room:join", { roomCode: roomCode });

      // triggers when initially joining a room
      self.socket.on("room:join:request:answer", (roomInfo) => {
        self.initPeer(false, roomInfo); //-room owner
        roomInfo.connectedUsers.forEach(d => {
          self.initPeer(true, {id: d}); // any connected users
        })
      });
    },
    peerListeners(peer, userInfo) {
      const self = this;
      self.peers.push(peer);

      peer.on("error", (err) => {
        console.log("error", err);
      });

      peer.on("data", (data) => {
        console.log(data.toString());
      });

      peer.on("close", (err) => {
        self.peers = self.peers.filter((p) => p._id === peer._id);
        console.log("CLOSE", err);
      });

      peer.on("stream", (stream) => {
        const video = document.getElementById("video2");

        video.srcObject = stream;

        video.play();
      });

      peer.on("track", () => {
        console.log("HIT HERE track");
      });

      peer.on("signal", async (data) => {
        if (data.type === "offer" && self.joinRequest) {
          self.joinRequest = false;
          self.socket.emit("room:join:request:answer", {
            roomCode: self.roomData.roomCode,
            token: userInfo,
            signal: data,
          });
        } else {
          if (data.type === "offer") debugger;
          self.socket.emit("room:stream:create", {
            roomCode: self.roomData.roomCode,
            signal: data,
            token: { id: peer._peerID },
          });
        }
      });

      peer.on("connect", () => {
        peer.send("New peer connected!");
      });
    },
    addStream(stream) {
      this.peers.forEach((peer) => {
        peer.addStream(stream);
      });
    },
    addTrack(audioStream, stream) {
      this.peers.forEach((peer) => {
        audioStream
          .getTracks()
          .forEach((track) => peer.addTrack(track, stream));
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
