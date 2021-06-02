<template>
  <div class="flex flex-row" style="height: 100vh">
    <Sidebar />

    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
// import StreamControlBar from "./components/grid/streamControlBar";

export default {
  components: {
    Sidebar,
    // StreamControlBar
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
  },
};
</script>

<style lang="scss"></style>
