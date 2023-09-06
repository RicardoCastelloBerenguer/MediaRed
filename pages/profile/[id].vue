<template>
  <MainLayout>
    <section
      v-if="$profileStore.name"
      class="pt-[90px] 2xl:pl-[185px] lg:pl-[185px] xs:pl-[75px] pl-[220px] lg:pr-0 pr-2 w-[calc(100%-90px)] max-w-[1800px] mx-auto"
    >
      <div class="flex w-[calc(100vw-230px)]">
        <img
          class="max-w-[120px] max-h-[120px] rounded-full"
          :src="$profileStore.image"
          alt=""
        />

        <div class="ml-5 w-full">
          <span class="text-[30px] font-bold truncate w-[300px] block">
            {{ $generalStore.allLowerCaseNoCaps($profileStore.name) }}
          </span>
          <span class="text-[18px] truncate block">
            {{ $profileStore.name }}</span
          >

          <button
            @click="$generalStore.isEditProfileOpen = true"
            v-if="$profileStore.id === $userStore.id"
            class="flex items-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
          >
            <Icon name="mdi:pencil" class="mt-0.5 mr-1" size="18" />
            <span>Editar perfil</span>
          </button>

          <button
            v-else-if="false"
            class="flex items-center rounded-md text-center bg-[#fe2c55] hover:bg-[#e3274b] px-8 py-1.5 mt-3 text-[15px] font-semibold text-white"
          >
            Seguir
          </button>

          <button
            v-else-if="false"
            class="flex items-center rounded-md text-center hover:bg-[#ffeef2] px-8 py-1.5 mt-3 text-[15px] font-semibold text-[#fe2c55] border border-[#fe2c55] bg-white"
          >
            Mensajes
          </button>
        </div>
      </div>

      <div class="flex items-center w-full gap-3 mt-4">
        <span class="text-[15px] pl-1.5 font-light text-gray-500"
          ><span class="font-bold">90</span> Siguiendo</span
        >
        <span class="text-[15px] pl-1.5 font-light text-gray-500"
          ><span class="font-bold">121.2 K</span> Seguidores</span
        >
        <span class="text-[15px] pl-1.5 font-light text-gray-500">
          <span class="font-bold">{{ $profileStore.allLikes }}</span> Me
          gusta</span
        >
      </div>

      <p
        class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]"
      >
        {{ $profileStore.bio }}
      </p>

      <div class="w-full flex items-center pt-4 border-b">
        <span
          class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black"
          >Videos</span
        >
        <div
          class="w-60 text-center text-gray-500 py-2 text-[17px] font-semibold"
        >
          <Icon name="material-symbols:lock-open" class="mb-0.5" />
          <span>Favoritos</span>
        </div>
        <div
          class="w-60 text-center text-gray-500 py-2 text-[17px] font-semibold"
        >
          <Icon name="material-symbols:lock-open" class="mb-0.5" />
          <span>Me gusta</span>
        </div>
      </div>

      <section
        class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
      >
        <div v-if="show" v-for="post in $profileStore.posts">
          <UserPost :post="post" />
        </div>
      </section>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import { storeToRefs } from "pinia";

const { $userStore, $profileStore, $generalStore } = useNuxtApp();
const { posts } = storeToRefs($profileStore);
const route = useRoute();

let show = ref(false);

onMounted(async () => {
  try {
    await $profileStore.getProfile(route.params.id);
  } catch (error) {
    console.log(error);
  }
}),
  watch(
    () => posts.value,
    () => {
      setTimeout(() => {
        show.value = true;
      }, 150);
    }
  );
</script>

<style lang="scss" scoped></style>
