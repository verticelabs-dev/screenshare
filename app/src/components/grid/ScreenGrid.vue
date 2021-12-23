<template>
  <div>
    <!-- Grid View -->
    <div
      class="transition ease-in-out duration-300 screen-grid-container"
      style="max-height: calc(100vh - 86px); overflow-y: auto;"
    >
      <Card
        :hide-close="true"
        @expanded="cardExpand"
        class="screen-grid-item"
        v-for="peer in peers"
        :activeScreenId="activeScreenId"
        :key="peer._peerID"
        :id="peer._peerID"
        :peer="peer"
        :deafen="deafen"
      />
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import { mapState } from "vuex";

export default {
  components: {
    Card,
  },
  computed: {
    ...mapState("peer", ["peers", "deafen", "activeScreenId"]),
  },
  data() {
    return {
    };
  },
  methods: {
    cardClose() {
      this.$store.commit("peer/SET_ACTIVE_SCREEN_ID", false);
    },
    cardExpand(screenId) {
      this.$store.commit("peer/SET_ACTIVE_SCREEN_ID", this.activeScreenId === screenId ? false : screenId);
    },
  },
};
</script>

<style>
/* @import "../../assets/scss/grid/main.scss"; */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
