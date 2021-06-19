<template>
  <div class="flex-grow">
    <h3 class="font-normal px-2 py-3">Friends</h3>
    <input
      type="text"
      placeholder="Search friends"
      class="my-1 mr-2 text-sm text-gray-900 rounded h-8 p-2"
    />
    <div class="w-full">
      <div
        v-for="friend in friends"
        :key="friend.friend_id"
        class="flex cursor-pointer justify-center items-end py-0.5"
      >
        <div class="mr-1 text-center freinds-list-icon-container">
          <p class="p-0">
            {{
              friend.friend_full_name
                .split(" ")
                .map(function (item) {
                  return item[0];
                })
                .join("")
            }}
          </p>
        </div>
        <div
          class="w-4/5 h-10 py-3 px-1"
          style="border-bottom: 1px #636378 solid"
        >
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
      this.$store.dispatch("user/setFriends", []);
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

<style scoped lang="scss">
@import "../../assets/scss/sideapps/friends.scss";
</style>
