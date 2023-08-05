import { defineStore } from "pinia";

import axios from "../plugins/axios";

const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    email: "",
    name: "",
    bio: "",
    image: "",
  }),
  actions: {
    async getTokens() {
      await $axios.get("/sanctum/csrf-cookie");
    },
    async login(email, password) {
      await $axios.post("/login", {
        email: email,
        password: password,
      });
    },
    async register(name, email, password, confirmPassword) {
      await $axios.post("/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });
    },
    async logout() {
      await $axios.post("/logout");
      this.resetUser();
    },
    async getUser() {
      let res = await $axios.get("/api/logged-user");
      let user = res.data[0];

      this.$state.id = user.id;
      this.$state.name = user.name;
      this.$state.email = user.email;
      this.$state.bio = user.bio;
      this.$state.image = user.image;
    },
    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.email = "";
      this.$state.bio = "";
      this.$state.image = "";
    },
  },
  persist: true,
});
