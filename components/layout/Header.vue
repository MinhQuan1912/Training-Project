<template>
  <div
    class="fixed top-0 right-3 left-3 md:right-5 md:left-5 lg:left-22 2xl:left-85 z-10 bg-black flex gap-4 justify-between items-center py-3 lg:py-5">
    <div class="flex justify-between w-full items-center">
      <h4 class="text-2xl lg:text-[32px] font-semibold text-primary leading-[145%]">
        <span v-if="!showCreateProduct">{{ pageTitle }}</span>
        <span v-else>New product</span>
      </h4>
      <div v-if="showCreateProduct" class="hidden m:flex gap-3 items-center">
        <button @click="saveDraft"
          class="h-9 lg:h-12 py-3.5 px-7 flex justify-center items-center rounded-full text-[15px] leading-6 text-secondary font-semibold bg-background-02 cursor-pointer">Save
          draft</button>
        <select-dropdown :data="selectList" v-model:selected-option="selectedOpt" addition-class="addition !h-9 lg:!h-12"
          text-class=" font-semibold" />
      </div>
    </div>
    <div v-if="!showCreateProduct" class="hidden lg:flex justify-evenly items-center h-12 gap-2 xl:gap-3">
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
          <img src="/images/avatar.png" class="w-full h-full object-contain" />
        </div>
      </div>
    </div>
    <button
      class="min-w-9 h-9 lg:min-w-12 lg:h-12 flex lg:hidden justify-center items-center text-white cursor-pointer bg-background-02 rounded-xl hover:bg-white hover:text-black transition-colors duration-200 ease"
      @click="openSideBar">
      <icons-menu-header />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCreateProduct } from '~/composable/useCreateProduct';
import { useSideBar } from '~/composable/useSideBar';
const route = useRoute();
const router = useRouter()

const pageTitle = computed(() => {
  return route.meta.title;
});
const { showCreateProduct } = useCreateProduct()
const { previousRoute } = useCreateProduct()
const { showSideBar } = useSideBar()
const selectList = ref([
  'Publish now',
  '1',
  '2',
  '3'
])
const selectedOpt = ref(selectList.value[0])
const toCreateProduct = () => {
  previousRoute.value = route.path
  router.push('/product')
  showCreateProduct.value = true

}
const openSideBar = () => {
  showSideBar.value = true
}
const saveDraft = () => {
  if (previousRoute.value && previousRoute.value !== '/product') {
    router.push(previousRoute.value)
  }
  else {
    router.push('/product')
    showCreateProduct.value = false
  }
}
watch(
  () => route.fullPath,
  () => {
    if (route.path !== '/product') {
      showCreateProduct.value = false
    }
  }
)
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

.addition {
  height: 48px;
  border-radius: 32px !important;
  padding: 12px;
  padding-left: 28px;
  border-width: 1.5px;
  background: linear-gradient(180deg, #FDFDFD 0%, #DEDEDE 100%) !important;
  border-image-source: linear-gradient(158.39deg,
      rgba(255, 255, 255, 0.55) 14.19%,
      rgba(255, 255, 255, 0.0001) 35.83%,
      rgba(255, 255, 255, 0.0001) 64.26%,
      rgba(255, 255, 255, 0.25) 85.81%);
  box-shadow: 2px 0px 8px 2px #18181833 inset;
  min-width: 155px;
  color: var(--color-light)
}
</style>
