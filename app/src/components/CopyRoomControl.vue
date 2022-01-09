<template>
  <div class="copy-room-container flex flex-row justify-center">
    <div
      class="room-code-box flex flex-row align-middle items-center"
      :class="{
        'border-gray-400': !showGreenBorder,
        'border-green-400': showGreenBorder,
      }"
    >
      <span class="text-center ml-3 mr-3">Code: {{ roomCode }}</span>
      <!-- Hidden input for copying text from -->
      <input type="hidden" id="roomCode" :value="copyLink" />
    </div>
    <button
      class="btn btn-primary copy-btn ml-2"
      @click="copyRoomCode"
      :disabled="!roomCode"
    >
      {{ copyButtonText }}
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("peer", ["roomCode", "peers"]),
    copyButtonText() {
      return this.showGreenBorder ? "Copied!" : "Copy";
    },
    copyLink() {
      return `${window.location.origin}/join/${this.roomCode}`;
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
