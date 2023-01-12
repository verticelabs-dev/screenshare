<template>
  <div class="copy-room-container flex flex-row justify-center">
    <button class="btn btn-primary copy-btn ml-2 text-md w-40" @click="copyRoomCode" :disabled="!roomCode">
      <font-awesome-icon class="mr-1" icon="link" /> {{ copyButtonText }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("peer", ["roomCode", "peers"]),
    copyButtonText() {
      return this.showGreenBorder ? "Copied Link!" : "Copy Room Link";
    },
    copyLink() {
      return `${window.location.origin}/${this.roomCode}`;
    },
  },
  data() {
    return {
      showGreenBorder: false,
    };
  },
  methods: {
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

.copy-btn {
  @apply font-bold text-xs;
  @apply px-5 py-3 mr-1;
}
</style>
