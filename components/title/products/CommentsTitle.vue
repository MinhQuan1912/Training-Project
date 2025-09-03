<template>
  <div class="p-3 flex justify-between items-center h-18">
    <div class="flex items-center">
      <div
        class="text-xl lg:text-2xl font-medium leading-[145%] text-primary pl-5 pr-6"
      >
        8 new comments
      </div>
      <SearchData :placeholder="placeholder" v-model="searchComment" />
    </div>

    <div class="hidden md:block">
      <select-dropdown
        v-model:selected-option="selectedOption"
        :data="options"
        addition-class="w-40 h-12 border-[1.5px] border-stroke"
        text-class="text-secondary"
        option-class="!top-[calc(100%+8px)] !border-[1.5px] !border-stroke !rounded-xl overflow-hidden"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from "vue";

const placeholder = ref("Search comments");

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

// Sử dụng computed property để đồng bộ giá trị với v-model
const searchComment = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

<style lang="scss" scoped></style>
