<template>
  <div class="flex flex-row ml-4">
    <button
      class="btn btn-lg btn-primary pr-4"
      @click="createRoom"
      :disabled="roomCode"
    >
      Create Room
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("peer", ["roomCode", "peers"]),
  },
  methods: {
    createRoom() {
      const self = this;
      const socket = self.$socket;

      // Get room info
      socket.once("room:newID", () => {
        this.$router.push("/");
      });

      //- Triggers socket room to start - could pass auth here
      socket.emit("room:create", {});
    },
  },
};
</script>

<style></style>
