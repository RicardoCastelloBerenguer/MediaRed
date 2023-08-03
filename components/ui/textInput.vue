<template>
  <section class="mb-2">
    <input
      :type="inputType"
      class="block w-full bg-[#f1f1f2] text-gray-800 border border-gray-300 rounded-md py-2.5 px-3 focus:outline-none"
      :id="`input-${placeholder}`"
      :placeholder="placeholder"
      autocomplete="off"
      :maxlength="maxlength"
      v-model="inputComputed"
    />

    <span class="text-red-500 text-[14px] font-semibold" v-if="error">{{
      error
    }}</span>
  </section>
</template>
<script setup>
const props = defineProps({
  input: String,
  autoFocus: Boolean,
  error: String,
  placeholder: String,
  inputType: {
    type: String,
    default: "text",
  },
  maxlength: {
    type: Number,
    default: 30,
  },
});

const emit = defineEmits(["update:input"]);

const { input, autoFocus, error, placeholder, inputType, maxlength } =
  toRefs(props);

onMounted(() => {
  if (autoFocus.value) {
    document.getElementById(`input-${placeholder.value}`).focus;
  }
});

const inputComputed = computed({
  get: () => input.value,
  set: (val) => emit("update:input", val),
});
</script>
