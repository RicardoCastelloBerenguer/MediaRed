<template>
  <section>
    <span class="text-center text-[28px] mb-4 font-bold block">Log in</span>
    <span class="px-6 pb-1.5 text-[15px] block">Email address</span>
    <div class="px-6 pb-2 text-[15px]">
      <text-input
        placeholder="Email address"
        input-type="email"
        :auto-focus="true"
        :error="errors && errors.email ? errors.email[0] : ''"
        v-model:input="email"
      />
      <text-input
        placeholder="Password"
        input-type="password"
        error=""
        v-model:input="password"
      />

      <span class="px-6 text-[12px] text-gray-600 cursor-pointer">
        Forgot password?
      </span>
      <div class="px-6 pb-2 mt-6">
        <button
          :disabled="!email || !password"
          :class="!email || !password ? 'bg-gray-200' : 'bg-[#f02c56]'"
          @click="login()"
          class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
        >
          <span v-if="loadedLogin">Login</span>
          <Icon
            v-else
            name="mingcute:loading-line"
            size="30"
            color="#FFFFFF"
            class="animate-spin ml-1 w-full"
          />
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
const { $userStore, $generalStore } = useNuxtApp();

let email = ref(null);
let password = ref(null);
let errors = ref(null);
let loadedLogin = ref(true);

watch(
  () => email.value,
  () => {
    //console.log(email.value);
  }
);

const login = async () => {
  try {
    loadedLogin.value = false;
    errors.value = null;

    await $userStore.getTokens();
    await $userStore.login(email.value, password.value);
    await $userStore.getUser();

    loadedLogin.value = true;

    $generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
    loadedLogin.value = true;
    errors.value = error.response.data.errors;
  }
};
</script>
