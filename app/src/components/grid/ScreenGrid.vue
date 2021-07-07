<template>
  <div class="flex flex-row justify-start">
    <div
      class="transition ease-in-out duration-300 mr-6"
      style="height: calc(100vh - 196px); flex-basis: 100%"
    >
      <!-- Grid View -->
      <div class="grid grid-cols-3 gap-8">
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
          :outputDeviceID="outputDeviceID"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import { mapState } from "vuex";

export default {
  components: {
    Card
  },
  computed: {
    ...mapState("peer", ["peers", "deafen", "outputDeviceID"]),
  },
  data() {
    return {
      activeScreenId: false
    };
  },
  methods: {
    cardClose() {
      this.activeScreenId = false;
    },
    cardExpand(screemId) {
      this.activeScreenId = this.activeScreenId === screemId ? false : screemId;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
