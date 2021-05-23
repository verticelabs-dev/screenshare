<template>
  <div style="width: 600px">
    <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
      <li
        class="mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer"
        v-for="tab in tabs"
        :key="tab.name"
      >
        <a
          class="
            text-xs
            font-bold
            uppercase
            px-5
            py-3
            shadow-lg
            rounded
            block
            leading-normal
          "
          v-on:click="toggleTab(tab)"
          v-bind:class="{
            'text-blue-600 bg-white': !isSelectedTab(tab.name),
            'text-white bg-blue-600': isSelectedTab(tab.name)
          }"
        >
          {{ tab.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
const tabs = [
  {
    name: "Users"
  },
  {
    name: "Screens"
  }
];

export default {
  components: {},
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
      selectedTab: "Users"
    };
  },
  methods: {
    toggleTab(tab) {
      this.selectedTab = tab.name;
    }
  }
};
</script>

<style></style>
