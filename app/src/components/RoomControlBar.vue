<template>
  <div class="copy-room-container flex flex-row justify-center">
    <button class="btn btn-primary text-sm control-btn" @click="copyRoomCode" :disabled="!roomCode">
      <font-awesome-icon class="mr-1" icon="link" /> {{ copyButtonText }}
    </button>

    <button class="btn btn-primary text-sm control-btn" @click="showProfileDialog = !showProfileDialog">
      <font-awesome-icon class="mr-1" icon="user" />Profile
    </button>

    <ProfileDialog :confirm="handleNameConfirm" v-if="showProfileDialog" v-on:close="showProfileDialog = false">
    </ProfileDialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProfileDialog from "./ProfileDialog.vue";

export default {
  computed: {
    ...mapState("peer", ["roomCode", "peers"]),
    copyButtonText() {
      return this.showGreenBorder ? "Copied Link!" : "Copy Link";
    },
    copyLink() {
      return `${window.location.origin}/${this.roomCode}`;
    },
  },
  data() {
    return {
      showProfileDialog: false,
      showGreenBorder: false,
    };
  },
  methods: {
    handleNameConfirm() {

    },
    toggleGreenBorder() {
      this.showGreenBorder = true;
      setTimeout(() => {
        this.showGreenBorder = false;
      }, 1000);
    },
    copyRoomCode() {
      try {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(this.copyLink);
        } else {
          const copyRoomCode = document.querySelector("#roomCode");
          copyRoomCode.setAttribute("type", "text");
          copyRoomCode.select();
          document.execCommand("copy");
          copyRoomCode.setAttribute("type", "hidden");
          window.getSelection().removeAllRanges();
        }
      } catch (err) {
        console.error("Failed to copy room code");
      }
      this.toggleGreenBorder();
    },
  },
  components: { ProfileDialog },
};
</script>

<style lang="scss">
.copy-room-container {
  @apply h-10;
}

.room-code-box {
  max-width: 330px;
  @apply rounded border-2 border-dashed;
}

.control-btn {
  @apply font-bold;
  @apply px-5 py-3 mr-1;
  @apply ml-2 w-40;
}
</style>
