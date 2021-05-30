<template>
  <div class="flex flex-row">
    <Sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  components: {
    Sidebar
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
