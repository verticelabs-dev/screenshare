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
        return next("/join");
      }

      return next();
    });
  },
  components: {
    GridContainer,
    CopyRoomControl
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
