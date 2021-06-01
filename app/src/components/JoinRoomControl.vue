<template>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState("peer", ["roomCode", "peers"])
  },
  data() {
    return {
      localRoomCode: ""
    };
  },
  methods: {
    initPeer(initiator, userInfo) {
      this.$store.dispatch("peer/initPeer", { initiator, userInfo });
    },
    joinRoom(roomCode) {
      const self = this;
      const socket = self.$socket;

      this.$store.dispatch("peer/setRoomCode", { roomCode });

      // triggers when initially joining a room
      socket.emit("room:join", { roomCode: roomCode });

      // TODO: Add some error handling in case we can't connect
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
