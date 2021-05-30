<template>
  <div class="streamControlBar">
    <!-- Mute Button -->
    <div @click="toggleDeafen" class="circle-btn">
      <font-awesome-icon icon="volume-mute" v-if="deafen"/>
      <font-awesome-icon icon="volume-up" v-else/>
    </div>

    <!-- Mic Button -->
    <div @click="toggleMicMute" class="circle-btn">
      <font-awesome-icon icon="microphone-alt-slash" v-if="micMute"/>
      <font-awesome-icon icon="microphone-alt" v-else/>
    </div>

    <!-- Video Button -->
    <div @click="toggleVideo" class="circle-btn">
      <font-awesome-icon icon="video-slash" v-if="video"/>
      <font-awesome-icon icon="video" v-else/>
    </div>

    <!-- Screen Share Button -->
    <div @click="toggleScreenShare" class="circle-btn">
      <font-awesome-icon icon="tv" v-if="screenShare" style="color: rgb(0 208 0);"/>
      <font-awesome-icon icon="tv" v-else/>
    </div>

    <!-- Record Button -->
    <div @click="toggleRecord" class="circle-btn">
      <font-awesome-icon icon="circle" v-if="record" style="color: rgb(208 0 0);"/>
      <font-awesome-icon icon="circle" v-else/>
    </div>

  </div>
</template>

<script>
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
      this.deafen = !this.deafen
    },
    toggleMicMute() {
      this.micMute = !this.micMute
    },
    toggleVideo() {
      this.video = !this.video
    },
    toggleScreenShare() {
      this.screenShare = !this.screenShare
    },
    toggleRecord() {
      this.record = !this.record
    }
  }
};
</script>

<style>

</style>
