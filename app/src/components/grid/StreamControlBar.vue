<template>
  <div class="streamControlBar">
    <!-- Mute Button -->
    <div @click="toggleDeafen" class="circle-btn has-tooltip">
      <span v-if="deafen" class="tooltip bottom">Deafened</span>
      <font-awesome-icon icon="volume-mute" v-if="deafen" />

      <span v-if="!deafen" class="tooltip bottom">Deafen</span>
      <font-awesome-icon icon="volume-up" v-if="!deafen" />
    </div>

    <!-- Mic Button -->
    <div @click="toggleMicMute" class="circle-btn has-tooltip">
      <span v-if="micMute" class="tooltip bottom">Muted</span>
      <font-awesome-icon icon="microphone-alt-slash" v-if="micMute" />

      <span v-if="!micMute" class="tooltip bottom">Mute Mic</span>
      <font-awesome-icon icon="microphone-alt" v-if="!micMute" />
    </div>

    <!-- Video Button -->
    <div @click="toggleVideo" class="circle-btn has-tooltip ml-4">
      <span v-if="video" class="tooltip bottom">Video On</span>
      <font-awesome-icon icon="video" v-if="video" />

      <span v-if="!video" class="tooltip bottom">Video Off</span>
      <font-awesome-icon icon="video-slash" v-if="!video" />
    </div>

    <!-- Screen Share Button -->
    <div @click="toggleScreenShare" class="circle-btn has-tooltip">
      <div v-if="screenShare" class="tooltip bottom">Sharing Screen</div>
      <font-awesome-icon icon="tv" v-if="screenShare" class="green" />

      <div v-if="!screenShare" class="tooltip bottom">Screen Share</div>
      <font-awesome-icon icon="tv" v-if="!screenShare" />
    </div>

    <!-- Record Button -->
    <div @click="toggleRecord" class="circle-btn has-tooltip">
      <span v-if="record" class="tooltip bottom">Recording</span>
      <font-awesome-icon icon="circle" v-if="record" class="red" />

      <span v-if="!record" class="tooltip bottom">Record</span>
      <font-awesome-icon icon="circle" v-if="!record" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getCaptureScreen, getWebcam, displayVideoStream, stopVideoStream } from "../../services/StreamCaptureService";

export default {
  components: {},
  data() {
    return {
      deafen: false,
      micMute: false,
      video: false,
      screenShare: false,
      record: false,
    };
  },
  computed: {
    ...mapState("peer", ["audioStream", "videoStream"]),
    stream() {
      return this.videoStream || this.audioStream;
    },
  },
  methods: {
    toggleDeafen() {
      this.deafen = !this.deafen;

      this.$store.dispatch("peer/deafenPeers", {
        deafen: this.deafen,
      });
    },
    toggleMicMute() {
      const audioTrack = this.stream.getAudioTracks();

      if (audioTrack.length > 0) {
        this.micMute = !this.micMute;
        audioTrack[0].enabled = !this.micMute;
      }
    },
    async toggleVideo() {
      if (this.video === true) {
        this.video = false;
        stopVideoStream(this.stream);

        return false;
      }

      try {
        this.video = true;

        const webcamStream = await getWebcam({
          video: true
        });

        displayVideoStream("You", webcamStream);
        this.$store.dispatch("peer/setVideoStream", {
          videoStream: webcamStream,
        });

        this.video = true;
      } catch (error) {
        this.video = false;
        console.error(error);
      }
    },
    toggleRecord() {
      this.record = !this.record;
    },
    async toggleScreenShare() {
      try {
        const captureStream = await getCaptureScreen({
          video: true,
          audio: true,
        });

        displayVideoStream("You", captureStream);
        this.$store.dispatch("peer/setVideoStream", {
          videoStream: captureStream,
        });

        this.screenShare = true;
      } catch (error) {
        this.screenShare = false;
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
.streamControlBar {
  height: 3.5rem;
  display: flex;

  @apply items-center;

  .circle-btn {
    @apply rounded-full shadow-lg cursor-pointer justify-center h-10 w-10;
    position: relative;
    display: flex;
    background-color: rgba(255, 255, 255, 0.45);

    &:not(:nth-child(0)) {
      @apply mr-2;
    }

    & svg.red {
      // this is clashing with vuetify css
      background-color: initial !important;
      color: rgb(208 0 0);
    }

    & svg.green {
      // this is clashing with vuetify css
      background-color: initial !important;
      color: rgb(0 208 0);
    }

    svg {
      @apply h-full;
    }
  }
}
</style>
