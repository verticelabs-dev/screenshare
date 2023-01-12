<template>
  <transition name="modal">
    <div class="modal-mask" v-on:click="$emit('close')">
      <div class="modal-wrapper">
        <div :class="`modal-container ${getModalSizeClass}`" v-on:click.stop>
          <header class="modal-header">
            <slot name="header"> This is the default title! </slot>
          </header>

          <section class="modal-body">
            <slot name="body"> This is the default body! </slot>
          </section>

          <footer class="modal-footer">
            <slot name="footer">
              <button class="btn btn-sm btn-primary" @click="$emit('close')">
                Close
              </button>

              <button
                v-if="this.confirm"
                class="btn btn-sm btn-success"
                @click="$emit('close')"
              >
                Confirm
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  components: {},
  props: {
    size: String,
    confirm: Function,
  },
  computed: {
    getModalSizeClass() {
      return "modal-container-" + (this.size || "small");
    },
  },
  data() {
    return {};
  },
};
</script>

<style></style>
