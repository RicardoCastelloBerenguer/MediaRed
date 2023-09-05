<template>
  <main
    class="fixed lg:flex justify-center z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
    id="PostPage"
  >
    <section
      v-if="$generalStore.selectedPost"
      class="lg:w-[calc(100%-540px)] w-auto h-full relative"
    >
      <nuxt-link
        :to="$generalStore.isBackUrl"
        class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
      >
        <Icon
          name="material-symbols:close"
          color="#ffffff"
          size="27"
          class=""
        />
      </nuxt-link>

      <div v-if="$generalStore.ids.length > 1">
        <button
          :disabled="isLoaded"
          @click="loopThroughPostsUp()"
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700"
        >
          <Icon name="mdi:chevron-up" size="30" color="#ffffff" class="" />
        </button>

        <button
          :disabled="isLoaded"
          @click="loopThroughPostsDown()"
          class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700"
        >
          <Icon name="mdi:chevron-down" size="30" color="#ffffff" class="" />
        </button>
      </div>

      <img
        src="/images/logo-red.png"
        class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto"
        width="45"
        alt=""
      />

      <div
        v-if="!isLoaded"
        class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]"
      >
        <Icon
          name="mingcute:loading-line"
          size="100"
          color="#ffffff"
          class="animate-spin ml-1"
        />
      </div>

      <div class="h-screen mx-auto bg-black bg-opacity-70 lg:min-w-[480px]">
        <video
          v-if="$generalStore.selectedPost.video"
          :src="$generalStore.selectedPost.video"
          class="h-screen mx-auto"
          muted
          loop
          ref="video"
        ></video>
      </div>
    </section>

    <section
      id="InfoSection"
      v-if="$generalStore.selectedPost"
      class="lg:max-w-[550px] relative w-full h-full bg-white p-2"
    >
      <section>
        <div class="flex items-center justify-between mt-14">
          <div class="flex">
            <nuxt-link :to="`/profile/${$generalStore.selectedPost.user.id}`"
              ><img
                class="rounded-full lg:mx-0 mx-auto mt-1"
                width="40"
                :src="$generalStore.selectedPost.user.image"
                alt=""
            /></nuxt-link>

            <div class="ml-3 pt-0.5">
              <p class="text-[17px] font-semibold">
                {{
                  $generalStore.allLowerCaseNoCaps(
                    $generalStore.selectedPost.user.name
                  )
                }}
              </p>
              <div class="text-[13px] -mt-5 font-light">
                {{ $generalStore.selectedPost.user.name }}
                <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
                <span class="font-medium">
                  {{ $generalStore.selectedPost.created_at }}
                </span>
              </div>
            </div>
          </div>

          <Icon
            v-if="$userStore.id === $generalStore.selectedPost.user.id"
            @click="deletePost()"
            class="cursor-pointer"
            size="25"
            name="material-symbols:delete-outline-sharp"
          />
        </div>

        <p class="px-8 mt-4 text-sm">{{ $generalStore.selectedPost.text }}</p>
        <p class="px-8 mt-4 text-sm font-bold">
          <Icon name="mdi:music" size="17" color="" class="" />
          Original sound -
          {{
            $generalStore.allLowerCaseNoCaps(
              $generalStore.selectedPost.user.name
            )
          }}
        </p>

        <div class="flex items-center px-8 mt-8">
          <div class="pb-4 text-center flex items-center">
            <button
              class="rounded-full bg-gray-200 p-2 cursor-pointer"
              @click="isLiked ? unlikePost() : likePost()"
            >
              <Icon
                name="mdi:heart"
                size="25"
                :color="isLiked ? '#F02C56' : ''"
                class=""
              />
            </button>
            <span class="text-xs pl-2 pr-4 text-gray-800 font-bold">
              {{ $generalStore.selectedPost.likes.length }}
            </span>
          </div>

          <div class="pb-4 text-center flex items-center">
            <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
              <Icon
                name="bx:bxs-message-rounded-dots"
                size="25"
                color=""
                class=""
              />
            </button>
            <span class="text-xs pl-2 pr-4 text-gray-800 font-bold">67</span>
          </div>
        </div>
      </section>
      <section
        id="Comments"
        class="bg-[#f8f8f8] h-[calc(100%-273px)] border-t-2 overflow-auto"
      >
        <p
          v-if="!$generalStore.selectedPost.comments.length === 0"
          class="mt-10 text-xl text-gray-500 text-center"
        >
          No comments...
        </p>
        <div
          v-else
          class="flex items-center justify-between px-8 mt-4"
          v-for="comment in $generalStore.selectedPost.comments"
        >
          <div class="mt-3 w-full">
            <div class="flex items-center relative w-full">
              <nuxt-link :to="`/profile/${comment.user.id}`">
                <img
                  :src="comment.user.image"
                  width="40"
                  class="absolute top-0 rounded-full lg:mx-0 mx-auto"
                  alt=""
                />
              </nuxt-link>

              <div class="ml-14 pt-0.5 w-full">
                <div
                  class="text-[18px] font-semibold flex items-center justify-between"
                >
                  <span>{{ comment.user.name }}</span>

                  <Icon
                    v-if="$userStore.id === comment.user.id"
                    @click="
                      deleteComment($generalStore.selectedPost, comment.id)
                    "
                    name="material-symbols:delete-outline-sharp"
                    size="25"
                    class="cursor-pointer"
                  />
                </div>

                <p class="text-[15px] font-light">{{ comment.text }}</p>
              </div>
            </div>
          </div>

          <!-- <Comment /> -->
        </div>
        <div class="mb-28" />
      </section>
      <section
        id="CreateComment"
        v-if="$userStore.id"
        class="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
      >
        <div
          :class="
            inputFocused
              ? 'border-2 border-gray-400'
              : 'border-2 border-[#F1F1F2]'
          "
          class="bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]"
        >
          <input
            v-model="comment"
            @focus="inputFocused = true"
            @blur="inputFocused = false"
            class="bg-[#f1f1f2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
            placeholder="Añade un comentario"
            type="text"
          />
        </div>
        <button
          @click="addComment()"
          :disabled="!comment"
          class="font-semibold text-sm ml-5 border rounded-lg p-2.5 cursor-pointer hover:bg-[#f8f8fcfa]"
          :class="comment ? 'text-[#f02c56] cursor-pointer' : 'text-gray-400'"
        >
          Post
        </button>
      </section>
    </section>
  </main>
