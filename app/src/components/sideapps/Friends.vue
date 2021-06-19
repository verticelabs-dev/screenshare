<template>
  <div class="flex-grow friends">
    <!-- Title -->
    <h3 class="freinds-list-title">Friends</h3>
    <hr class="freinds-list-title-line" />

    <!-- Search -->
    <input
      type="text"
      placeholder="Search friends"
      class="my-1 mr-2 text-sm text-gray-900 rounded h-8 p-2"
      v-model="search"
    />

    <!-- Friends List -->
    <div class="friends-list">
      <div
        v-for="friend in filteredList"
        :key="friend.friend_id"
        class="friends-list-item"
      >
        <!-- Friend Initals -->
        <div class="freinds-list-icon-container">
          <p class="p-0">
            {{ getInitals(friend.friend_full_name) }}
          </p>
        </div>

        <!-- Friend Info -->
        <div class="freinds-list-info-container">
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
    filteredList() {
      return (this.friends || []).filter((friend) => {
        return friend.friend_full_name
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    getInitals(name) {
      return name
        .split(" ")
        .map(function (item) {
          return item[0];
        })
        .join("");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/sideapps/friends.scss";
</style>
