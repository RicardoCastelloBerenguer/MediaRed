<template>
  <div id="TopNav"
  class="fixed bg-white z-40 flex items-center w-full border-b border-gray-100 h-[61px]"
  >

    <div
     :class="route.fullPath === '/' ? 'w-full' : '' "
     class="flex items-center justify-between w-full px-6"
    >

      <div :class="route.fullPath === '/' ? 'w-[100%]' : 'lg-w[20%] w-[70%]'">
        <NuxtLink to="/" class="flex flex-grow basis-0 items-center gap-4">
          <img src="/images/logo-red.png" width="60" class="transition-all duration-1000 transform hover:rotate-10 origin-right">
          <h2 class="text-[21px] font-mono" >media <span class="ml-[-10px] text-red-600">Red</span></h2>
        </NuxtLink>
      </div>

      <div class="hidden md:flex items-center bg-[#F1F1F2] p-1 rounded-full max-w-[580px] w-full">
        <input
            type="text"
            name=""
            id=""
            class="w-full pl-3 my-2 bg-transparent placeholder-[#838383] tex-[15px] focus:outline-none"
            placeholder="Buscar cuentas..."
        >
        <div class="px-3 py-1 flex items-center border-l border-l-gray-300 ">
          <Icon name="ri:search-line" color="#A1A2A7" size="27" ></Icon>
        </div>
      </div>

      <div class="flex items-center justify-end w-full gap-2">
        <NuxtLink to="/cargar" class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-gray-100">
          <Icon name="mdi:plus" size="22"></Icon>
          <span class="px-2 font-medium text-[15px]">Cargar</span>
        </NuxtLink>
        <button v-if="false" class="flex items-center bg-[#F02C56] text-white border rounded-lg px-3 py-[6px] ml-3">
          <span class="mx-3 font-medium text-[15px]">Log in</span>
        </button>

        <!--
        <button class="flex items-center">
          <Icon name="pepicons-pencil:dots-y" size="30"></Icon>
        </button>
        !-->

        <div class="flex items-center">
          <Icon class="ml-1 mr-4" name="carbon:send-alt" color="#161724" size="30"></Icon>
          <Icon class="ml-1 mr-4" name="bx:message-detail" color="#161724" size="27"></Icon>
          <div class="relative">
            <button @click="showMenu=!showMenu" class="mt-1">
              <img class="rounded-full" width="33" src="https:picsum.photos/id/13/300/320" alt="">
            </button>

            <div v-if="showMenu"
            class="absolute bg-white rounded-lg py-1.5 w-[200px] shadow-xl border top-[43px] -right-2"
            id="popup-menu"
            >
              <NuxtLink @click="showMenu=false" to="/perfil/1" class="flex items-center justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer">
                <Icon name="ph:user" size="20"></Icon>
                <span class="pl-2 font-semibold text-sm">Perfil</span>
              </NuxtLink>

              <div class="flex items-center justify-start py-3 px-2 hover:bg-gray-100 border-t border-gray-100 cursor-pointer">
                <Icon name="ic:outline-login" size="20"></Icon>
                <span class="pl-2 font-semibold text-sm">Cerrar sesión</span>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>

const route = useRoute()

let showMenu = ref(false)

</script>
