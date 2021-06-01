<template>
  <div class="streamControlBar">
    <!-- Mute Button -->
    <div @click="toggleDeafen" class="circle-btn has-tooltip">
      <span v-if="deafen" class="tooltip">Deafened</span>
      <font-awesome-icon icon="volume-mute" v-if="deafen" />

      <span v-if="!deafen" class="tooltip">Deafen</span>
      <font-awesome-icon icon="volume-up" v-if="!deafen" />
    </div>

    <!-- Mic Button -->
    <div @click="toggleMicMute" class="circle-btn has-tooltip">
      <span v-if="micMute" class="tooltip">Muted</span>
      <font-awesome-icon icon="microphone-alt-slash" v-if="micMute" />

      <span v-if="!micMute" class="tooltip">Mute Mic</span>
      <font-awesome-icon icon="microphone-alt" v-if="!micMute" />
    </div>

    <!-- Video Button -->
    <div @click="toggleVideo" class="circle-btn has-tooltip ml-4">
      <span v-if="video" class="tooltip">Video On</span>
      <font-awesome-icon icon="video" v-if="video" />

      <span v-if="!video" class="tooltip">Video Off</span>
      <font-awesome-icon icon="video-slash" v-if="!video" />
    </div>

    <!-- Screen Share Button -->
    <div @click="toggleScreenShare" class="circle-btn has-tooltip">
      <div v-if="screenShare" class="tooltip">Sharing Screen</div>
      <font-awesome-icon icon="tv" v-if="screenShare" class="green" />

      <div v-if="!screenShare" class="tooltip">Screen Share</div>
      <font-awesome-icon icon="tv" v-if="!screenShare" />
    </div>

    <!-- Record Button -->
    <div @click="toggleRecord" class="circle-btn has-tooltip">
      <span v-if="record" class="tooltip">Recording</span>
      <font-awesome-icon icon="circle" v-if="record" class="red" />

      <span v-if="!record" class="tooltip">Record</span>
      <font-awesome-icon icon="circle" v-if="!record" />
    </div>
  </div>
</template>

<script>
import { getCaptureScreen } from "../../services/StreamCaptureService";

export default {
  components: {},
  data() {
    return {
      deafen: false,
      micMute: false,
      video: false,
      screenShare: false,
      record: false
    };
  },
  methods: {
    toggleDeafen() {
      this.deafen = !this.deafen;
    },
    toggleMicMute() {
      this.micMute = !this.micMute;
    },
    toggleVideo() {
      this.video = !this.video;
    },
    toggleScreenShare() {
      this.screenShare = !this.screenShare;

      if (this.screenShare) {
        this.handleStartStreaming();
      }
    },
    toggleRecord() {
      this.record = !this.record;
    },
    async handleStartStreaming() {
      const captureStream = await getCaptureScreen({
        video: true,
        audio: true
      });

      const video = document.getElementById("You");
      if (video && captureStream) {
        video.srcObject = captureStream;
        video.play();
      }

      this.$store.dispatch("peer/setVideoStream", {
        videoStream: captureStream
      });
    }
  }
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

    & .red {
      color: rgb(208 0 0);
    }

    & .green {
      color: rgb(0 208 0);
    }

    svg {
      @apply h-full;
    }
  }
}
</style>
