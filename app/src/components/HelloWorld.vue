<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      <button @click="initPeer" :disabled="peerConnection">Create Room</button>
      <span>
        {{ roomData.roomCode }}
      </span>
    </p>
    <p>
      <input type="text" v-model="roomCode" />
      <button @click="joinRoom" >
        Join Room
      </button>
    </p>
  </div>
</template>

<script>
import io from "socket.io-client";
import Peer from "simple-peer";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  created() {
    this.socket = io("http://localhost:8989");
  },
  data() {
    return {
      peerConnection: false,
      roomData: {},
      roomCode: "",
    };
  },
  methods: {
    async createRoom(data) {
      const self = this;
      self.socket.emit("room:create", data);

      return new Promise((res) => {
        self.socket.on("room:newID", (data) => {
          return res(data);
        });
      });
    },
    async initPeer() {
      const self = this;
      const peer = new Peer({ initiator: true, trickle: false });
      self.peerConnection = true;

      peer.on("error", (err) => {
        console.log("error", err);
      });

      peer.on("signal", async (data) => {
        console.log('hit asdasfdsa', data)
        self.roomData = await self.createRoom({
          signal: data,
        });

        console.log(this.roomData);
      });

      peer.on("connect", () => {
        console.log("CONNECTED A NEW PEER????");
        peer.send("New peer connected!");
      });

      peer.on("data", (data) => {
        self.log.push(data.toString());
      });
      // return peer;
    },
    joinRoom() {
      const self = this;
      const peer = new Peer({ initiator: false, trickle: false });
      self.peerConnection = true;

      self.socket.emit("room:join", { roomCode: self.roomCode });

      self.socket.on('room:signal', (signal) => {
        peer.signal(signal)
        console.log('we made it? ', signal)
      })

      peer.on("error", (err) => {
        console.log("error", err);
      });

      // peer.on("signal", async (data) => {
      // self.roomData = await self.createRoom({
      //   signal: data,
      // });

      // console.log(this.roomData);
      // });

      peer.on("connect", () => {
        console.log("CONNECTED A NEW PEER????");
        peer.send("New peer connected!");
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
