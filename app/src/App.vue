<template>
  <v-app dark>
    <div class="flex flex-row" style="height: 100vh" v-if="user">
      <TopToast />

      <transition name="slide-fade">
        <Sidebar v-if="canShowSideBar && (roomCode || user.id)" />
      </transition>

      <div class="w-full">
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import TopToast from "./components/TopToast.vue";
import { mapState } from "vuex";

export default {
  components: {
    Sidebar,
    TopToast,
  },
  computed: {
    canShowSideBar() {
      return this.$route.meta.sidebar;
    },
    ...mapState("user", ["user"]),
    ...mapState("peer", ["roomCode"]),
  },
  async beforeMount() {
    try {
      // If user already has a session it will send back the user info
      // or if they don't have a session it will return guest account
      const result = await this.$axios.post("/login", {});
      this.$store.dispatch("user/setUser", result.data);
    } catch (error) {
      console.error("No user set!");
      // if it fails assume that the API is down
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
