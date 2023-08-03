<template>
  <nuxt-link
    to="/perfil/1"
    class="flex items-center hover:bg-gray-200 rounded-md py-1.5 px-2 cursor-pointer"
  >
    <img
      class="rounded-full lg:mx-0 mx-auto"
      width="35"
      src="https:picsum.photos/id/83/300/320"
      alt=""
    />

    <div class="lg:pl-2.5 lg:block hidden">
      <div class="flex items-center">
        <span class="font-semibold">{{ name }}</span>
        <Icon
          v-if="verified"
          class="relative ml-1"
          name="ic:baseline-verified"
          color="#58D5EC"
          size="20"
        ></Icon>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
const props = defineProps({
  name: String,
  verified: {
    Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
