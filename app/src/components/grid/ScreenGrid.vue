<template>
  <div class="transition ease-in-out duration-300">
    <!-- Grid View -->
    <div class="grid grid-cols-3 gap-4" v-if="!activeScreenId">
      <!-- <GridControlBar /> -->
      <Card
        :hide-close="true"
        @expanded="cardExpand"
        class="screen-grid-item"
        v-for="peer in getScreenPeers"
        :key="peer._peerID"
        :id="peer.id"
        :peer="peer"
      />
    </div>

    <!-- Expanded View -->
    <div class="flex flex-row" v-if="activeScreenId">
      <Card
        :hide-expand="true"
        @closed="cardClose"
        class="screen-grid-item-lg"
        :id="expandedScreen.id"
      />

      <!-- Side Menu -->
      <div class="flex flex-col pl-6">
        <Card
          :hide-close="true"
          @expanded="cardExpand"
          class="screen-grid-item mb-2"
          v-for="peer in getScreenPeers"
          :key="peer.id"
          :id="peer.id"
          :peer="peer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import { mapState } from 'vuex';

export default {
  components: {
    Card,
  },
  computed: {
    ...mapState('peer', ['peers']),
    getScreenPeers() {
      // const _peers = [...[], ...this.peers];
      // _peers.push({
      //   id: 1234,
      //   _peerID: 'You'
      // })

      return this.peers
    },
    expandedScreen() {
      return this.screens.find((s) => s.id == this.activeScreenId);
    },
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
      this.activeScreenId = screemId;
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
