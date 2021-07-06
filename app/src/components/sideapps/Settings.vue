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
    selectedAudioInput(newVal, Oldval) {
      localStorage.setItem("audioInput", newVal);
      console.log(newVal, Oldval);
    },
    selectedAudioOutput(newVal, Oldval) {
      localStorage.setItem("audioOutput", newVal);
      console.log(newVal, Oldval);
    },
  },
};
</script>

<style scoped lang="scss"></style>
