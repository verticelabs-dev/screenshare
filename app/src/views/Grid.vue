<template>
  <div>
    <div class="flex flex-row justify-center">
      <GridControlBar :selectedTab.sync="selectedTab" />
    </div>

    <!-- Grid Display -->
    <div class="flex flex-row justify-center">
      <UserGrid v-if="selectedTab === 'users'" />
      <ScreenGrid v-if="selectedTab === 'screens'" />
    </div>
  </div>
</template>

<script>
import UserGrid from "../components/grid/UserGrid";
import ScreenGrid from "../components/grid/ScreenGrid";
import GridControlBar from "../components/grid/GridControlBar";

export default {
  components: {
    UserGrid,
    ScreenGrid,
    GridControlBar
  },
  data() {
    return {
      selectedTab: "users"
    };
  },
  watch: {
    selectedTab() {
      console.log(this.selectedTab);
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/grid.scss";
</style>
