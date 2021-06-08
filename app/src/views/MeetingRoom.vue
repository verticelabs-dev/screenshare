<template>
  <div>
    <div class="flex flex-row items-center ml-4">
      <CopyRoomControl />
      <StreamControlBar class="ml-6" />
    </div>

    <!-- Render out the Grid -->
    <div class="mt-4 ml-4">
      <ScreenGrid />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import ScreenGrid from "../components/grid/ScreenGrid";
import CopyRoomControl from "../components/CopyRoomControl";
import StreamControlBar from "../components/grid/StreamControlBar";

export default {
  beforeRouteEnter(_to, _from, next) {
    next(vm => {
      const roomCode = vm.$store.state.peer.roomCode;

      if (!roomCode) {
        return next("/join");
      }

      return next();
    });
  },
  components: {
    ScreenGrid,
    CopyRoomControl,
    StreamControlBar
  },
  computed: {
    ...mapState("peer", ["peers", "roomCode"]),
    ...mapGetters(["peer/userInMeeting"])
  }
};
</script>

<style scoped lang="scss"></style>
