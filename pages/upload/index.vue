<template>
  <div>
    <UploadError :error-type="errorType" />

    <div
      v-if="isUploading"
      class="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black z-50 bg-opacity-50"
    >
      <Icon
        name="mingcute:loading-line"
        size="100"
        color="#FFFFFF"
        class="animate-spin ml-1"
      ></Icon>
    </div>

    <UploadLayout>
      <section
        class="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4"
      >
        <div>
          <h2 class="text-[23px] font-semibold">Subir un vídeo</h2>
          <span class="text-gray-400 mt-1">Sube un vídeo a tu cuenta</span>
        </div>

        <div class="mt-8 md:flex gap-6">
          <label
            v-if="!fileDisplay"
            @dragover.prevent=""
            @drop.prevent="onDrop"
            for="fileInput"
            class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[260px] h-[470px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <Icon name="majesticons:cloud-upload" size="40" color="#B3B3B1" />

            <span class="mt-4 text-[17px]"
              >Selecciona un video para subirlo</span
            >
            <span class="mt-1.5 text-[13px] text-gray-500"
              >O arrastra el archivo</span
            >
            <span class="mt-14 text-[13px] text-gray-500">MP4 o WebM</span>

            <span
              class="mt-7 bg-[#fe2c55] w-80% font-semibold text-white px-4 py-1.5 rounded-sm hover:bg-[#e3274b]"
              >Selecciona un archivo</span
            >

            <input
              ref="file"
              type="file"
              @input="onChange"
              id="fileInput"
              hidden
              accept=".mp4, .webm"
            />
          </label>

          <div
            v-else
            class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[260px] h-[540px] p-3 rounded-2xl cursor-pointer relative"
          >
            <div class="bg-black h-full w-full" />

            <img
              src="/images/mobile-case.png"
              class="absolute z-20 pointer-events-none"
              alt="mobile-case"
            />

            <img
              class="absolute right-8 bottom-10 z-20"
              width="40"
              src="/images/logo-red.png"
              alt=""
            />

            <video
              autoplay
              muted
              loop
              class="absolute rounded-xl p-[13px] z-10 object-cover w-full h-full"
              :src="fileDisplay"
            />

            <div
              class="absolute -bottom-12 flex items-center justify-between z-50 rounded-xl border w-full p-2 border-gray-300"
            >
              <div class="flex items-center truncate">
                <Icon
                  name="clarity:success-standard-line"
                  size="16"
                  class="min-w-[16px]"
                ></Icon>
                <span class="text-[11px] pl-1 truncate text-ellipsis">{{
                  fileData.name
                }}</span>
              </div>

              <button class="text-[11px] ml-2 font-semibold">Cambiar</button>
            </div>
          </div>

          <div class="mt-4 mb-6">
            <div class="flex bg-[#F8F8F8] py-4 px-6">
              <Icon name="mdi:box-cutter-off" size="20" class="mr-4" />
              <div>
                <span class="block text-semibold text-[15px] mb-1.5"
                  >Divide el video y edítalo</span
                >
                <span class="text-semibold text-[13px] text-gray-400"
                  >Puedes rápidamente dividir videos en varios y crear tu propio
                  video con tus partes favoritas
                </span>
              </div>
              <div
                class="flex justify-end max-w-[130px] w-full h-full text-center my-auto"
              >
                <button
                  class="px-8 py-1.5 text-white text-[15px] bg-[#F02C56] rounded-sm hover:bg-[#e3274b]"
                >
                  Editar
                </button>
              </div>
            </div>

            <div class="mt-5">
              <div class="flex items-center justify-between">
                <div class="mb-1 text-[15px]">Descripción</div>
                <div class="text-gray-400 text-[12px]">
                  {{ caption.length }}/150
                </div>
              </div>

              <input
                maxlength="150"
                type="text"
                v-model="caption"
                class="w-full border p-2.5 rounded-md focus:outline-none"
              />
            </div>

            <div class="flex gap-3">
              <button
                @click="discard"
                class="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-sm"
              >
                Descartar
              </button>

              <button
                @click="createPost()"
                class="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#F02C56] hover:bg-[#e3274b] rounded-sm"
              >
                Subir
              </button>
            </div>

            <div v-if="errors" class="mt-4">
              <span v-if="errors.video" class="text-red-500 block">
                {{ errors.video[0] }}</span
              >
              <span v-if="errors.text" class="text-red-500 block">
                {{ errors.text[0] }}</span
              >
            </div>
          </div>
        </div>
      </section>
    </UploadLayout>
  </div>
</template>

<script setup>
import UploadLayout from "~/layouts/UploadLayout.vue";

const { $userStore } = useNuxtApp();
const router = useRouter();

definePageMeta({
  middleware: "auth",
});

let file = ref(null);
let fileDisplay = ref(null);
let errorType = ref(null);
let caption = ref("");
let fileData = ref(null);
let errors = ref(null);
let isUploading = ref(false);

watch(
  () => caption.value,
  (caption) => {
    if (caption.length > 150) {
      errorType.value = "caption";
      return;
    }
    errorType.value = null;
  }
);

const onChange = () => {
  fileData.value = file.value.files[0];

  /*let extension = fileData.value.name.substring(file.value.name.lastIndexOf('.' + 1))

    if (extension !== 'mp4' && extension !== 'webm'){
      errorType.value = 'file';
      return
    }*/

  fileDisplay.value = URL.createObjectURL(file.value.files[0]);
};

const onDrop = (e) => {
  errorType.value = "";
  file.value = e.dataTransfer.files[0];
  fileData.value = e.dataTransfer.files[0];

  let extension = fileData.value.name.substring(
    file.value.name.lastIndexOf("." + 1)
  );

  if (extension !== "mp4" && extension !== "webm") {
    errorType.value = "file";
    return;
  }

  fileDisplay.value = URL.createObjectURL(e.dataTransfer.files[0]);
};

const discard = () => {
  if (fileDisplay.value) {
    file.value = null;
    fileDisplay.value = null;
    caption.value = "";
    fileData.value = null;
    isUploading.value = false;
  }
};

const createPost = async () => {
  errors.value = null;

  let data = new FormData();

  data.append("video", fileData.value || "");
  data.append("text", caption.value || "");

  if (fileData.value && caption.value) {
    isUploading.value = true;
  }
  try {
    let response = await $userStore.createPost(data);

    if ((response.status = 200)) {
      setTimeout(() => {
        router.push("/profile/" + $userStore.id);
        isUploading.value = false;
      }, 200);
    }
  } catch (error) {
    errors.value = error.response.data.errors;
    isUploading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
