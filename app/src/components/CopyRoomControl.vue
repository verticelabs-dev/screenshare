<template>
  <div class="flex flex-row">
    <div class="room-code-box">
      <span class="text-center align-middle pt-1">Code: {{ roomCode }}</span>
      <input type="hidden" id="roomCode" :value="roomCode" />
    </div>
    <button
      class="btn btn-sm btn-primary ml-1"
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
    return {};
  },
  methods: {
    copyRoomCode() {
      let copyRoomCode = document.querySelector("#roomCode");
      copyRoomCode.setAttribute("type", "text");
      copyRoomCode.select();

      try {
        document.execCommand("copy");
        console.log("Copied room code");
      } catch (err) {
        console.error("Failed to copy room code");
      }

      copyRoomCode.setAttribute("type", "hidden");
      window.getSelection().removeAllRanges();
    }
  }
};
</script>

<style></style>
