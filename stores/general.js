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
    async hasSessionExpired() {
      await $axios.interceptors.response.use(
        ((response) => {
          return response;
        },
        (error) => {
          switch (error.response.status) {
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
        })
      );
    },
  },
  persist: true,
});
