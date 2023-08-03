<template>
  <div class="w-100 relative flex justify-center">

    <span
        class="absolute top-6 mx-auto z-50 bg-black bg-opacity-70 text-white px-14 py-3 rounded-sm"
        :class="errorType ? 'visible' : 'hidden'">
    {{error}}
    </span>

  </div>
</template>

<script setup>

const props = defineProps({
  'errorType' : String
})

const {errorType}  = toRefs(props)


let error = ref('')

watch(() => errorType.value , () => {
  if(errorType.value === 'caption') error.value = 'Máximo 150 caracteres'
  else if(errorType.value === 'bio') error.value = 'Máximo 80 caracteres'
  else if(errorType.value === 'file') error.value = 'Tipo de archivo incorrecto. Por favor usa .mp4 o .webM'
  else error.value = ''
})

</script>

<style lang="scss" scoped>

</style>