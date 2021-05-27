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
      </div>
    </div>

    <div class="card-video">
      <video :id="peer._peerID"></video>
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
    const stream = self.peer.streams[0];

    if (self.peer._peerID !== "You") {
      self.peer.on("stream", (stream) => {
        console.log(1)
        self.renderStream(stream);
      });

      self.peer.on("track", (track) => {
        if (track.kind === "video" && stream) {
          console.log(2)
          self.renderStream(stream);
        }
      });
    }

    if (stream) {
      // self.renderStream(stream);
    }
  },
  data() {
    return {
      renderingStream: false,
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
  },
};
</script>

<style></style>
