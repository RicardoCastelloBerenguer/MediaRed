import { defineStore } from "pinia";
import axios from "../plugins/axios";
import { useUserStore } from "./user";

const $axios = axios().provide.axios;

export const useGeneralStore = defineStore("general", {
  state: () => ({
    isLoginOpen: false,
    isEditProfileOpen: false,
    selectedPost: null,
    ids: null,
    isBackUrl: "/",
    posts: null,
    suggested: null,
    following: null,
  }),
  actions: {
    bodySwitch(switchStopScroll) {
      if (switchStopScroll) document.body.style.overflow = "hidden";
      else document.body.style.overflow = "visible";
    },
    async getRandomUsers(type) {
      let res = await $axios.get("/api/get-random-users");

      if (type === "suggested") this.suggested = res.data.suggested;
      if (type === "following") this.following = res.data.following;
    },
    async getAllPosts() {
      let res = await $axios.get("/api/home");

      this.$state.posts = res.data;
    },
    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          switch (error.status) {
            case 401:
            case 419:
            case 401:
              useUserStore().resetUser();
              window.location.href = "/";
              break;
            case 500:
              alert(
                "Oops , something in our server is not going accordingly , wait until it is fixed thanks."
              );
              break;
            default:
              return Promise.reject(error);
          }
        }
      );
    },
    allLowerCaseNoCaps(string) {
      return string.split(" ").join("").toLowerCase();
    },
    setBackUrl(url) {
      this.isBackUrl = url;
    },
    updateSideMenuImage(array, user) {
      for (let i = 0; i <= array.length - 1; i++) {
        let res = array[i];
        if (res.id === user.id) {
          res.image = user.image;
        }
      }
    },
  },
  persist: true,
});
