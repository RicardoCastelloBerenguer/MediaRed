<template>
  <main
    id="AuthOverlay"
    class="fixed flex items-center justify-center z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50"
  >
    <section
      class="relative bg-white w-full max-w-[470px] h-[70%] p-4 rounded-lg"
    >
      <div class="w-full flex justify-end">
        <button
          @click="showAuthOverlayComputed = false"
          class="p-1.5 rounded-full bg-gray-100"
        >
          <Icon name="mdi:close" size="26" color="" class="" />
        </button>
      </div>

      <div
        class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t w-full"
      >
        <span class="text-[14px] text-gray-600 mr-2"
          >You don't have an account?</span
        >
        <button
          @click="isRegister = !isRegister"
          class="text-[14px] text-[#f02c56] font-semibold pl-1"
        >
          <span v-if="!isRegister">Sign up</span>
          <span v-else>Log in</span>
        </button>
      </div>
      <register v-if="isRegister" />
      <login v-else />
    </section>
  </main>
</template>

<script setup>
import register from "~/components/auth/register.vue";
import login from "~/components/auth/login.vue";

const emit = defineEmits(["update:showAuthOverlay"]);
const props = defineProps({ showAuthOverlay: Boolean });
const { showAuthOverlay } = toRefs(props);

let isRegister = ref(false);

const showAuthOverlayComputed = computed({
  get: () => showAuthOverlay.value,
  set: (val) => emit("update:showAuthOverlay", val),
});
</script>
