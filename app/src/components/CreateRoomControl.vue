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
    ...mapState("peer", ["roomCode", "peers"])
  },
  data() {
    return {};
  },
  methods: {
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
    },
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

      this.$route.push("/");
    }
  }
};
</script>

<style></style>
