<template>
  <div>
    <div v-if="roomCode">
      <div class="flex flex-row items-center ml-4">
        <CopyRoomControl />
        <StreamControlBar class="ml-6" />
      </div>

      <!-- Render out the Grid -->
      <div class="mt-4 ml-4 mr-4">
        <ScreenGrid />
      </div>
    </div>
    <div
      v-else
      class="flex flex-col justify-center items-center content-center mt-10"
    >
      <div class="text-lg mb-6">Create or Join a room</div>

      <JoinRoomControl />
      <div class="text-2xl my-6">OR</div>
      <CreateRoomControl />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

import ScreenGrid from "../components/grid/ScreenGrid";
import CopyRoomControl from "../components/CopyRoomControl";
import StreamControlBar from "../components/grid/StreamControlBar";
import JoinRoomControl from "../components/JoinRoomControl";
import CreateRoomControl from "../components/CreateRoomControl";

export default {
  beforeRouteEnter(_to, _from, next) {
    next((vm) => {
      const roomCode = vm.$store.state.peer.roomCode;
      const user = vm.$store.state.user.user;

      if (!roomCode && !user.id) {
        return next("/join");
      }

      return next();
    });
  },
  components: {
    ScreenGrid,
    CopyRoomControl,
    StreamControlBar,
    JoinRoomControl,
    CreateRoomControl,
  },
  computed: {
    ...mapState("peer", ["peers", "roomCode"]),
    ...mapGetters(["peer/userInMeeting"]),
  },
};
</script>

<style scoped lang="scss"></style>
