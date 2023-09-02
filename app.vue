<template>
  <div>
    <NuxtLayout>
      <NuxtPage />

      <AuthOverlay v-if="isLoginOpen" />
      <EditProfileOverlay v-if="isEditProfileOpen" />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { userInfo } from "os";
import { storeToRefs } from "pinia";

const { $generalStore, $userStore } = useNuxtApp();
const { isLoginOpen, isEditProfileOpen } = storeToRefs($generalStore);

onMounted(async () => {
  $generalStore.bodySwitch(false);

  if (!$userStore.id) isLoginOpen.value = true;
  else isLoginOpen.value = false;
  isEditProfileOpen.value = false;

  try {
    await $generalStore.hasSessionExpired();
    await $generalStore.getRandomUsers("suggested");
    await $generalStore.getRandomUsers("following");

    if ($userStore.id) $userStore.getUser();
  } catch (error) {
    console.log(error);
  }
});

watch(
  () => isLoginOpen.value,
  (val) => {
    $generalStore.bodySwitch(val);
  }
);

watch(
  () => isEditProfileOpen.value,
  (val) => {
    $generalStore.bodySwitch(val);
  }
);

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
