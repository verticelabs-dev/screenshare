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
            <font-awesome-icon
              class="text-green-500 sidebar-wave-icon"
              icon="circle"
            />
            <svg class="sidebar-wave-content">
              <path
                d="M 95 0 C 80 0 64 32 40 32 S 0 0 -15 0 z"
                stroke="#636378"
                fill="#636378"
                transform="rotate(-10 100 -80) scale(1 0.9)"
              />
            </svg>
            <!-- <div class="sidebar-wave-content">
              
            </div> -->
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
