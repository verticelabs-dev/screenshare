<template>
  <div class="flex flex-row" style="height: 100vh">
    <Sidebar />

    <div class="w-full">
      <router-view />

      <StreamControlBar />
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import StreamControlBar from "./components/grid/StreamControlBar";

export default {
  components: {
    Sidebar,
    StreamControlBar
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
