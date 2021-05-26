<template>
  <div class="flex flex-col align-middle" style="max-width: 1200px">
    <!-- Create Room -->
    <div class="flex flex-row">
      <button
        class="btn btn-sm btn-primary pr-4"
        @click="createRoom"
        :disabled="peerConnection || roomData.roomCode"
      >
        Create Room
      </button>
      <div class="room-code-box">
        <span class="text-center align-middle pt-1"
          >Code: {{ roomData.roomCode }}</span
        >
        <input type="hidden" id="roomCode" :value="roomData.roomCode">
      </div>
      <button class="btn btn-sm btn-primary ml-1" @click="copyRoomCode" :disabled="!roomData.roomCode">
        Copy
      </button>

    </div>
    <!-- Join Room -->
    <div class="mt-4">
      <input
        placeholder="Enter Room Code"
        class="input"
        type="text"
        v-model="roomCode"
      />
      <button class="btn btn-sm btn-primary" @click="joinRoom(roomCode)" :disabled="peerConnection || roomData.roomCode">
        Join Room
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["joinRoom", "roomData", "peerConnection", "createRoom"],
  data() {
    return {
      roomCode: "",
    };
  },
  methods: {
    copyRoomCode() {
      let copyRoomCode = document.querySelector("#roomCode");
      copyRoomCode.setAttribute('type', 'text')
      copyRoomCode.select();

      try {
        document.execCommand("copy");
        console.log('Copied room code')

      } catch (err) {
        console.error('Failed to copy room code')
      }

      copyRoomCode.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges();
    },
  },
};
</script>

<style></style>
