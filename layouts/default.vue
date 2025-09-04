<template>
  <div class="p-3 md:p-5 flex lg:gap-5 bg-black min-h-screen relative">
    <transition name="fade" >
      <div v-if="showSideBar" class="fixed inset-0 bg-white opacity-40 z-15"></div>
    </transition>
    <div class="w-0 lg:w-12 2xl:!w-75 flex flex-col gap-5 text-secondary fixed overflow-hidden lg:overflow-visible min-h-screen z-20">
      <navigation-menu />
      <div class="w-12 flex flex-col gap-3 absolute bottom-10 left-0">
        <div class="w-12 h-12 rounded-full bg-linear flex justify-center items-center cursor-pointer">
          <icons-chat />
        </div>
        <div class="rounded-full bg-linear flex flex-col items-center p-1.5">
          <div class="w-9 h-9 rounded-full bg-[#363636] flex items-center justify-center cursor-pointer">
            <icons-night-mode />
          </div>
          <div class="w-9 h-9 flex items-center justify-center cursor-pointer">
            <icons-light-mode />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-3 md:gap-5 w-[calc(100%-340px)] flex-1 lg:ml-17 2xl:ml-80">
      
        <layout-header />
      
      <div class="flex-1 min-w-0 mt-17">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSideBar } from '~/composable/useSideBar';

const {showSideBar} = useSideBar()
</script>
<style lang="scss" scoped>
.bg-linear {
  background: linear-gradient(#2a2a2a, #202020);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
