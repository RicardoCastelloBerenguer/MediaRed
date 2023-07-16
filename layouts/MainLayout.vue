<template>

  <!--  Top Navbar  !-->

  <TopNav/>

  <!--  SideBar  !-->

  <div :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''">
    <SideNav/>
  </div>

  <slot/>

  <!--  Main Content  !-->

</template>

<script setup>

import PostMain from "~/components/core/PostMain.vue";

const route = useRoute()

</script>
