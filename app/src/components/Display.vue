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
    this.socket = io("localhost:8989");
    this.socket.on("error", (err) => {
      console.error(err);
    });
  },
  data() {
    return {
      peerConnection: false,
      roomData: {},
      roomCode: "",
      peer: {},
      joinRequest: false,
      renegotiate: false,
      audioStream: undefined,
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
      this.addStream(captureStream);
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
      self.peerListeners(peer, userInfo);
      self.peerConnection = true;
    },
    async joinRoom(roomCode) {
      const self = this;
      self.roomCode = roomCode;
      self.roomData = {
        roomCode: roomCode,
      };

      self.initPeer(false);

      self.socket.emit("room:join", { roomCode: roomCode });
    },
    peerListeners(peer, userInfo) {
      const self = this;
      self.peer = peer;

      peer.on("error", (err) => {
        console.log("error", err);
      });

      peer.on("data", (data) => {
        console.log(data.toString());
      });

      peer.on("close", (err) => {
        console.log("CLOSE", err);
      });

      peer.on("stream", (stream) => {
        console.log(stream);
        const video = document.getElementById("video2");

        video.srcObject = stream;

        video.play();
      });

      peer.on("track", () => {
        console.log("HIT HERE track");
      });

      peer.on("signal", async (data) => {
        if (data.type === "offer" && self.joinRequest) {
          console.log("HIT HERE OFFER 1");
          self.joinRequest = false;
          self.socket.emit("room:join:request:answer", {
            roomCode: self.roomData.roomCode,
            token: userInfo,
            signal: data,
          });
        } else if (data.type === "offer") {
          console.log("HIT HERE OFFER 2");
          // self.roomData.signal = data;
          self.socket.emit("room:stream:create", {
            roomCode: self.roomData.roomCode,
            signal: data,
          });
        } else if (data.type === "answer") {
          self.socket.emit("room:join:answer", {
            signal: data,
            roomCode: self.roomCode,
          });
        } else if (data.type === "renegotiate") {
          self.socket.emit("room:stream:create", {
            roomCode: self.roomData.roomCode,
            signal: data,
          });
        }
      });

      peer.on("connect", () => {
        peer.send("New peer connected!");
      });

      self.socket.on("room:signal", (signal) => {


        peer.signal(signal);
        if (signal.type === "renegotiate") self.renegotiate = true;
        if (signal.type === "answer" && self.renegotiate) {
          self.renegotiate = false;
          peer.streams.forEach((stream) => {
            self.addTrack(stream);
          });
        }
      });
    },
    addStream(stream) {
      this.peer.addStream(stream);
    },
    addTrack(audioStream, stream) {
      const self = this;
      audioStream
        .getTracks()
        .forEach((track) => self.peer.addTrack(track, stream));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
