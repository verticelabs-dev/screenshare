<template>
  <div class="streamControlBar">
    <!-- Mute Button -->
    <div @click="toggleDeafen" class="circle-btn has-tooltip">
      <span v-if="deafen" class='tooltip'>Deafened</span>
      <font-awesome-icon icon="volume-mute" v-if="deafen"/>

      <span v-if="!deafen" class='tooltip'>Deafen</span>
      <font-awesome-icon icon="volume-up" v-if="!deafen"/>
    </div>

    <!-- Mic Button -->
    <div @click="toggleMicMute" class="circle-btn has-tooltip">
      <span v-if="micMute" class='tooltip'>Muted</span>
      <font-awesome-icon icon="microphone-alt-slash" v-if="micMute"/>

      <span v-if="!micMute" class='tooltip'>Mute Mic</span>
      <font-awesome-icon icon="microphone-alt" v-if="!micMute"/>
    </div>

    <!-- Video Button -->
    <div @click="toggleVideo" class="circle-btn has-tooltip ml-4">
      <span v-if="video" class='tooltip'>Video On</span>
      <font-awesome-icon icon="video" v-if="video"/>

      <span v-if="!video" class='tooltip'>Video Off</span>
      <font-awesome-icon icon="video-slash" v-if="!video"/>
    </div>

    <!-- Screen Share Button -->
    <div @click="toggleScreenShare" class="circle-btn has-tooltip">
      <div v-if="screenShare" class='tooltip'>Sharing Screen</div>
      <font-awesome-icon icon="tv" v-if="screenShare" class="green"/>

      <div v-if="!screenShare" class='tooltip'>Screen Share</div>
      <font-awesome-icon icon="tv" v-if="!screenShare"/>
    </div>

    <!-- Record Button -->
    <div @click="toggleRecord" class="circle-btn has-tooltip">
      <span v-if="record" class='tooltip'>Recording</span>
      <font-awesome-icon icon="circle" v-if="record" class="red"/>

      <span v-if="!record" class='tooltip'>Record</span>
      <font-awesome-icon icon="circle" v-if="!record"/>
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

<style></style>
