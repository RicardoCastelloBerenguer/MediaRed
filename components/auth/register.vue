<template>
  <section>
    <span class="text-center text-[28px] mb-4 font-bold block">Sign up</span>

    <div class="px-6 pb-2 text-[15px]">
      <text-input
        placeholder="Full name"
        input-type="text"
        :auto-focus="true"
        :error="errors && errors.name ? errors.name[0] : ''"
        v-model:input="name"
      />
      <text-input
        placeholder="Email address"
        input-type="email"
        :auto-focus="false"
        :error="errors && errors.email ? errors.email[0] : ''"
        v-model:input="email"
      />

      <text-input
        placeholder="Password"
        input-type="password"
        :error="errors && errors.password ? errors.password[0] : ''"
        v-model:input="password"
      />

      <text-input
        placeholder="Confirm Password"
        input-type="password"
        :error="
          errors && errors.confirmPassword ? errors.confirmPassword[0] : ''
        "
        v-model:input="confirmPassword"
      />

      <span class="px-6 text-[12px] text-gray-600 cursor-pointer">
        Forgot password?
      </span>
      <div class="px-6 pb-2 mt-6">
        <button
          @click="register()"
          :disabled="!name || !email || !password || !confirmPassword"
          :class="
            !name || !email || !password || !confirmPassword
              ? 'bg-gray-200'
              : 'bg-[#f02c56]'
          "
          class="w-full text-[17px] font-semibold text-white py-3 rounded-sm"
        >
          Sign up
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
const { $userStore, $generalStore } = useNuxtApp();

let name = ref(null);
let email = ref(null);
let password = ref(null);
let confirmPassword = ref(null);
let errors = ref(null);

const register = async () => {
  try {
    await $userStore.getTokens();

    await $userStore.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    await $userStore.getUser();

    $generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
