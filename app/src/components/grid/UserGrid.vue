<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      class="
        grid-item
        user-grid-item
        text-center
        flex flex-column
        justify-center
        items-center
      "
      v-for="user in users"
      :key="user.id"
    >
      <div class="">
        <h1>{{ user.username }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
const users = [
  {
    id: 1,
    username: "Dan Hargen"
  },
  {
    id: 2,
    username: "Bobby Hargen"
  }
];

export default {
  components: {},
  data() {
    return {
      users
    };
  }
};
</script>

<style></style>
