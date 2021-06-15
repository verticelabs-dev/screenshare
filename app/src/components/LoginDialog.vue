<template>
  <div>
    <Modal v-on:close="close" v-if="!user.id">
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
    <Modal v-on:close="close" v-else>
      <template v-slot:header> User Info </template>
      <template v-slot:body>
        <div>
          <p>Full Name:</p>
          <p class="mb-4">{{ user.full_name }}</p>
          <p>Email:</p>
          <p class="mb-4">{{ user.email }}</p>
          <p>Joined At:</p>
          <p class="mb-4">{{ user.created_at }}</p>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "./modal";
import { mapState } from "vuex";

export default {
  components: {
    Modal,
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapState("peer", ["roomCode"]),
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

        this.$emit("loggedIn", true);

        if (this.roomCode) {
          this.$socket.emit("room:log:in", { roomCode: this.roomCode });
        }

        this.close();
      } catch (error) {
        this.$emit("loggedIn", false);
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
