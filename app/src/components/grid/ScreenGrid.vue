<template>
  <div class="grid grid-cols-2 gap-4">
    <Card class="screen-grid-item" v-for="screen in screens" :key="screen.id" />
  </div>
</template>

<script>
import Card from "./Card";

const screens = [
  {
    id: 2,
    username: "Bobby Hargen"
  }
];

export default {
  components: {
    Card
  },
  data() {
    return {
      screens
    };
  }
};
</script>

<style></style>
