<template>
  <div>
    <div class="flex flex-row justify-center mt-10">
      <RoomControl
        :join-room="joinRoom"
        :init-peer="initPeer"
        :room-data.sync="roomData"
        :peer-connection.sync="peerConnection"
      />
    </div>

    <div class="flex flex-row justify-center mt-5">
      <button class="btn btn-sm btn-primary" @click="handleStartStreaming">
        Start Streaming
      </button>
    </div>

    <Grid />
  </div>
</template>

<script>
import Peer from "simple-peer";
// import io from "socket.io-client";

import {
  getCaptureScreen,
  displayVideoStream,
  getAudioInput
} from "../services/StreamCaptureService";

import Grid from "./Grid";
import RoomControl from "../components/RoomControl";

export default {
  components: {
    Grid,
    RoomControl
  },
  props: {
    msg: String
  },
  created() {
    // this.socket = io("https://734ed97643b9.ngrok.io/");
  },
  data() {
    return {
      peerConnection: false,
      roomData: {},
      roomCode: "",
      peer: {}
    };
  },
  methods: {
    async handleStartStreaming() {
      const captureStream = await getCaptureScreen({
        video: true,
        audio: true
      });
      const audioStream = await getAudioInput();

      displayVideoStream("video1", captureStream);

      this.addTrack(audioStream, captureStream);
      this.addStream(captureStream);
    },
    async createRoom(data) {
      const self = this;
      self.socket.emit("room:create", data);

      return new Promise(res => {
        self.socket.on("room:newID", data => {
          return res(data);
        });
      });
    },
    async initPeer() {
      const self = this;
      const peer = new Peer({ initiator: true, trickle: false });
      this.peerListeners(peer);
      self.peerConnection = true;

      self.socket.on("room:join:request", userInfo => {
        self.socket.emit("room:join:request:answer", {
          roomCode: self.roomData.roomCode,
          id: userInfo.id,
          signal: self.roomData.signal
        });
      });
    },
    joinRoom(roomCode) {
      this.roomCode = roomCode;

      const self = this;
      const peer = new Peer({ initiator: false, trickle: false });
      this.peerListeners(peer);
      self.peerConnection = true;

      self.roomData = {
        roomCode: roomCode
      };

      console.log("sending ", roomCode);

      self.socket.emit("room:join", { roomCode: roomCode });
    },
    peerListeners(peer) {
      const self = this;
      self.peer = peer;

      peer.on("error", err => {
        console.log("error", err);
      });

      peer.on("data", data => {
        console.log(data.toString());
      });

      peer.on("close", err => {
        console.log("CLOSE", err);
      });

      peer.on("stream", stream => {
        const video = document.getElementById("video2");

        video.srcObject = stream;

        video.play();
      });

      peer.on("track", () => {
        console.log("HIT HERE track");
      });

      peer.on("signal", async data => {
        if (data.type === "offer" && !self.roomData.roomCode) {
          self.roomData = await self.createRoom({
            signal: data
          });
        } else if (data.type === "offer") {
          self.roomData.signal = data;
          self.socket.emit("room:stream:create", {
            roomCode: self.roomData.roomCode,
            signal: data
          });
        } else if (data.type === "answer") {
          self.socket.emit("room:join:answer", {
            signal: data,
            roomCode: self.roomCode
          });
        } else if (data.type === "renegotiate") {
          self.socket.emit("room:stream:create", {
            roomCode: self.roomData.roomCode,
            signal: data
          });
        }
      });

      peer.on("connect", () => {
        peer.send("New peer connected!");
      });

      self.socket.on("room:signal", signal => {
        console.log("got signal");
        peer.signal(signal);
      });
    },
    addStream(stream) {
      this.peer.addStream(stream);
    },
    addTrack(audioStream, stream) {
      const self = this;
      audioStream
        .getTracks()
        .forEach(track => self.peer.addTrack(track, stream));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
