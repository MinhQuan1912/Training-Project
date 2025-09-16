<template>
  <div class="p-1.5 lg:p-3 flex justify-between items-center h-18 @container">
    <div class="flex items-center">
      <div
        class="text-xl lg:text-2xl font-medium leading-[145%] text-primary pl-2.5 lg:pl-5 pr-3 lg:pr-6 whitespace-nowrap"
      >
        8 new comments
      </div>
      <div class="hidden @xs:flex">
        <SearchData :placeholder="placeholder" v-model="searchComment" />
      </div>
    </div>

    <div class="hidden md:block">
      <select-dropdown
        v-model:selected-option="selectedOption"
        :data="options"
        addition-class="w-40 h-12 border-[1.5px] border-stroke"
        text-class="text-secondary hover:text-primary/80"
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

const options = ref(["Option 1", "Option 2"]);

const selectedOption = ref(options.value[0]);
</script>

<style lang="scss" scoped></style>
