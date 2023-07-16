<template>
  <div>
    <UploadLayout>

      <section class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
        <div>
          <h2 class="text-[23px] font-semibold">Subir un vídeo</h2>
          <span class="text-gray-400 mt-1">Sube un vídeo a tu cuenta</span>
        </div>

        <div class="mt-8 md:flex gap-6">
          <label
              v-if="false"
              for="fileInput"
              class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px]
              text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
          >

            <Icon name="majesticons:cloud-upload" size="40" color="#B3B3B1" />

            <span class="mt-4 text-[17px]">Selecciona un video para subirlo</span>
            <span class="mt-1.5 text-[13px] text-gray-500">O arrastra el archivo</span>
            <span class="mt-14 text-[13px] text-gray-500">MP4 o WebM</span>

            <span class="mt-7 bg-[#fe2c55] w-80% font-semibold text-white px-4 py-1.5 rounded-sm hover:bg-[#e3274b]">Selecciona un archivo</span>

            <input
                ref="file"
                type="file"
                id="fileInput"
                hidden
                accept=".mp4, .webm"
            >

          </label>


          <div v-else class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px]
          h-[540px] p-3 rounded-2xl cursor-pointer relative">
            <div class="bg-black h-full w-full"/>

              <img src="/images/mobile-case.png" class="absolute z-20 pointer-events-none" alt="mobile-case">

              <img class="absolute right-8 bottom-10 z-20" width="40" src="/images/logo-red.png" alt="">

              <video
                autoplay
                muted
                loop
                class="absolute rounded-xl p-[13px] z-10 object-cover w-full h-full"
                src="/videos/seoul.mp4"
              />


          </div>

        </div>


      </section>

    </UploadLayout>
  </div>
</template>

<script setup>

import UploadLayout from "~/layouts/UploadLayout.vue";
</script>

<style lang="scss" scoped>

</style>