<template>
  <div class="flex flex-row" style="height: 100vh">
    <transition name="slide-fade">
      <Sidebar v-if="canShowSideBar" />
    </transition>

    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  components: {
    Sidebar
  },
  computed: {
    canShowSideBar() {
      return this.$route.meta.sidebar;
    }
  },
  async mounted() {
    try {
      // If user already has a session it will send back the user info
      // or if they don't have a session it will return guest account
      const result = await this.$axios.post("/login", {});
      this.$store.dispatch("user/setUser", result.data);
    } catch (error) {
      // if it fails assume that the API is down
    }
  },
  data() {
    return {};
  }
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
