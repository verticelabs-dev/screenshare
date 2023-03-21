<template>
  <div>
    <div>
      <div class="flex flex-row items-center ml-4">
        <RoomControlBar />
        <StreamControlBar class="ml-6" />
      </div>

      <!-- Render out the Grid -->
      <div class="mt-4 ml-4 mr-4">
        <ScreenGrid />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import ScreenGrid from "../components/grid/ScreenGrid";
import RoomControlBar from "../components/RoomControlBar";
import StreamControlBar from "../components/grid/StreamControlBar";

export default {
  beforeRouteEnter(_to, _from, next) {
    // console.log("ROOM ID: ", _to.params.roomCode);
    next((vm) => {
      const roomCode = vm.$store.state.peer.roomCode;

      if (_to.params.roomCode) {
        // todo verify roomcode exists
        vm.$store.dispatch("peer/setRoomCode", {
          roomCode: _to.params.roomCode,
        });

        history.pushState({}, null, "/room");
      }

      if (!roomCode && !_to.params.roomCode) {
        return next("/");
      }

      return next();
    });
  },
  components: {
    ScreenGrid,
    RoomControlBar,
    StreamControlBar,
  },
  computed: {
    ...mapState("peer", ["peers", "roomCode"]),
    ...mapGetters(["peer/userInMeeting"]),
  },
};
</script>

<style scoped lang="scss">

</style>
