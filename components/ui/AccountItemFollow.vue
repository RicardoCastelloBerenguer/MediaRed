<template>
  <nuxt-link
    :to="`/profile/${user.id}`"
    class="flex items-center hover:bg-gray-200 rounded-md py-1.5 px-2 cursor-pointer"
  >
    <img
      v-if="user.image"
      class="rounded-full lg:mx-0 mx-auto"
      width="35"
      :src="user.image"
      alt=""
    />

    <div class="lg:pl-2.5 lg:block hidden">
      <div class="flex items-center">
        <span class="font-semibold">{{ user.name }}</span>
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
const { $generalStore } = useNuxtApp();

const props = defineProps({
  user: {
    Object,
    required: true,
  },
  verified: {
    Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss" scoped></style>
