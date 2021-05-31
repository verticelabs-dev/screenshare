<template>
  <div>
    <div class="flex mt-5 ml-4">
      <CopyRoomControl />
    </div>

    <!-- Render out the Grid -->
    <div class="mt-4 ml-4">
      <GridContainer />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import CopyRoomControl from "../components/CopyRoomControl";
import GridContainer from "../components/grid/GridContainer";

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const roomCode = vm.$store.state.peer.roomCode;

      if (!roomCode) {
        console.log("trig");
        return next("/join");
      }

      return next();
    });
  },
  components: {
    GridContainer,
    CopyRoomControl
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
    ...mapState("peer", ["peers", "roomCode"]),
    ...mapGetters(["peer/userInMeeting"])
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

<style scoped lang="scss"></style>
