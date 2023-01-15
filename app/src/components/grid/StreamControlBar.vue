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

    <!-- Video Effects Button -->
    <div @click="toggleVideoEffect" class="circle-btn has-tooltip">
      <span class="tooltip bottom">Video Effects</span>
      <font-awesome-icon icon="magic" :class="{ green: videoEffect }" />
    </div>

    <!-- Screen Share Button -->
    <div @click="toggleScreenShare" class="circle-btn has-tooltip ml-4">
      <div v-if="screenShare" class="tooltip bottom">Sharing Screen</div>
      <font-awesome-icon icon="tv" v-if="screenShare" class="green" />

      <div v-if="!screenShare" class="tooltip bottom">Screen Share</div>
      <font-awesome-icon icon="tv" v-if="!screenShare" />
    </div>

    <!-- Record Button -->
    <div @click="toggleSettings" class="circle-btn has-tooltip">
      <span class="tooltip bottom">Settings</span>
      <font-awesome-icon icon="cogs" />
    </div>

    <SettingsDialog v-if="settings" v-on:close="settings = false" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  getCaptureScreen,
  getWebcam,
  displayVideoStream,
  stopVideoStream,
} from "../../services/StreamCaptureService";
import { blurVideo } from "../../services/VideoBackground";
import SettingsDialog from "../SettingsDialog";

export default {
  components: {
    SettingsDialog,
  },
  data() {
    return {
      deafen: false,
      micMute: false,
      video: false,
      screenShare: false,
      settings: false,
      videoEffect: false,
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
      if (!this.stream) {
        return;
      }

      this.deafen = !this.deafen;

      this.$store.dispatch("peer/deafenPeers", {
        deafen: this.deafen,
      });
    },
    toggleMicMute() {
      if (!this.audioStream) {
        return;
      }

      const audioTrack = this.audioStream.getAudioTracks();
      if (audioTrack.length === 0) {
        console.error("Did not find an audio track");
        return;
      }

      this.micMute = !this.micMute;
      audioTrack[0].enabled = !this.micMute;
    },
    async toggleVideo() {
      if (this.video) {
        this.video = false;
        this.$store.dispatch("peer/removeVideoStream");
        stopVideoStream(this.videoStream);

        return false;
      }

      try {
        const webcamStream = await getWebcam({
          video: true,
        });

        // since you can only send one stream at a time you must stop one before starting the other
        if (this.screenShare) {
          this.screenShare = false;
          this.$store.dispatch("peer/removeVideoStream");
          stopVideoStream(this.videoStream);
        }

        // original video input before effects are added
        displayVideoStream("You", webcamStream);

        // video display with effects
        displayVideoStream("You-output", webcamStream);

        this.video = true;

        this.$store.dispatch("peer/setVideoStream", {
          videoStream: webcamStream,
        });

        if (this.videoEffect) {
          await this.toggleVideoEffect(undefined, true);
        }
      } catch (error) {
        this.video = false;
        console.error(error);
      }
    },

    async toggleVideoEffect(event, force = false) {
      if (this.videoEffect && !force) {
        this.videoEffect = false;

        if (this.video) {
          const webcamStream = await getWebcam({
            video: true,
          });

          displayVideoStream("You", webcamStream);
          displayVideoStream("You-output", webcamStream);

          this.$store.dispatch("peer/setVideoStream", {
            videoStream: webcamStream,
          });
        }

        return;
      }
      this.videoEffect = true;

      // Video isn't active yet so we will handle the blur when it becomes active
      if (!this.video) {
        return false;
      }

      const videoElement = document.getElementById("You");
      const canvasElement = document.getElementById("You-canvas");

      blurVideo(videoElement, canvasElement);

      // We can cap the frame rate by passing in an integer value
      const canvasStream = canvasElement.captureStream();

      displayVideoStream("You-output", canvasStream);
      this.$store.dispatch("peer/setVideoStream", {
        videoStream: canvasStream,
      });
    },
    toggleSettings() {
      this.settings = !this.settings;
    },
    async toggleScreenShare() {
      try {
        const captureStream = await getCaptureScreen({
          video: true,
          audio: true,
        });

        // since you can only send one stream at a time you must stop one before starting the other
        if (this.video) {
          this.video = false;
          this.$store.dispatch("peer/removeVideoStream");
          stopVideoStream(this.videoStream);
        }

        displayVideoStream("You-output", captureStream);
        this.$store.dispatch("peer/setVideoStream", {
          videoStream: captureStream,
        });

        // Listen for screen sharing to stop
        captureStream.getVideoTracks()[0].onended = () => {
          this.$store.dispatch("peer/removeVideoStream");
          stopVideoStream(this.videoStream);
          this.screenShare = false;
        };

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
