<template>
  <div class="flex">
    <div class="sidebar flex flex-row">
      <!-- Icon List -->
      <div
        class="
          sidebar-icon-container
          flex flex-col
          justify-start
          content-center
          px-4
          pt-4
        "
      >
        <!-- Icon Item -->
        <div v-for="icon in sidebarIcons" :key="icon.name">
          <font-awesome-icon
            :icon="icon.name"
            class="sidebar-icon"
            :class="{ active: isActiveIcon(icon.name) }"
            @click="setActiveIcon(icon.name)"
          />

          <!-- Sidarbar Wave on active icons -->
          <div v-if="isActiveIcon(icon.name)" class="sidebar-wave">
            <!-- Green Button next to wave -->
            <font-awesome-icon
              class="text-green-500 sidebar-wave-icon"
              icon="circle"
            />

            <!-- Wave Shape -->
            <svg class="sidebar-wave-svg">
              <path
                d="M 12 0 C 7.5 0 8 4 5 4 S 2.5 0 -2 0 z"
                stroke="#636378"
                fill="#636378"
                transform="rotate(-10 100 -80) scale(6)"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Sidebar App -->
      <div class="sidebar-content float-right" v-if="canShowSideapp">
        <MeetingAgenda />
      </div>
    </div>
    <Modal v-if="showUser" v-on:close="showUser = false" />
  </div>
</template>

<script>
import MeetingAgenda from "./sideapps/MeetingAgenda";
import Modal from "./modal";

const sidebarIcons = [
  {
    name: "user-circle",
  },
  {
    name: "home",
  },
  {
    name: "calendar",
  },
  {
    name: "video",
  },
  {
    name: "user-friends",
  },
  {
    name: "cogs",
  },
  {
    name: "question-circle",
  },
];

export default {
  components: {
    MeetingAgenda,
    Modal,
  },
  computed: {
    canShowSideapp() {
      return this.$route.meta.sideapp;
    },
  },
  data() {
    return {
      sidebarIcons,
      activeIconName: "video",
      showUser: false,
    };
  },
  methods: {
    isActiveIcon(iconName) {
      return this.activeIconName === iconName;
    },
    setActiveIcon(iconName) {
      if (iconName === "user-circle") {
        this.showUser = true;
        return;
      }

      this.activeIconName = iconName;
    },
  },
};
</script>

<style></style>
