<template>
  <div
    v-show="!activeScreenId || peer._peerID === activeScreenId"
    :class="{
      card: true,
      'screen-grid-item-lg': peer._peerID === activeScreenId,
    }"
  >
    <div class="card-header pl-2 pr-2">
      <span class="card-header-title">
        {{ getStreamName }}
      </span>

      <!-- Top Right Control Buttons -->
      <div class="card-header-buttons">
        <!-- Expand Button -->
        <span
          v-if="!hideExpand"
          @click="$emit('expanded', id)"
          class="green-circle-btn"
        ></span>

        <!-- Mute Button -->
        <span @click="toggleMute" class="circle-btn">
          <font-awesome-icon icon="volume-mute" v-if="muted" />
          <font-awesome-icon icon="volume-up" v-else />
        </span>
      </div>
    </div>

    <div class="card-video">
      <video :id="peer._peerID" :muted="muted ? 'muted' : ''"></video>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
// import { getAudioLevels } from "../../services/SoundMeter";
// import { getAudioInput } from "../../services/StreamCaptureService";

export default {
  props: ["id", "peer", "hideExpand", "activeScreenId", "deafen"],
  components: {},
  watch: {
    peer: {
      handler: function (peer) {
        this.streamName =
          peer._user && peer._user.full_name
            ? peer._user.full_name
            : peer._peerID;
      },
      deep: true,
    },
    deafen(val) {
      this.muted = val;
    },
  },
  computed: {
    getStreamName() {
      return this.streamName || this.peer._peerID;
    },
  },
  mounted() {
    const self = this;

    if (!self.peer || self.peer._peerID === "You") return;

    self.peer.on("stream", (stream) => {
      self.renderStream(stream);
    });

    // const stream = self.peer.streams[0];
    // self.peer.on("track", (track) => {
    // console.log('HIT', track)
    // if (track.kind === "video" && stream) {
    //   self.renderStream(stream);
    // }
    // });
  },
  data() {
    return {
      audioLevel: 0,
      renderingStream: false,
      muted: false,
      streamName: "",
    };
  },
  methods: {
    renderStream(stream) {
      const video = document.getElementById(this.peer._peerID);
      if (video && stream) {
        video.srcObject = stream;
        video.play();
      } else {
        console.error("Failed to render stream");
      }
    },
    toggleMute() {
      this.muted = !this.muted;
    },
  },
};
</script>

<style>
.card {
}
</style>
