<template>
  <div class="card">
    <div class="card-header">
      <div class="text-white mb-1 mt-1 ml-4">Travier's Stream</div>

      <!-- Top Right Control Buttons -->
      <div>
        <!-- C;pse Button -->
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
      <h1>Travier's Stream</h1>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "hideClose", "hideExpand"],
  components: {},
  data() {
    return {};
  }
};
</script>

<style></style>
