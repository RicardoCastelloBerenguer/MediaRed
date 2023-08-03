<template>
  <MainLayout class="">
    <div
      class="pt-[80px] w-[calc(100%-90px)] absolute left-[calc(95px)] lg:left-[calc(220px+80px)] min-w-[700px]"
    >
      <PostMain username="bambelbi" name="Garsilaso de la vega" />
      <PostMain username="Maggie" name="La mama de la mama" />
      <PostMain username="GeraldTheNoRivia" name="Henry Cavill" />
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/MainLayout.vue";
import PostMain from "~/components/core/PostMain.vue";
</script>

<style scoped></style>
