<template>
  <div class="container">
    <div class="p-3 flex justify-between items-center h-18">
      <div class="flex items-center">
        <div
          class="text-xl lg:text-2xl font-medium leading-[145%] text-primary pl-5 pr-6"
        >
          8 new comments
        </div>
        <div
          class="flex bg-background-surface1 border-[1.5px] border-stroke-subtle w-70 rounded-full p-3 pr-5 gap-2 text-secondary"
        >
          <icons-search />
          <input
            type="text"
            placeholder="Search products"
            class="text-sm leading-[150%] w-full"
          />
        </div>
      </div>

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

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
