<template>
  <div class="flex gap-4 justify-between">
    <h4 class="text-[32px] font-semibold text-primary leading-[145%]">
      <span v-if="!showCreateProduct">{{ pageTitle }}</span>
      <span v-else>New product</span>
    </h4>
    <div v-if="showCreateProduct" class="flex gap-3">
      <button @click="showCreateProduct = false"
        class="h-12 py-3.5 px-7 flex justify-center items-center rounded-full text-[15px] leading-6 text-secondary font-semibold bg-background-02 cursor-pointer">Save
        draft</button>
      <products-create-product-selection-button />
    </div>
    <div v-else class="hidden lg:flex justify-evenly items-center h-12 gap-2 xl:gap-3">
      <div class="w-78.75 rounded-full bg-background-02 hidden lg:flex items-center text-secondary">
        <div class="p-3 pr-2">
          <icons-search />
        </div>
        <input type="text" placeholder="Search anything... " />
      </div>
      <button class="create-button" @click="toCreateProduct">
        <p class="text-sm font-semibold leading-[100%]">Create</p>
      </button>
      <div class="header-button">
        <icons-bell />
      </div>
      <div class="header-button">
        <icons-bell />
      </div>
      <div class="header-button">
        <div class="w-10 h-10">
          <img src="/images/avatar.png" class="w-full h-full object-contain" alt="" />
        </div>
      </div>
    </div>
    <button
      class="w-12 h-12 flex lg:hidden justify-center items-center text-white cursor-pointer bg-background-02 rounded-xl hover:bg-white hover:text-black transition-colors duration-200 ease"
      @click="openSideBar">
      <icons-menu-header />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCreateProduct } from '~/composable/useCreateProduct';
import { useSideBar } from '~/composable/useSideBar';
const route = useRoute();
const pageTitle = computed(() => {
  return route.meta.title;
});
const { showCreateProduct } = useCreateProduct()
const { showSideBar } = useSideBar()
const toCreateProduct = () => {
  showCreateProduct.value = true
  navigateTo('/product')
}
const openSideBar = () => {
  showSideBar.value = true
}
</script>

<style lang="scss" scoped>
.create-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  border-radius: 32px;
  background: linear-gradient(#fdfdfd, #dedede);
  height: 48px;
  cursor: pointer;
}

.header-button {
  background: linear-gradient(#2a2a2a, #202020);
  width: 48px;
  height: 48px;
  color: var(--color-secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
}
</style>
