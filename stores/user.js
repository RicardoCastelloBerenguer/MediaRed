import { defineStore } from "pinia";
import { useGeneralStore } from "./general";
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
    //AUTH AXIOS FUNCTIONS

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

    //USER AXIOS FUNCTIONS

    async getUser() {
      let res = await $axios.get("/api/logged-user");
      let user = res.data[0];

      this.$state.id = user.id;
      this.$state.name = user.name;
      this.$state.email = user.email;
      this.$state.bio = user.bio;
      this.$state.image = user.image;
    },
    async updateUserImage(data) {
      return await $axios.post("/api/update-user-image", data);
    },
    async updateUser(name, bio) {
      return await $axios.patch("/api/update-user", {
        name: name,
        bio: bio,
      });
    },
    resetUser() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.email = "";
      this.$state.bio = "";
      this.$state.image = "";
    },

    //POST AXIOS FUNCTIONS

    async createPost(data) {
      return await $axios.post("/api/posts", data);
    },
    // async likePost(post, isPostPage) {
    //   let singlePost = null;

    //   let res = await $axios.post("/api/likes", {
    //     post_id: post.id,
    //   });

    //   if (isPostPage) singlePost = post;
    //   else singlePost = useGeneralStore().posts.find((p) => p.id === post.id);

    //   console.log(singlePost);

    //   singlePost.likes.push(res.data.like);
    // },

    async likePost(post) {
      const newLike = {
        id: Math.floor(Math.random() * 900),
        user_id: this.id,
        post_id: post.id,
      };

      post.likes.push(newLike);

      $axios
        .post("/api/likes", {
          post_id: post.id,
        })
        .then((res) => {
          console.log(res.data.like);
          post.likes.splice(post.likes.length - 1, 1);
          post.likes.push(res.data.like);
        })
        .catch((error) => {
          post.likes.splice(post.likes.length - 1, 1);
          console.error("Error al agregar el like:", error);
        });
    },

    async unlikePost(post) {
      let likeToDelete = null;

      const likeIndex = post.likes.findIndex(
        (like) => like.user_id === this.id
      );

      likeToDelete = post.likes[likeIndex];

      if (likeIndex !== -1) {
        post.likes.splice(likeIndex, 1);
        let res = await $axios.delete(`/api/likes/${likeToDelete.id}`);
      }
    },

    //FUNCTION OF UNLIKE NOT OPTIMIZED

    // async unlikePost(post, isPostPage) {
    //   let singlePost = null;
    //   let likeToBeDeleted = null;

    //   if (isPostPage) singlePost = post;
    //   else singlePost = useGeneralStore().posts.find((p) => p.id === post.id);

    //   singlePost.likes.forEach((like) => {
    //     if (like.user_id === this.id) likeToBeDeleted = like;
    //   });

    //   // singlePost.likes.foreach((like) => {
    //   //   if (like.user_id === this.id) likeToBeDeleted = like;
    //   // });
  },
  persist: true,
});
