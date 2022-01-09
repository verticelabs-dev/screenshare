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
    ...mapState("peer", ["roomCode", "peers"]),
  },
  data() {
    return {
      localRoomCode: "",
    };
  },
  methods: {
    joinRoom(roomCode) {
      this.$store.dispatch("peer/setRoomCode", { roomCode });

      // TODO: Add some error handling in case we can't connect
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
