<template>
  <div
    class="card border"
    :class="{
      'screen-grid-item-lg': peer._peerID === activeScreenId,
      [borderByAudioLevel]: true
    }"
  >
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
        <div @click="toggleMute" class="circle-btn">
          <font-awesome-icon icon="volume-mute" v-if="muted" />
          <font-awesome-icon icon="volume-up" v-else />
        </div>
      </div>
    </div>

    <div class="card-video" v-if="false">
      <video :id="peer._peerID" :muted="muted ? 'muted' : ''"></video>
    </div>
    <div class="flex items-center align-middle justify-center h-full" v-else>
      <h1>You</h1>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import { getAudioLevels } from "../../services/SoundMeter";
// import { getAudioInput } from "../../services/StreamCaptureService";

export default {
  props: ["id", "peer", "hideClose", "hideExpand", "activeScreenId"],
  components: {},
  watch: {},
  computed: {
    borderByAudioLevel() {
      if (this.audioLevel == 0.0) {
        return "border-secondary";
      }

      if (this.audioLevel >= 0.02) {
        return "border-green-500";
      }

      return "border-secondary";
    }
  },
  async mounted() {
    const self = this;

    if (!self.peer || self.peer._peerID === "You") {
      return;
    }

    self.peer.on("stream", stream => {
      self.renderStream(stream);
    });

    // const stream = self.peer.streams[0];
    // self.peer.on("track", track => {
    // console.log('HIT', track)
    // if (track.kind === "video" && stream) {
    //   self.renderStream(stream);
    // }
    //});
  },
  data() {
    return {
      audioLevel: 0,
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
        console.log("Tried rendering stream", video, stream, this.peer);
      }
    },
    toggleMute() {
      this.muted = !this.muted;
    }
  }
};
</script>

<style>
.card {
}
</style>
