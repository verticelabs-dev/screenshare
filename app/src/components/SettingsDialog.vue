<template>
  <Modal v-on:close="close" size="medium">
    <template v-slot:header>
      <h3 class="friends-list-title">Settings</h3>
      <hr class="friends-list-title-line" />
    </template>
    <template v-slot:body>
      <div>
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
  </Modal>
</template>

<script>
import { getDevices } from "../services/StreamCaptureService";
import Modal from "./modal";

export default {
  components: {
    Modal,
  },
  created() {
    document.body.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  },
  beforeDestroy() {
    document.body.removeEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  },
  mounted() {
    getDevices().then(({ audioinput, audiooutput, videoinput }) => {
      this.audioInputs = audioinput;
      this.audioOutputs = audiooutput;
      this.videoinputs = videoinput;

      const localSelectedAudioInput = localStorage.getItem("audioInput");
      if (localSelectedAudioInput) {
        this.selectedAudioInput = localSelectedAudioInput;
      }

      const localSelectedAudioOutput = localStorage.getItem("audioOutput");
      if (localSelectedAudioOutput) {
        this.selectedAudioOutput = localSelectedAudioOutput;
      }
    });
  },
  data() {
    return {
      selectedAudioInput: "default",
      selectedAudioOutput: "default",
      audioInputs: [],
      audioOutputs: [],
      videoinputs: [],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
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
    selectedAudioOutput(deviceId) {
      localStorage.setItem("audioOutput", deviceId);

      const device = this.audioOutputs.find(
        (device) => device.deviceId === deviceId
      );

      this.$store.dispatch("peer/setAudioOutput", { device });
    },
  },
};
</script>

<style scoped lang="scss"></style>
