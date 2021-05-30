<template>
  <div class="flex">
    <div class="sidebar flex flex-row">
      <div
        class="
          sidebar-icons
          flex flex-col
          justify-start
          content-center
          px-4
          pt-4
        "
      >
        <font-awesome-icon
          v-for="icon in sidebarIcons"
          :icon="icon.name"
          class="sidebar-icon"
          :class="{ active: isActiveIcon(icon.name) }"
          :key="icon.name"
          @click="setActiveIcon(icon.name)"
        />
      </div>

      <div class="sidebar-content float-right">
        <MeetingAgenda />
      </div>
    </div>
  </div>
</template>

<script>
import MeetingAgenda from "./sideapps/MeetingAgenda";

const sidebarIcons = [
  {
    name: "home"
  },
  {
    name: "calendar"
  },
  {
    name: "video"
  },
  {
    name: "user-friends"
  },
  {
    name: "cogs"
  },
  {
    name: "question-circle"
  }
];

export default {
  components: {
    MeetingAgenda
  },
  data() {
    return {
      sidebarIcons,
      activeIconName: "video"
    };
  },
  methods: {
    isActiveIcon(iconName) {
      return this.activeIconName === iconName;
    },
    setActiveIcon(iconName) {
      this.activeIconName = iconName;
    }
  }
};
</script>

<style></style>
