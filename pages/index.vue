<template>
  <MainLayout>
    <div
      class="pt-[80px] w-[calc(100%-90px)] absolute left-[calc(95px)] lg:left-[calc(220px+80px)] min-w-[700px]"
    >
      <PostMain
        v-if="$generalStore.posts"
        v-for="post in $generalStore.posts"
        :post="post"
      />
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import PostMain from "~/components/core/PostMain.vue";

const { $generalStore } = useNuxtApp();

onMounted(async () => {
  try {
    await $generalStore.getAllPosts();
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped></style>
