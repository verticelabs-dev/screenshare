<template>
  <div>
    <p>
      <button @click="initPeer" :disabled="peerConnection">Create Room</button>
      <span>
        {{ roomData.roomCode }}
      </span>
    </p>
    <p>
      <input type="text" v-model="roomCode" />
      <button @click="joinRoom">Join Room</button>
    </p>

    <div>
      <button @click="handleStartStreaming">Start Streaming</button>
    </div>

    <div class="video-container">
      <video id="video1"></video>
      <video id="video2"></video>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import Peer from "simple-peer";
import {
  getCaptureScreen,
  displayVideoStream
} from "../services/StreamCaptureService";

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  created() {
    this.socket = io("http://localhost:8989");
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
      const captureStream = await getCaptureScreen();

      displayVideoStream("video1", captureStream);

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
    async initPeer(stream) {
      const self = this;
      const peer = new Peer({ initiator: true, trickle: false, stream });
      this.peerListeners(peer);
      self.peerConnection = true;

      self.socket.on("room:signal", signal => {
        peer.signal(signal);
      });
    },
    joinRoom() {
      const self = this;
      const peer = new Peer({ initiator: false, trickle: false });
      this.peerListeners(peer);
      self.peerConnection = true;

      self.socket.emit("room:join", { roomCode: self.roomCode });

      self.socket.on("room:signal", signal => {
        peer.signal(signal);
      });
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
        console.log("we got a stream!");
        const video = document.getElementById("video2");

        video.srcObject = stream;

        video.play();
      });

      peer.on("signal", async data => {
        if (data.type === "offer") {
          self.roomData = await self.createRoom({
            signal: data
          });
        } else if (data.type === "answer") {
          self.socket.emit("room:join:answer", {
            signal: data,
            roomCode: self.roomCode
          });
        }
      });

      peer.on("connect", () => {
        console.log("CONNECTED A NEW PEER????");
        peer.send("New peer connected!");
      });
    },
    addStream(stream) {
      this.initPeer(stream)
      // console.log()
      // this.peer._pc.addStream(stream);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.video-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 500px;
  height: 500px;

  video {
    width: 250px;
    height: 250px;
  }
}
</style>
