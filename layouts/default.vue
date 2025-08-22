<template>
  <div class="p-5 flex gap-5 bg-black h-screen">
    <div class="min-w-75 flex flex-col gap-5 text-secondary relative">
      <navigation-menu />
      <div class="w-12 flex flex-col gap-3 absolute bottom-0 left-0">
        <div
          class="w-12 h-12 rounded-full bg-linear flex justify-center items-center cursor-pointer"
        >
          <icons-chat />
        </div>
        <div class="rounded-full bg-linear flex flex-col items-center p-1.5">
          <div
            class="w-9 h-9 rounded-full bg-[#363636] flex items-center justify-center cursor-pointer"
          >
            <icons-night-mode />
          </div>
          <div class="w-9 h-9 flex items-center justify-center cursor-pointer">
            <icons-light-mode />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-5 w-full">
      <layout-header />
      <div class="flex-1 overflow-y-auto custom-scroll">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.bg-linear {
  background: linear-gradient(#2a2a2a, #202020);
}
</style>
