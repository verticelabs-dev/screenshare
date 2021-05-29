<template>
  <div>
    <div class="flex flex-row justify-center mt-5">
      <RoomControl />
    </div>

    <div class="flex flex-row justify-center mt-5">
      <button class="btn btn-sm btn-primary" @click="handleStartStreaming">
        Start Streaming
      </button>
    </div>

    <!-- Render out the Grid -->
    <template>
      <Grid />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { getCaptureScreen } from "../services/StreamCaptureService";

import Grid from "./Grid";
import RoomControl from "../components/RoomControl";

export default {
  components: {
    Grid,
    RoomControl,
  },
  props: {},
  created() {
    const self = this;
    const socket = self.$socket;

    socket.on("token", (token) => {
      this.token = token;
    });

    socket.on("error", (err) => {
      console.error(err);
    });

    // A peer is sending a singal ( We may or may not know about them already )
    socket.on("room:signal", (signalData) => {
      const matchingPeer = self.peers.find((d) => d._peerID === signalData.id);

      if (matchingPeer) {
        matchingPeer.signal(signalData.signal);
      } else {
        self.initPeer(false, { id: signalData.id, signal: signalData.signal });
      }
    });
  },
  computed: {
    ...mapState('peer', ['peers']),
    ...mapState(['roomCode'])
  },
  data() {
    return {
      token: "",
    };
  },
  methods: {
    initPeer(initiator, userInfo) {
      this.$store.dispatch("peer/initPeer", { initiator, userInfo });
    },
    async handleStartStreaming() {
      const captureStream = await getCaptureScreen({
        video: true,
        audio: true,
      });

      const video = document.getElementById("You");
      if (video && captureStream) {
        video.srcObject = captureStream;
        video.play();
      }

      this.$store.dispatch("peer/setVideoStream", { videoStream: captureStream });

      this.addStream(captureStream);
    },
    addStream(stream) {
      this.peers.forEach((peer) => {
        if (peer._peerID !== "You")
          peer.addStream(stream);
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
