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
import { mapState } from 'vuex';

export default {
  props: ["id", "peer", "hideClose", "hideExpand"],
  components: {},
  watch: {
    streamUpdates() {
        const matchingPeerStream = this.streams[this.peer._peerID];
        if(matchingPeerStream) {
          console.log(this.peer._peerID)

          const video = document.getElementById(this.peer._peerID);
          if(video) {
            video.srcObject = matchingPeerStream;
            video.play();
          }
        }
    }
  },
  computed: {
    ...mapState(['streams', 'streamUpdates']),
    getPeerStreams() {
      return this.peer.streams
    }
  },
  mounted() {
    const streams = this.peer.streams

    if(streams) {
      this.renderStream(streams[0])
    }
  },
  data() {
    return {
      renderingStream: false
    };
  },
  methods: {
    renderStream(stream) {
      this.renderStream = true
      const video = document.getElementById(this.peer._peerID);
      if(video && stream) {
        video.srcObject = stream;
        video.play();
      }else{
        console.log('Tried rendering stream', this.peer)
      }
    }
  }
};
</script>

<style></style>
