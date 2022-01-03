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
        <span
          v-if="peer._peerID !== 'You'"
          @click="toggleMute"
          class="circle-btn"
        >
          <font-awesome-icon icon="volume-mute" v-if="muted" />
          <font-awesome-icon icon="volume-up" v-else />
        </span>
      </div>
    </div>

    <div class="card-video">
      <!--- Video Input Stream -->
      <video
        :id="peer._peerID"
        :ref="peer._peerID"
        :muted="muted ? 'muted' : ''"
        :style="{display: peer._peerID === 'You' ? 'none' : ''}"
      ></video>

      <!--- Video Output Stream -->
      <video
        v-if="peer._peerID === 'You'"
        :id="peer._peerID + '-output'"
        :ref="peer._peerID + '-output'"
        :muted="muted ? 'muted' : ''"
      ></video>

      <!--- Video Effect Stream -->
      <canvas
        v-if="peer._peerID === 'You'"
        :id="peer._peerID + '-canvas'"
        :ref="peer._peerID + '-canvas'"
        width="1920"
        height="1080"
        :style="{display: 'none'}"
      ></canvas>
      <!-- If we don't set the width and height on the canvas it will become blurry -->
      <!-- Consider using 1080 as max resolution and make it a setting to go to "HD Mode" -->
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

    this.muted = self.deafen;

    self.peer.on("stream", (stream) => {
      self.renderStream(stream);
    });
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
