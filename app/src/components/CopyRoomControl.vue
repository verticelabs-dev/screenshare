<template>
  <div class="flex flex-row justify-center">
    <div
      class="room-code-box flex flex-row align-middle items-center"
      :class="{
        'border-gray-400': !showGreenBorder,
        'border-green-400': showGreenBorder
      }"
    >
      <span class="text-center ml-3 mr-3">Code: {{ roomCode }}</span>
      <!-- Hidden input for copying text from -->
      <input type="hidden" id="roomCode" :value="roomCode" />
    </div>
    <button
      class="btn copy-btn btn-primary ml-1"
      @click="copyRoomCode"
      :disabled="!roomCode"
    >
      Copy
    </button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("peer", ["roomCode", "peers"])
  },
  data() {
    return {
      showGreenBorder: false
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
      this.toggleGreenBorder();

      let copyRoomCode = document.querySelector("#roomCode");
      copyRoomCode.setAttribute("type", "text");
      copyRoomCode.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Failed to copy room code");
      }

      copyRoomCode.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style>
.room-code-box {
  max-width: 330px;
  @apply rounded border-2 border-dashed;
}

.copy-btn {
  @apply font-bold text-xs;
  @apply px-5 py-3 mr-1;
}
</style>
