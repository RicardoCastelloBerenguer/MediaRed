<template>
  <div :id="`PostMain-${post.id}`" class="flex justify-center border-b py-6">
    <img
      class="cursor-pointer rounded-full mx-0 max-h-[60px]"
      width="60"
      :src="post.user.image"
      alt=""
    />

    <div class="pl-3 w-[calc(60%)] px-4">
      <div class="flex items-center justify-between pb-0.5">
        <button>
          <span class="font-bold hover:underline cursor-pointer">
            {{ $generalStore.allLowerCaseNoCaps(post.user.name) }}
          </span>
          <span
            class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer"
          >
            {{ post.user.name }}
          </span>
        </button>

        <button
          class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md"
        >
          Seguir
        </button>
      </div>

      <p class="text-[15px] pb-0.5 break-words md:max-w-[440px] max-w-[300px]">
        {{ post.text }}
      </p>

      <div class="flex items-center gap-2">
        <span
          class="text-[15px] text-blue-600 pb-0.5 font-medium cursor-pointer hover:underline"
          >#divertido</span
        >
        <span
          class="text-[15px] text-blue-600 pb-0.5 font-medium cursor-pointer hover:underline"
          >#guay</span
        >
        <span
          class="text-[15px] text-blue-600 pb-0.5 font-medium cursor-pointer hover:underline"
          >#curioso</span
        >
      </div>

      <div
        class="float items-center font-semibold text-[14px] pb-0.5 cursor-pointer hover:underline"
      >
        <Icon name="mdi:music" size="17"></Icon>
        <span class="px-1">Sonido original - {{ post.user.name }}</span>
      </div>

      <div class="mt-2.5 flex">
        <div
          @click="displayPost(post)"
          class="relative min-h-[480px] max-h-[550px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer shadow-md"
        >
          <video
            ref="video"
            :src="post.video"
            loop
            muted
            class="rounded-xl object-cover mx-auto h-full"
          />

          <img
            class="absolute right-2 bottom-14"
            src="/images/logo-red.png"
            width="35"
            alt=""
          />
        </div>

        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center flex flex-col gap-2">
              <div class="flex flex-col">
                <button
                  @click="isLiked ? unlikePost() : likePost()"
                  class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"
                >
                  <Icon
                    name="mdi:heart"
                    :color="isLiked ? '#F02C56' : ''"
                    size="25"
                  />
                </button>
                <span class="text-xs text-gray-800 font-semibold">
                  {{ post.likes.length }}
                </span>
              </div>

              <div class="flex flex-col">
                <button
                  class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"
                >
                  <Icon name="tabler:message" size="25" />
                </button>
                <span class="text-xs text-gray-800 font-semibold">34</span>
              </div>

              <button
                class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"
              >
                <Icon name="bx:import" size="25" />
              </button>

              <button
                class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer"
              >
                <Icon name="ph:share-bold" size="25" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let loadedLikeSubscription = ref(true);

const router = useRouter();

const props = defineProps({
  post: {
    Object,
    required: true,
  },
});

const { post } = toRefs(props);
const { $userStore, $generalStore } = useNuxtApp();

let video = ref(null);

onMounted(() => {
  let observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        video.value.play();
      } else {
        if (video && video.value) video.value.pause();
      }
    },
    { threshold: [0.6] }
  );

  observer.observe(document.getElementById(`PostMain-${post.value.id}`));
  //video.value.play();
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});

const isLiked = computed(() => {
  return post.value.likes.find((like) => like.user_id === $userStore.id);
});

const likePost = async () => {
  console.log(loadedLikeSubscription.value);
  if (loadedLikeSubscription.value) {
    loadedLikeSubscription.value = false;
    if (!$userStore.id) {
      $generalStore.isLoginOpen = true;
      loadedLikeSubscription.value = true;
      return;
    }
    try {
      await $userStore.likePost(post.value);
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
    if (!$userStore.id) {
      $generalStore.isLoginOpen = true;
      loadedLikeSubscription.value = true;
      return;
    }
    try {
      await $userStore.unlikePost(post.value);
      loadedLikeSubscription.value = true;
    } catch (error) {
      console.log(error);
      //loadedLikeSubscription.value = true;
    }
  }
};

const displayPost = () => {
  $generalStore.setBackUrl("/");
  $generalStore.selectedPost = null;
  router.push(`/post/${post.value.id}`);
};
</script>

<style lang="scss" scoped></style>
