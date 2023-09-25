<template>
  <main
    id="EditProfileOverlay"
    class="fixed flex justify-center pt-14 md:pt-[105px] z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 overflow-auto"
  >
    <section
      class="relative bg-white w-full max-w-[770px] sm:h-[580px] h-[655px] mx-3 p-4 rounded-lg mb-10"
      :class="!uploadedImage ? 'h-[655px]' : 'h-[580px]'"
    >
      <div
        class="absolute flex items-center justify-between w-full p-5 left-0 top-0 border-b border-b-gray-300"
      >
        <span class="text-[22px] font-medium block">Editar Perfil</span>
        <button @click="$generalStore.isEditProfileOpen = false" class="">
          <Icon name="mdi:close" size="25" />
        </button>
      </div>

      <div
        class="h-[calc-(500px-200px)]"
        :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'"
      >
        <section v-if="!uploadedImage" class="">
          <div
            id="ProfilePhotoSection"
            class="flex flex-col border-b sm:h-[145px] px-1.5 py-2 w-full"
          >
            <label
              class="sm:text-left text-center font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px]"
              >Foto de perfil</label
            >
            <div class="flex items-center justify-center sm:-mt-6">
              <label for="image" class="relative cursor-pointer">
                <img
                  :src="userImage"
                  alt="profile image"
                  width="95"
                  class="rounded-full"
                />

                <div
                  class="absolute bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px]"
                >
                  <Icon
                    name="ph:pencil-simple-line-bold"
                    size="17"
                    color=""
                    class="-mt-1 ml-0.5"
                  />
                </div>
              </label>

              <input
                class="hidden"
                type="file"
                name=""
                id="image"
                @input="getUploadedImage"
                accept="image/png, image/jpeg, image/jpg,"
              />
            </div>
          </div>
          <div
            id="UsernameSection"
            class="flex flex-col border-b sm:h-[118px] px-1.5 py-2 mt-1.5 w-full"
          >
            <label
              class="font-semibold text-[15px] sm:mb-0 text-gray-700 sm:w-[160px] sm:text-left text-center"
              >Nombre de usuario
            </label>

            <div class="flex items-center justify-center sm:-mt-6">
              <div class="sm:w-[60%] w-full max-w-md">
                <TextInput
                  placeholder="username"
                  :auto-focus="true"
                  input-type="text"
                  v-model:input="username"
                  max="30"
                />
                <p class="text-[11px] text-gray-400 mt-4">
                  Nombres de usuario solo pueden contener letras, numeros ,
                  guiones bajos y puntos.<br />
                  cambiar tu nombre de usuario también cambiará el link de tu
                  perfil.
                </p>
              </div>
            </div>
          </div>

          <div
            id="BioSection"
            class="flex flex-col sm:h[120px] px-1.5 py-2 mt-2 w-full"
          >
            <span
              class="font-semibold text[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center"
            >
              Biografía
            </span>

            <div class="flex items-center justify-center sm:-mt-6">
              <div class="sm:w-[60%] w-full max-w-[md]">
                <textarea
                  cols="30"
                  rows="4"
                  v-model="userBio"
                  maxlength="80"
                  placeholder="hola"
                  class="resize-none w-full bg-[#F1F1F2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
                ></textarea>

                <div v-if="userBio" class="text-[11px] text-gray-500">
                  {{ userBio.length }}/80
                </div>
              </div>
            </div>
          </div>
        </section>
        <section v-else class="w-full h-[430px]">
          <!-- <Crooper
            class="h-[430px]"
            ref="crooper"
            :stencil-component="CircleStencil"
            :src="uploadedImage"
          /> -->

          <!-- ref="crooper"
          :stencil-component="CircleStencil" :src="uploadedImage" " /> -->

          <cropper
            class="h-[430px]"
            :src="uploadedImage"
            :stencil-component="CircleStencil"
            ref="crooper"
          />
        </section>
      </div>

      <section
        id="ButtonSection"
        class="absolute p-5 bottom-0 border-t border-t-gray-300 w-full"
      >
        <div
          v-if="!uploadedImage"
          id="UpdateInfoButtons"
          class="flex items-center justify-end"
        >
          <button
            @click="$generalStore.isEditProfileOpen = false"
            class="flex items-center border px-3 py-[6px] hover:bg-gray-100 rounded-md"
          >
            <span class="text-[15px] px-2 font-medium">Cancelar</span>
          </button>

          <button
            :disabled="!isUpdated"
            @click="updateUserInfo()"
            class="flex items-center bg-[#f02c56] text-white border ml-3 px-3 py-[6px] rounded-md"
            :class="!isUpdated ? 'bg-gray-200' : 'bg-[#F02C56]'"
          >
            <span class="text-[15px] px-2 font-medium">Aplicar</span>
          </button>
        </div>

        <div v-else id="CropperButtons" class="flex items-center justify-end">
          <button
            @click="uploadedImage = null"
            class="flex items-center border px-3 py-[6px] hover:bg-gray-100 rounded-md"
          >
            <span class="text-[15px] px-2 font-medium">Cancelar</span>
          </button>

          <button
            @click="cropAndUpdateImage()"
            class="flex items-center bg-[#f02c56] text-white border ml-3 px-3 py-[6px] rounded-md"
          >
            <span class="text-[15px] px-2 font-medium">Aplicar</span>
          </button>
        </div>
      </section>
    </section>
  </main>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

let uploadedImage = ref(null);
let userBio = ref(null);
let userImage = ref(null);
let isUpdated = ref(false);
let file = ref(null);
let username = ref(null);
let crooper = ref(null);
let UploadedImage = ref(null);

const { $generalStore, $userStore, $profileStore } = useNuxtApp();

const { name, bio, image } = storeToRefs($profileStore);

const route = useRoute();

onMounted(() => {
  username.value = name.value;
  userBio.value = bio.value;
  userImage.value = image.value;
});

watch(
  () => username.value,
  () => {
    if (!username.value || username.value === name.value)
      isUpdated.value = false;
    else isUpdated.value = true;
  }
);

watch(
  () => userBio.value,
  () => {
    if (!username.value || userBio.value === bio.value) {
      isUpdated.value = false;
    } else {
      isUpdated.value = true;
    }
  }
);
const getUploadedImage = (e) => {
  file.value = e.target.files[0];
  uploadedImage.value = URL.createObjectURL(file.value);
};

const cropAndUpdateImage = async () => {
  const { coordinates } = crooper.value.getResult();

  let data = new FormData();

  data.append("image", file.value || "");
  data.append("height", coordinates.height || "");
  data.append("width", coordinates.width || "");
  data.append("left", coordinates.left || "");
  data.append("top", coordinates.top || "");

  try {
    await $userStore.updateUserImage(data);
    await $userStore.getUser();
    await $profileStore.getProfile(route.params.id);
    await $generalStore.updateSideMenuImage(
      $generalStore.suggested,
      $userStore
    );
    await $generalStore.updateSideMenuImage(
      $generalStore.following,
      $userStore
    );

    userImage.value = image.value;
    uploadedImage.value = null;
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async () => {
  try {
    await $userStore.updateUser(username.value, userBio.value);
    await $userStore.getUser();
    await $profileStore.getProfile(route.params.id);

    username.value = name.value;
    userBio.value = bio.value;

    $generalStore.isEditProfileOpen = false;
  } catch (error) {
    console.log(error);
  }
};
</script>
