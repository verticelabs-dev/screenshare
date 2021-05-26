<template>
  <div class="grid-control-bar flex flex-col">
    <button class="btn btn-sm btn-primary" @click="handleStartStreaming">
      Start Streaming
    </button>
  </div>
</template>

<script>
import { capitalize } from "../../utils/string";

const tabs = [
  {
    name: "users"
  },
  {
    name: "screens"
  }
];

export default {
  props: {
    defaultTab: {
      default: "users",
      type: String,
      required: false
    }
  },
  computed: {
    isSelectedTab() {
      return tabName => {
        return this.selectedTab === tabName;
      };
    }
  },
  data() {
    return {
      tabs,
      selectedTab: this.defaultTab
    };
  },
  methods: {
    capitalize,
    toggleTab(tab) {
      this.selectedTab = tab.name;

      console.log("emit");

      this.$emit("update:selectedTab", tab.name);
    }
  }
};
</script>

<style>
.grid-control-bar {
  position: absolute;
}
</style>
