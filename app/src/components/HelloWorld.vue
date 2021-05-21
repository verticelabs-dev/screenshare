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
      peer: {}
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
      this.peerListeners(peer);
      self.peerConnection = true;

      self.socket.on('room:signal', (signal) => {
        peer.signal(signal)
      })
    },
    joinRoom() {
      const self = this;
      const peer = new Peer({ initiator: false, trickle: false });
      this.peerListeners(peer);
      self.peerConnection = true;

      self.socket.emit("room:join", { roomCode: self.roomCode });

      self.socket.on('room:signal', (signal) => {
        peer.signal(signal)
      })
    },
    peerListeners(peer) {
      const self = this;
      self.peer = peer

      peer.on("error", (err) => {
        console.log("error", err);
      });

      peer.on("data", (data) => {
        console.log(data.toString())
      });

      peer.on('close', (err) => {
        console.log('CLOSE', err)
      })

      peer.on("signal", async (data) => {
        if (data.type === "offer") {
          self.roomData = await self.createRoom({
            signal: data,
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
      this.peer.addStream(stream);
    }
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
