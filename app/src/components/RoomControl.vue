<template>
  <div class="flex flex-row align-middle items-center">
    <!-- Join Room -->
    <div>
      <input
        placeholder="Enter Room Code"
        class="input"
        type="text"
        v-model="localRoomCode"
        @keyup.enter="joinRoom(localRoomCode)"
      />
      <button
        class="btn btn-sm btn-primary"
        @click="joinRoom(localRoomCode)"
        :disabled="roomCode"
      >
        Join Room
      </button>
    </div>

    <!-- Create Room -->
    <div class="flex flex-row ml-4">
      <button
        class="btn btn-sm btn-primary pr-4"
        @click="createRoom"
        :disabled="roomCode"
      >
        Create Room
      </button>
      <div class="room-code-box">
        <span class="text-center align-middle pt-1">Code: {{ roomCode }}</span>
        <input type="hidden" id="roomCode" :value="roomCode" />
      </div>
      <button
        class="btn btn-sm btn-primary ml-1"
        @click="copyRoomCode"
        :disabled="!roomCode"
      >
        Copy
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  props: [],
  computed: {
    ...mapState("peer", ["roomCode", "peers"])
  },
  data() {
    return {
      localRoomCode: ""
    };
  },
  methods: {
    createRoom() {
      const self = this;
      const socket = self.$socket;

      // Get room info
      socket.once("room:newID", roomInfo => {
        self.$store.dispatch("peer/setRoomCode", {
          roomCode: roomInfo.roomCode
        });
      });

      //- Triggers socket room to start - could pass auth here
      socket.emit("room:create", {});

      // Another user is trying to join the room - auto accept
      socket.on("room:join:request", userInfo => {
        userInfo.joinRequest = true;
        self.initPeer(true, userInfo);
      });
    },
    joinRoom(roomCode) {
      const self = this;
      const socket = self.$socket;

      this.$store.dispatch("peer/setRoomCode", { roomCode });

      // you have been accepted into the room so start connecting to all the users
      socket.on("room:join:request:answer", roomInfo => {
        self.initPeer(false, roomInfo); //-room owner
        roomInfo.connectedUsers.forEach(d => {
          self.initPeer(true, { id: d }); // any connected users
        });
      });

      // triggers when initially joining a room
      socket.emit("room:join", { roomCode: roomCode });
    },
    initPeer(initiator, userInfo) {
      this.$store.dispatch("peer/initPeer", { initiator, userInfo });
    },
    copyRoomCode() {
      let copyRoomCode = document.querySelector("#roomCode");
      copyRoomCode.setAttribute("type", "text");
      copyRoomCode.select();

      try {
        document.execCommand("copy");
        console.log("Copied room code");
      } catch (err) {
        console.error("Failed to copy room code");
      }

      copyRoomCode.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style></style>
