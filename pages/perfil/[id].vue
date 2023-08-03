<template>
  <MainLayout>
    <section
      class="pt-[90px] 2xl:pl-[185px] lg:pl-[185px] xs:pl-[75px] pl-[220px] lg:pr-0 pr-2 w-[calc(100%-90px)] max-w-[1800px] mx-auto"
    >
      <div class="flex w-[calc(100vw-230px)]">
        <img
          class="max-w-[120px] max-h-[120px] rounded-full"
          src="https:picsum.photos/300/320"
          alt=""
        />

        <div class="ml-5 w-full">
          <span class="text-[30px] font-bold truncate w-[300px] block">
            Nombre usuario
          </span>
          <span class="text-[18px] truncate block">Nombre usuario</span>

          <button
            v-if="true"
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
          <span class="font-bold">7M</span> Me gusta</span
        >
      </div>

      <p
        class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet,
        consequatur consequuntur corporis, deleniti dicta enim ex illum
        laboriosam natus necessitatibus odio omnis possimus rerum sit voluptate
        voluptates! Eaque, quibusdam.
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

      <div
        class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3"
      >
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
</script>

<style lang="scss" scoped></style>
