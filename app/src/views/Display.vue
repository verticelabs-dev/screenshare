<template>
  <div>
    <div class="flex flex-row mt-5 ml-4">
      <RoomControl />
    </div>

    <!-- Render out the Grid -->
    <div class="mt-4 ml-4">
      <Grid />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import Grid from "./Grid";
import RoomControl from "../components/RoomControl";

export default {
  components: {
    Grid,
    RoomControl
  },
  props: {},
  created() {
    const self = this;
    const socket = self.$socket;

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
        self.initPeer(false, { id: signalData.id, signal: signalData.signal });
      }
    });
  },
  computed: {
    ...mapState("peer", ["peers"]),
    ...mapState(["roomCode"])
  },
  data() {
    return {
      token: ""
    };
  },
  methods: {
    initPeer(initiator, userInfo) {
      this.$store.dispatch("peer/initPeer", { initiator, userInfo });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
