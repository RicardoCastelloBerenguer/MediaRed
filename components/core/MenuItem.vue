<template>
  <div class="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md cursor-pointer">
    <div class="flex items-center lg:mx-0 mx-auto">

      <Icon :name="icon" :color="colorIcon" :size="sizeIconString" ></Icon>
      <span
          :class="`text-${colorIcon}`"
          class="lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px]"
      >
        {{iconString}}
      </span>

    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  'icon' : String,
  'iconString' : String,
  'colorString' : String,
  'colorIcon' : String,
  'sizeIconString' : String
})

const {icon , iconString , colorIcon , colorString , sizeIconString} = toRefs(props)

</script>
