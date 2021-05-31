<template>
  <div>
    <!-- Grid Display -->
    <div class="flex flex-row justify-center">
      <ScreenGrid />
    </div>
  </div>
</template>

<script>
import ScreenGrid from "./ScreenGrid";

export default {
  props: [],
  components: {
    ScreenGrid
  }
};
</script>

<style lang="scss">
// @import "../../../assets/scss/grid/main.scss";
@import "../../assets/scss/grid/main.scss";
</style>
