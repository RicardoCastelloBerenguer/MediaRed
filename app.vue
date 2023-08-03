<template>
  <div>
    <NuxtLayout>
      <NuxtPage />

      <AuthOverlay v-if="$generalStore.isLoginOpen" />
      <EditProfileOverlay v-if="$generalStore.isEditProfileOpen" />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";

const { $generalStore } = useNuxtApp();
const { isLoginOpen } = storeToRefs($generalStore);

// let showAuth = ref(true);

// watch(
//   () => showAuth.value,
//   () => {
//     console.log(showAuth.value);
//   }
// );

useHead({
  title: "mediaRed",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/images/logo-red.png",
    },
  ],
});
</script>
