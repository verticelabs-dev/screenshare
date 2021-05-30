<template>
  <div class="transition ease-in-out duration-300" style="height: calc(100vh - 196px);">
    <!-- Grid View -->
    <div class="grid grid-cols-3 gap-4">

      <Card
        :hide-close="true"
        @expanded="cardExpand"
        class="screen-grid-item"
        v-for="peer in peers"
        :activeScreenId="activeScreenId"
        :key="peer._peerID"
        :id="peer._peerID"
        :peer="peer"
      />
    </div>
    <streamControlBar />
  </div>
</template>

<script>
import Card from "./Card";
import streamControlBar from "./streamControlBar";
import { mapState } from 'vuex';

export default {
  components: {
    Card,
    streamControlBar
  },
  computed: {
    ...mapState('peer', ['peers'])
  },
  data() {
    return {
      activeScreenId: false,
    };
  },
  methods: {
    cardClose() {
      this.activeScreenId = false;
    },
    cardExpand(screemId) {
      this.activeScreenId = this.activeScreenId === screemId ? false : screemId;
    },
  },
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
