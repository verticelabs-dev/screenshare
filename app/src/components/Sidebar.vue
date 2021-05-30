<template>
  <div class="flex">
    <div class="sidebar flex flex-row">
      <!-- Icon List -->
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
        <!-- Icon Item -->
        <div class="" v-for="icon in sidebarIcons" :key="icon.name">
          <font-awesome-icon
            :icon="icon.name"
            class="sidebar-icon"
            :class="{ active: isActiveIcon(icon.name) }"
            @click="setActiveIcon(icon.name)"
          />
          <div v-if="isActiveIcon(icon.name)" class="sidebar-wave">
            <div class="sidebar-wave-content">
              <font-awesome-icon
                class="text-green-500 sidebar-wave-icon"
                icon="circle"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar App -->
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
