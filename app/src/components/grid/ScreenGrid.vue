<template>
  <div class="transition ease-in-out duration-300">
    <!-- Grid View -->

    <div class="grid grid-cols-2 gap-4" v-if="!activeScreenId">
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
    <div class="flex" v-if="activeScreenId">
      <Card
        :hide-expand="true"
        @closed="cardClose"
        class="screen-grid-item-lg"
        :id="expandedScreen.id"
      />
    </div>
  </div>
</template>

<script>
import Card from "./Card";

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
    Card
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
