<template>
  <div class="flex flex-col justify-center items-center content-center mt-10">
    <div class="text-3xl">Welcome to Screen Share</div>
    <div class="text-lg mb-6">Create or Join a room to get started</div>

    <JoinRoomControl />
    <div class="text-2xl my-6">OR</div>
    <CreateRoomControl />
    <div class="text-2xl my-6">OR</div>

    <button class="mt-4 btn btn-lg btn-primary" @click="showUser = true">
      Login
    </button>

    <LoginDialog
      v-if="showUser"
      v-on:close="showUser = false"
      @loggedIn="userLoggedIn"
    />
  </div>
</template>

<script>
import JoinRoomControl from "../components/JoinRoomControl";
import CreateRoomControl from "../components/CreateRoomControl";
import LoginDialog from "../components/LoginDialog";

export default {
  beforeRouteEnter(_to, _from, next) {
    next((vm) => {
      const roomCode = vm.$store.state.peer.roomCode;
      const user = vm.$store.state.user.user;

      if (roomCode || user.id) {
        return next("/");
      }

      return next();
    });
  },
  components: {
    JoinRoomControl,
    CreateRoomControl,
    LoginDialog,
  },
  data() {
    return {
      showUser: false,
    };
  },
  methods: {
    userLoggedIn(loggedIn) {
      if (loggedIn) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
