<template>
  <notificationGroup group="top-toaster">
    <div class="top-toast-container">
      <div class="max-w-sm w-full">
        <notification v-slot="{ notifications }">
          <div
            class="toast"
            v-for="notification in notifications"
            :key="notification.id"
          >
            <div :class="`toast-icon ${toastType(notification)}`">
              <font-awesome-icon icon="check-circle" />
            </div>

            <div class="-mx-3 py-2 px-4">
              <div class="mx-3">
                <span :class="`toast-title ${toastType(notification)}`">
                  {{ notification.title }}
                </span>
                <p class="toast-text">{{ notification.text }}</p>
              </div>
            </div>
          </div>
        </notification>
      </div>
    </div>
  </notificationGroup>
</template>

<script>
export default {
  methods: {
    toastType(notification) {
      return (notification.type || "").toLowerCase() || "success";
    },
  },
};

// ----- Toast Examples ------
// The $notify function can be used in any vue component

// this.$notify(
//   {
//     group: "top-toaster",
//     type: "success",
//     title: "Success",
//     text: "Your account was registered!",
//   },
//   4000 //- MS
// );

// this.$notify(
//   {
//     group: "top-toaster",
//     type: "error",
//     title: "Error",
//     text: "Email was already in use",
//   },
//   4000 //- MS
// );
</script>

<style scoped lang="scss"></style>
