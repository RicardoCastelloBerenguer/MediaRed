<template>
  <div id="PostMain" class="flex border-b py-6">

    <img class="cursor-pointer rounded-full mx-0 max-h-[60px]" width="60" src="https:picsum.photos/300/320" alt="">

    <div class="pl-3 w-[calc(60%)] px-4">
      <div class="flex items-center justify-between pb-0.5">
        <button>
          <span class="font-bold hover:underline cursor-pointer">
            {{ username }}
          </span>
          <span class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer">
            {{ name }}
          </span>
        </button>

        <button class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
          Seguir
        </button>
      </div>

      <p class="text-[15px] pb-0.5 break-words md:max-w-[440px] max-w-[300px]">
        texto de ejemplo
      </p>

      <div class="flex items-center gap-2">
        <span class="text-[15px] text-blue-600 pb-0.5 font-medium cursor-pointer hover:underline">#divertido</span>
        <span class="text-[15px] text-blue-600 pb-0.5 font-medium cursor-pointer hover:underline">#guay</span>
        <span class="text-[15px] text-blue-600 pb-0.5 font-medium cursor-pointer hover:underline">#curioso</span>
      </div>


      <div class="float items-center font-semibold text-[14px] pb-0.5 cursor-pointer hover:underline">
        <Icon name="mdi:music" size="17"></Icon>
        <span class="px-1">Sonido original - {{ name }}</span>
      </div>

      <div class="mt-2.5 flex">
        <div class="relative min-h-[480px] max-h-[550px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer shadow-md">
          <video
              ref="video"
              src="/videos/seoul.mp4"
              loop
              muted
              class="rounded-xl object-cover mx-auto h-full"
          />

          <img class="absolute right-2 bottom-14" src="/images/logo-red.png" width="35" alt="">
          
        </div>

        <div class="relative mr-[75px]">
          <div class="absolute bottom-0 pl-2">
            <div class="pb-4 text-center flex flex-col gap-2">

              <div class="flex flex-col">
                <button class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer">
                  <Icon name="mdi:heart" size="25" />
                </button>
                <span class="text-xs text-gray-800 font-semibold">34</span>
              </div>

              <div class="flex flex-col">
                <button class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer">
                  <Icon name="tabler:message" size="25" />
                </button>
                <span class="text-xs text-gray-800 font-semibold">34</span>
              </div>

              <button class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer">
                <Icon name="bx:import" size="25" />
              </button>

              <button class="rounded-full bg-gray-200 hover:bg-gray-300 p-2 cursor-pointer">
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

const props = defineProps({
  'username' : String,
  'name' : String,
})

let video = ref(null)

onMounted(() => {
  video.value.play()
});

</script>

<style lang="scss" scoped>

</style>