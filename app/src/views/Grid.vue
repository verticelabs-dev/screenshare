<template>
  <div>
    <!-- Grid Display -->
    <div class="flex flex-row justify-center">
      <ScreenGrid :peers="peers" />
    </div>
  </div>
</template>

<script>
import ScreenGrid from "../components/grid/ScreenGrid";

export default {
  props: ['peers'],
  components: {
    ScreenGrid
  }
};
</script>

<style lang="scss">
@import "../assets/scss/grid.scss";
</style>
