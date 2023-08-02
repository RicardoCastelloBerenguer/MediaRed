<template>
  <main
    class="fixed lg:flex justify-center z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto"
    id="PostPage"
  >
    <section class="lg:w-[calc(100%-540px)] w-auto h-full relative">
      <nuxt-link
        to=""
        class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800"
      >
        <Icon
          name="material-symbols:close"
          color="#ffffff"
          size="27"
          class=""
        />
      </nuxt-link>

      <div v-if="true">
        <button
          class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700"
        >
          <Icon name="mdi:chevron-up" size="30" color="#ffffff" class="" />
        </button>

        <button
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

      <video
        v-if="true"
        class="absolute object-cover w-full my-auto z-[-1] h-screen"
        src="/videos/seoul.mp4"
      ></video>

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
          v-if="true"
          src="/videos/seoul.mp4"
          class="h-screen mx-auto"
          muted
          loop
          ref="video"
        ></video>
      </div>
    </section>

    <section
      id="InfoSection"
      v-if="true"
      class="lg:max-w-[550px] relative w-full h-full bg-white p-2"
    >
      <section>
        <div class="flex items-center justify-between mt-14">
          <div class="flex">
            <nuxt-link to="/"
              ><img
                class="rounded-full lg:mx-0 mx-auto mt-1"
                width="40"
                src="https:picsum.photos/300/320"
                alt=""
            /></nuxt-link>

            <div class="ml-3 pt-0.5">
              <p class="text-[17px] font-semibold">Nombre de usuario</p>
              <div class="text-[13px] -mt-5 font-light">
                Nombre de usuario
                <span class="relative -top-[2px] text-[30px] pr-0.5">.</span>
                <span class="font-medium">Date Here</span>
              </div>
            </div>
          </div>

          <Icon
            v-if="true"
            class="cursor-pointer"
            size="25"
            name="material-symbols:delete-outline-sharp"
          />
        </div>

        <p class="px-8 mt-4 text-sm">This is the post text</p>
        <p class="px-8 mt-4 text-sm font-bold">
          <Icon name="mdi:music" size="17" color="" class="" />
          Original sound - User name
        </p>

        <div class="flex items-center px-8 mt-8">
          <div class="pb-4 text-center flex items-center">
            <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
              <Icon name="mdi:heart" size="25" color="" class="" />
            </button>
            <span class="text-xs pl-2 pr-4 text-gray-800 font-bold">67</span>
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
        <p v-if="false" class="mt-10 text-xl text-gray-500 text-center">
          No comments...
        </p>
        <div v-else class="flex items-center justify-between px-8 mt-4">
          <div class="flex items-center relative w-full">
            <nuxt-link to="/">
              <img
                src="https:picsum.photos/300/320"
                width="40"
                class="absolute top-0 rounded-full lg:mx-0 mx-auto"
                alt=""
              />
            </nuxt-link>

            <div class="ml-14 pt-0.5 w-full">
              <div
                class="text-[18px] font-semibold flex items-center justify-between"
              >
                <span>Username</span>

                <Icon
                  v-if="true"
                  @click="deleteComment()"
                  name="material-symbols:delete-outline-sharp"
                  size="25"
                  class="cursor-pointer"
                />
              </div>

              <p class="text-[15px] font-light">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
                saepe beatae illum eius, deserunt odio minima quod impedit
                veniam nesciunt maxime quae eligendi quo rerum dolorem? Ipsum
                eum doloribus consequuntur?
              </p>
            </div>
          </div>
        </div>
        <div class="mb-28" />
      </section>
      <section
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

onMounted(() => {
  isLoaded.value = true;
  video.value.play();

  // video.value.addEventListener("loadeddata", (e) => {
  //   if (e.target) {
  //     setTimeout(() => {
  //       isLoaded.value = true;
  //     }, 500);
  //   }
  // });
});

onBeforeUnmount(() => {
  video.value.pause();
  video.value.currentTime = 0;
  video.value.src = "";
});

watch(
  () => isLoaded.value,
  () => {
    if (isLoaded.value) {
      setTimeout(() => {
        video.value.play();
      }, 460);
    }
  }
);

const deleteComment = () => {};
const addComment = () => {};
</script>
<style lang="scss" scoped></style>
