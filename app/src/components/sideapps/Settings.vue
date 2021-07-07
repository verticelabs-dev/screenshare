<template>
  <div>
    <section>
      <h3 class="freinds-list-title">Settings</h3>
      <hr class="freinds-list-title-line" />
    </section>

    <section>
      <v-select
        v-model="selectedAudioInput"
        :items="audioInputs"
        label="Audio Input"
        item-text="label"
        item-value="deviceId"
      />

      <v-select
        v-model="selectedAudioOutput"
        :items="audioOutputs"
        label="Audio Output"
        item-text="label"
        item-value="deviceId"
      />
    </section>
  </div>
</template>

<script>
import { getDevices } from "../../services/StreamCaptureService";
export default {
  components: {},
  data() {
    return {
      selectedAudioInput: "default",
      selectedAudioOutput: "default",
      audioInputs: [],
      audioOutputs: [],
      videoinputs: [],
    };
  },
  mounted() {
    getDevices().then(({ audioinput, audiooutput, videoinput }) => {
      this.audioInputs = audioinput;
      this.audioOutputs = audiooutput;
      this.videoinputs = videoinput;

      this.selectedAudioInput = localStorage.getItem("audioInput");
      this.selectedAudioOutput = localStorage.getItem("audioOutput");
    });
  },
  watch: {
    selectedAudioInput(deviceId, oldDeviceId) {
      localStorage.setItem("audioInput", deviceId);

      const device = this.audioInputs.find(
        (device) => device.deviceId === deviceId
      );

      const oldDevice = this.audioInputs.find(
        (device) => device.deviceId === oldDeviceId
      );

      this.$store.dispatch("peer/changeAudioInput", { device, oldDevice });
    },
    selectedAudioOutput(deviceId, oldDeviceId) {
      localStorage.setItem("audioOutput", deviceId);

      const device = this.audioOutputs.find(
        (device) => device.deviceId === deviceId
      );
      const oldDevice = this.audioOutputs.find(
        (device) => device.deviceId === oldDeviceId
      );

      console.log("output device: ", device, oldDevice);
      // TODO - make output changeable
    },
  },
};
</script>

<style scoped lang="scss"></style>
