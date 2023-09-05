<template>
  <div class="flex items-center relative w-full">
    <nuxt-link to="/">
      <img
        src="https:picsum.photos/300/320"
        width="40"
        class="absolute top-0 rounded-full lg:mx-0 mx-auto"
        alt=""
      />
    </nuxt-link>

    <div class="ml-14 pt-0.5 w-full">
      <div class="text-[18px] font-semibold flex items-center justify-between">
        <span>Username</span>

        <Icon
          v-if="true"
          @click="deleteComment()"
          name="material-symbols:delete-outline-sharp"
          size="25"
          class="cursor-pointer"
        />
      </div>

      <p class="text-[15px] font-light">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque saepe
        beatae illum eius, deserunt odio minima quod impedit veniam nesciunt
        maxime quae eligendi quo rerum dolorem? Ipsum eum doloribus
        consequuntur?
      </p>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped></style>
