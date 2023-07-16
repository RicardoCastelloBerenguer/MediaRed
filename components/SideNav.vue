<template>
  <div id="SideNavMain"
  class="fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto"
  :class="route.fullPath === '/' ? 'lg:w-[220px]' : 'lg:w-[220px]' "
  >

    <div class="lg:w-full w-[55px] mx-auto" >


      <ul class="lg:ml-2 mt-2 pb-3 border-b border-gray-100">
        <li><NuxtLink to="/"><menu-item icon="ant-design:home-filled" icon-string="Para tí" colorIcon="#FE2C55" size-icon-string="22"></menu-item></NuxtLink></li>
        <li><menu-item icon="mdi:people" icon-string="Siguiendo" colorIcon="" size-icon-string="22"></menu-item></li>
        <li><menu-item icon="material-symbols:explore" icon-string="Explorar" colorIcon="" size-icon-string="22"></menu-item></li>
        <li><menu-item icon="ri:live-fill" icon-string="LIVE" colorIcon="" size-icon-string="22"></menu-item></li>
      </ul>

      <h2 class="lg:block hidden text-s text-gray-600 m-3 font-semibold pt-4 pb-2 px-2">Cuentas que sigues</h2>

      <ul class="m-2 border-b border-gray-100 pb-3">
        <li><AccountItemFollow name="Henry Cavill" verified="true" /></li>
        <button class="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[15px] font-semibold">Ver todas</button>
      </ul>


      <h2 class="lg:block hidden text-s text-gray-600 m-3 font-semibold pt-4 pb-2 px-2">Cuentas recomendadas</h2>

      <ul class="m-2 border-b border-gray-100 pb-3">
        <li><AccountItemFollow name="Henry Cavill" verified="true" /></li>
        <button class="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[15px] font-semibold">Ver más</button>
      </ul>

    </div>

  </div>
</template>

<script setup>

import MenuItem from "~/components/core/MenuItem.vue";
import AccountItemFollow from "~/components/core/AccountItemFollow.vue";

const route = useRoute();

</script>
