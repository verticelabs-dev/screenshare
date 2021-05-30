<template>
  <div class="streamControlBar">
    <!-- Mute Button -->
    <div @click="toggleDeafen" class="circle-btn has-tooltip">
      <span v-if="deafen" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Deafened</span>
      <font-awesome-icon icon="volume-mute" v-if="deafen"/>
      <span v-if="!deafen" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Deafen</span>
      <font-awesome-icon icon="volume-up" v-if="!deafen"/>
    </div>

    <!-- Mic Button -->
    <div @click="toggleMicMute" class="circle-btn has-tooltip">
      <span v-if="micMute" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Muted</span>
      <font-awesome-icon icon="microphone-alt-slash" v-if="micMute"/>
      <span v-if="!micMute" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Mute Mic</span>
      <font-awesome-icon icon="microphone-alt" v-if="!micMute"/>
    </div>

    <!-- Video Button -->
    <div @click="toggleVideo" class="circle-btn has-tooltip" style="margin-left: 1rem;">
      <span v-if="video" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Video On</span>
      <font-awesome-icon icon="video" v-if="video"/>

      <span v-if="!video" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Video Off</span>
      <font-awesome-icon icon="video-slash" v-if="!video"/>
    </div>

    <!-- Screen Share Button -->
    <div @click="toggleScreenShare" class="circle-btn has-tooltip">
      <div v-if="screenShare" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Sharing Screen</div>
      <font-awesome-icon icon="tv" v-if="screenShare" style="color: rgb(0 208 0);"/>

      <div v-if="!screenShare" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Screen Share</div>
      <font-awesome-icon icon="tv" v-if="!screenShare"/>
    </div>

    <!-- Record Button -->
    <div @click="toggleRecord" class="circle-btn has-tooltip">
      <span v-if="record" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Recording</span>
      <font-awesome-icon icon="circle" v-if="record" style="color: rgb(208 0 0);"/>

      <span v-if="!record" class='tooltip rounded shadow-lg p-1 bg-gray-100 text-black -mt-8'>Record</span>
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

<style>

</style>
