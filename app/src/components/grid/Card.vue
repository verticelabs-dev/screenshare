<template>
  <div class="card">
    <div class="card-header">
      <div class="text-white mb-1 mt-1 ml-4">{{ peer._peerID }}</div>

      <!-- Top Right Control Buttons -->
      <div>
        <!-- Close Button -->
        <div
          v-if="!hideClose"
          @click="$emit('closed', id)"
          class="red-circle-btn"
        ></div>

        <!-- Expand Button -->
        <div
          v-if="!hideExpand"
          @click="$emit('expanded', id)"
          class="green-circle-btn"
        ></div>

        <!-- Mute Button -->
        <div
          @click="toggleMute"
          class="circle-btn"
        >
          <font-awesome-icon icon="volume-mute" v-if="muted"/>
          <font-awesome-icon icon="volume-up" v-else/>
        </div>
      </div>
    </div>

    <div class="card-video">
      <video :id="peer._peerID" :muted="muted ? 'muted': ''"></video>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";

export default {
  props: ["id", "peer", "hideClose", "hideExpand"],
  components: {},
  watch: {},
  computed: {},
  mounted() {
    const self = this;

    if (!self.peer || self.peer._peerID === "You") return

    const stream = self.peer.streams[0];

    self.peer.on("stream", (stream) => {
      self.renderStream(stream);
    });

    self.peer.on("track", (track) => {
      if (track.kind === "video" && stream) {
        self.renderStream(stream);
      }
    });

    if (stream) {
      self.renderStream(stream);
    }
  },
  data() {
    return {
      renderingStream: false,
      muted: false
    };
  },
  methods: {
    renderStream(stream) {
      const video = document.getElementById(this.peer._peerID);
      if (video && stream) {
        video.srcObject = stream;
        video.play();
      } else {
        console.log("Tried rendering stream", video , stream, this.peer);
      }
    },
    toggleMute() {
      this.muted = !this.muted
    }
  },
};
</script>

<style></style>
