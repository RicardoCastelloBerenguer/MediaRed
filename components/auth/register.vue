<template>
  <section>
    <span class="text-center text-[28px] mb-4 font-bold block">Sign up</span>

    <div class="px-6 pb-2 text-[15px]">
      <text-input
        placeholder="Nombre"
        input-type="text"
        :auto-focus="true"
        :error="errors && errors.name ? errors.name[0] : ''"
        v-model:input="name"
      />
      <text-input
        placeholder="Correo electrónico"
        input-type="email"
        :auto-focus="false"
        :error="errors && errors.email ? errors.email[0] : ''"
        v-model:input="email"
      />

      <text-input
        placeholder="Contraseña"
        input-type="password"
        :error="errors && errors.password ? errors.password[0] : ''"
        v-model:input="password"
      />

      <text-input
        placeholder="Confirmar contraseña"
        input-type="password"
        :error="
          errors && errors.confirmPassword ? errors.confirmPassword[0] : ''
        "
        v-model:input="confirmPassword"
      />

      <span class="px-6 text-[12px] text-gray-600 cursor-pointer">
        Te has olvidado la contraseña?
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
          <span v-if="loadedRegister">Registrarse</span>
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

let name = ref(null);
let email = ref(null);
let password = ref(null);
let confirmPassword = ref(null);
let errors = ref(null);
let loadedRegister = ref(true);

const register = async () => {
  try {
    loadedRegister.value = false;
    await $userStore.getTokens();

    await $userStore.register(
      name.value,
      email.value,
      password.value,
      confirmPassword.value
    );
    await $userStore.getUser();

    loadedRegister.value = true;

    $generalStore.isLoginOpen = false;
  } catch (error) {
    console.log(error);
    loadedRegister.value = true;
    errors.value = error.response.data.errors;
  }
};
</script>
