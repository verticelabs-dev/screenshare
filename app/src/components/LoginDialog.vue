<template>
  <Modal v-on:close="close">
    <template v-slot:header> Login </template>
    <template v-slot:body>
      <div>
        <label for="email" class="block font-medium">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          autocomplete="email"
          v-model="email"
          class="mt-1 block w-full shadow-md rounded-md text-gray-700"
        />

        <br />

        <label for="password" class="block font-medium">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          @keyup.enter="login"
          class="mt-1 block w-full shadow-md rounded-md text-gray-700"
        />
      </div>
    </template>
    <template v-slot:footer>
      <button class="mt-4 btn btn-sm w-full btn-primary" @click="login">
        Login
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "./modal";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    close() {
      this.email = "";
      this.password = "";

      this.$emit("close");
    },
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        const loggedIn = await this.$axios.post("/login", data);
        this.$store.dispatch("user/setUser", loggedIn.data);

        this.close();
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
