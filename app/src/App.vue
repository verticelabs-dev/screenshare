<template>
  <v-app dark>
    <div class="flex flex-row" style="height: 100vh">
      <TopToast />

      <div class="w-full">
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
// import Sidebar from "./components/Sidebar";
import TopToast from "./components/TopToast.vue";
import { mapState } from "vuex";

export default {
  components: {
    TopToast,
  },
  computed: {
    canShowSideBar() {
      return this.$route.meta.sidebar;
    },
    ...mapState("peer", ["roomCode"]),
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
