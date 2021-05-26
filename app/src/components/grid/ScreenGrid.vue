<template>
  <div class="transition ease-in-out duration-300">
    <!-- Grid View -->
    <div
      class="grid grid-flow-row auto-rows-max md:auto-rows-min"
      v-if="!activeScreenId"
    >
      <GridControlBar />
      <Card
        :hide-close="true"
        @expanded="cardExpand"
        class="screen-grid-item"
        v-for="screen in screens"
        :key="screen.id"
        :id="screen.id"
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
          v-for="screen in screens"
          :key="screen.id"
          :id="screen.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./Card";
import GridControlBar from "./GridControlBar";

const screens = [
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
  components: {
    Card,
    GridControlBar
  },
  computed: {
    expandedScreen() {
      return this.screens.find(s => s.id == this.activeScreenId);
    }
  },
  data() {
    return {
      activeScreenId: false,
      screens
    };
  },
  methods: {
    cardClose() {
      this.activeScreenId = false;
    },
    cardExpand(screemId) {
      this.activeScreenId = screemId;
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
