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
        <span class="text-[22px] font-medium block">Edit Profile</span>
        <button @click="$generalStore.isEditProfileOpen = false" class="">
          <Icon name="mdi:close" size="25" />
        </button>
      </div>
    </section>
  </main>
</template>
<script setup>
let uploadedImage = ref(null);

const { $generalStore } = useNuxtApp();
</script>
