<template>
  <main
    @click="displayPost(post)"
    class="relative brightness-90 hover:brightness-[1.1] cursor-pointer"
    @mouseenter="isHover(true)"
    @mouseleave="isHover(false)"
  >
    <section
      v-if="!isLoaded"
      class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
    >
      <Icon
        name="mingcute:loading-line"
        size="100"
        color="#FFFFFF"
        class="animate-spin ml-1"
      ></Icon>
    </section>

    <section class="">
      <nuxt-link :to="`/post/${post.id}`">
        <video
          :src="post.video"
          class="aspect-[3/4] object-cover rounded-md"
          muted
          loop
          ref="video"
        ></video>
      </nuxt-link>
    </section>

    <section class="px-1">
      <span class="text-gray-700 text-[15px] pt-1 break-words">
        {{ post.text }}
      </span>
      <div class="flex items-center -ml-1 text-gray-600 font-bold text-xs">
        <Icon name="gg:loadbar-sound" size="20" />
        <span>3%</span>
        <Icon name="tabler:alert-circle" class="ml-1" size="16"></Icon>
      </div>
    </section>
  </main>
</template>

<script setup>
const props = defineProps({
  post: Object,
});

const { $generalStore } = useNuxtApp();

const route = useRoute();
const router = useRouter();

let video = ref(null);
let isLoaded = ref(false);

onMounted(() => {
  //console.log(video);
  video.value.addEventListener("loadeddata", (e) => {
    if (e.target) {
      setTimeout(() => {
        isLoaded.value = true;
      }, 200);
    }
  });
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});

const isHover = (bool) => {
  if (bool) {
    video.value.play();
  } else {
    video.value.pause();
  }
};

const displayPost = (post) => {
  $generalStore.setBackUrl("/profile/" + route.params.id);
  $generalStore.selectedPost = null;
  setTimeout(() => {
    router.push(`/post/${post.id}`);
  }, 150);
};
</script>
