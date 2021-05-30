<template>
  <div class="streamControlBar">
    <div>
      <!-- Mute Button -->
      <div @click="toggleMute" class="circle-btn">
        <font-awesome-icon icon="volume-mute" v-if="muted"/>
        <font-awesome-icon icon="volume-up" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  }
};
</script>

<style>

</style>
