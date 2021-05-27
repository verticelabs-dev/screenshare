<template>
  <div>
    <!-- Grid Display -->
    <div class="flex flex-row justify-center">
      <ScreenGrid />
    </div>
  </div>
</template>

<script>
import ScreenGrid from "../components/grid/ScreenGrid";

export default {
  props: [],
  components: {
    ScreenGrid
  }
};
</script>

<style lang="scss">
@import "../assets/scss/grid.scss";
</style>
