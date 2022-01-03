<template>
  <div>
    <h1 class="text-blue-500 font-bold">Team</h1>
    <h1 class="font-bold">Meetings</h1>

    <h1 class="mt-6 font-bold">Design Review</h1>
    <h3 class="text-gray-500">2:30pm - 3:30pm</h3>

    <h1 class="mt-6 font-bold">Agenda</h1>

    <ul class="mt-2 agenda-list">
      <li>
        <font-awesome-icon icon="check-circle" class="mr-2 text-green-500" />
        <span>Introduction</span>
      </li>
      <li>
        <font-awesome-icon icon="check-circle" class="mr-2 text-green-500" />
        <span>Demo</span>
      </li>

      <li>
        <font-awesome-icon icon="check-circle" class="mr-2 text-green-500" />
        <span>Team Feedback</span>
      </li>

      <li>
        <font-awesome-icon icon="check-circle" class="mr-2 text-gray-500" />
        <span>Next Steps</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>

<style>
.agenda-list > li {
  @apply mt-1;
}
</style>
