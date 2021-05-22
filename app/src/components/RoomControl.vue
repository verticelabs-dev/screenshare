<template>
  <div class="flex flex-col align-middle" style="max-width: 1200px">
    <!-- Create Room -->
    <div class="flex flex-row">
      <button
        class="btn btn-sm btn-primary pr-4"
        @click="initPeer"
        :disabled="peerConnection"
      >
        Create Room
      </button>
      <div class="room-code-box">
        <span class="text-center align-middle pt-1"
          >Code: {{ roomData.roomCode }}</span
        >
      </div>
    </div>
    <!-- Join Room -->
    <div class="mt-4">
      <input
        placeholder="Enter Room Code"
        class="input"
        type="text"
        v-model="roomCode"
      />
      <button class="btn btn-sm btn-primary" @click="joinRoom(roomCode)">
        Join Room
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["joinRoom", "roomData", "peerConnection", "initPeer"],
  data() {
    return {
      roomCode: ""
    };
  },
  methods: {}
};
</script>

<style></style>
