<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <auth-overlay />
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
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
