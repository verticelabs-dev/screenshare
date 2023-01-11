<template>
  <div class="flex flex-col justify-center items-center content-center mt-10">
    <div class="text-3xl">Welcome to Screen Share</div>
    <div class="text-lg mb-6">Create or Join a room to get started</div>

    <JoinRoomControl />
    <div class="text-2xl my-6">OR</div>
    <CreateRoomControl />
  </div>
</template>

<script>
import JoinRoomControl from "../components/JoinRoomControl";
import CreateRoomControl from "../components/CreateRoomControl";

export default {
  beforeRouteEnter(_to, _from, next) {
    next((vm) => {
      const roomCode = vm.$store.state.peer.roomCode;

      if (roomCode) {
        return next("/");
      }

      return next();
    });
  },
  components: {
    JoinRoomControl,
    CreateRoomControl,
  },
};
</script>

<style></style>
