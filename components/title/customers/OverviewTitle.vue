<template>
  <div class="container">
    <div class="flex w-full items-center justify-between @container">
      <div class="text-xl font-semibold leading-[145%] text-primary sm:px-5">
        Overview
      </div>

      <div class="flex gap-3">
        <div
          class="p-3 border-[1.5px] border-solid border-stroke group hover:border-primary/80 rounded-full hidden @xs:block cursor-pointer"
        >
          <icons-calendar />
        </div>

        <div class="hidden @sm:block">
          <select-dropdown
            v-model:selected-option="selectedOption"
            :data="options"
            addition-class="w-40 h-12 border-[1.5px] border-stroke hover:border-primary/80"
            text-class="text-secondary hover:text-primary/80"
            option-class="!top-[calc(100%+8px)] !border-[1.5px] !border-stroke !rounded-xl overflow-hidden"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const options = ref(["Option 1", "Option 2"]);

const selectedOption = ref(options.value[0]);
</script>

<style lang="scss" scoped></style>
