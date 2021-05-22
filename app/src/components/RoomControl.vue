<template>
  <div class="flex flex-col align-middle" style="max-width: 900px">
    <!-- Create Room -->
    <div>
      <button
        class="btn btn-sm btn-primary pr-4"
        @click="initPeer"
        :disabled="peerConnection"
      >
        Create Room
      </button>
      <span> Code: {{ roomData.roomCode }} </span>
    </div>
    <!-- Join Room -->
    <div class="mt-4">
      <input
        placeholder="Enter Room Code"
        class="input"
        type="text"
        v-model="roomCode"
      />
      <button class="btn btn-sm btn-primary" @click="joinRoom">
        Join Room
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      roomData: {},
      roomCode: ""
    };
  }
};
</script>

<style></style>
