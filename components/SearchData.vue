<template>
  <div
    class="flex bg-background-surface1 border-[1.5px] border-stroke-subtle w-30 lg:w-70 rounded-full p-3 pr-5 gap-2 text-secondary"
  >
    <icons-search />
    <input
      type="search"
      :placeholder="placeholder"
      class="text-sm leading-[150%] w-full"
      :value="modelValue"
      @keyup.enter="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped></style>
