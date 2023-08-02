<template>
  <div>
    <NuxtLayout>
      <NuxtPage />

      <auth-overlay v-model:showAuthOverlay="showAuth" v-if="showAuth" />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
let showAuth = ref(true);

watch(
  () => showAuth.value,
  () => {
    console.log(showAuth.value);
  }
);

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
