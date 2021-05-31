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
      console.log("YEET", await this.$axios.get("/ping"));
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