</template>
<script setup>
const route = useRoute();
const router = useRouter();

let comment = ref("");
let inputFocused = ref(null);
let video = ref(null);
let isLoaded = ref(false);
let loadedLikeSubscription = ref(true);

const { $userStore, $generalStore, $profileStore } = useNuxtApp();

onMounted(async () => {
  $generalStore.selectedPost = null;

  try {
    await $generalStore.getPostById(route.params.id);
    console.log($generalStore.selectedPost.comments);
  } catch (error) {
    console.log(error);
    if (error) {
      router.push("/profile/6");
    }
  }

  console.log(video.value);

  video.value.addEventListener("loadeddata", (e) => {
    if (e.target) {
      setTimeout(() => {
        isLoaded.value = true;
      }, 500);
    }
  });
});

onBeforeUnmount(() => {
  if (video && video.value) {
    video.value.pause();
    video.value.currentTime = 0;
    video.value.src = "";
  }
});

onBeforeRouteUpdate((to, from, next) => {
  // Pausar el video antes de cambiar de ruta
  if (video && video.value) {
    video.value.pause();
    video.value.currentTime = 0;
    video.value.src = "";
  }
  next();
});

watch(
  () => isLoaded.value,
  () => {
    if (isLoaded.value) {
      setTimeout(() => video.value.play(), 500);
    }
  }
);

const deleteComment = () => {};
const addComment = async () => {
  try {
    await $userStore.createComment($generalStore.selectedPost, comment.value);
    comment.value = "";
    document.getElementById("Comments").scroll({ top: 0, behaviour: "smooth" });
  } catch (error) {
    console.log(error);
  }
};

const isLiked = computed(() => {
  return $generalStore.selectedPost.likes.find(
    (like) => like.user_id === $userStore.id
  );
});

const likePost = async () => {
  console.log(loadedLikeSubscription.value);
  if (loadedLikeSubscription.value) {
    loadedLikeSubscription.value = false;
    try {
      await $userStore.likePost($generalStore.selectedPost, true);
      loadedLikeSubscription.value = true;
    } catch (error) {
      console.log(error);
      loadedLikeSubscription.value = true;
    }
    //
  }
};

const unlikePost = async () => {
  if (loadedLikeSubscription.value) {
    loadedLikeSubscription.value = false;
    try {
      await $userStore.unlikePost($generalStore.selectedPost, true);
      loadedLikeSubscription.value = true;
    } catch (error) {
      console.log(error);
      //loadedLikeSubscription.value = true;
    }
  }
};
</script>
<style lang="scss" scoped></style>
