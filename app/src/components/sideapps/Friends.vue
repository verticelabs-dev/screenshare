<template>
  <div class="flex-grow">
    <h3 class="font-normal px-2 py-3 leading-tight">Friends</h3>
    <input
      type="text"
      placeholder="Search friends"
      class="my-1 mr-2 text-sm text-gray-900 rounded h-8 p-2 focus:outline-none"
    />
    <div class="w-full">
      <div
        v-for="friend in friends"
        :key="friend.friend_id"
        class="flex cursor-pointer my-1 hover:bg-blue-lightest rounded"
      >
        <div class="w-8 h-10 text-center py-1">
          <p class="text-3xl p-0 text-green-500">&bull;</p>
        </div>
        <div class="w-4/5 h-10 py-3 px-1">
          <p>{{ friend.friend_full_name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  async mounted() {
    try {
      const results = await this.$axios.get("/user/friends");

      this.$store.dispatch("user/setFriends", results.data);
    } catch (err) {
      console.error(err);
    }
  },
  computed: {
    ...mapState("user", ["friends"]),
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
