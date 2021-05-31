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
    createRoom() {
      const self = this;
      const socket = self.$socket;

      // Get room info
      socket.once("room:newID", roomInfo => {
        self.$store.dispatch("peer/setRoomCode", {
          roomCode: roomInfo.roomCode
        });

        this.$router.push("/");
      });

      //- Triggers socket room to start - could pass auth here
      socket.emit("room:create", {});

      // Another user is trying to join the room - auto accept
      socket.on("room:join:request", userInfo => {
        userInfo.joinRequest = true;
        self.initPeer(true, userInfo);
      });

      socket.on("token", token => {
        this.token = token;
      });

      socket.on("error", err => {
        console.error(err);
      });

      // A peer is sending a singal ( We may or may not know about them already )
      socket.on("room:signal", signalData => {
        const matchingPeer = self.peers.find(d => d._peerID === signalData.id);

        if (matchingPeer) {
          matchingPeer.signal(signalData.signal);
        } else {
          self.initPeer(false, {
            id: signalData.id,
            signal: signalData.signal
          });
        }
      });
    }
  }
};
</script>

<style></style>
