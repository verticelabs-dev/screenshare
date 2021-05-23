<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      class="grid-item screen-grid-item text-center"
      v-for="screen in screens"
      :key="screen.id"
    >
      <h1>{{ screen.username }} is sharing their screen</h1>
    </div>
  </div>
</template>

<script>
const screens = [
  {
    id: 2,
    username: "Bobby Hargen"
  }
];

export default {
  components: {},
  data() {
    return {
      screens
    };
  }
};
</script>

<style></style>
