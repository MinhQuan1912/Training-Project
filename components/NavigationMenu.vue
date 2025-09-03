<template>
  <div class="w-12 h-12">
    <img src="/images/logo.png" class="w-full h-full object-contain" />
  </div>
  <ul class="flex flex-col text-sm font-semibold">
    <li v-for="(item, idx) in menu" :key="idx" class="cursor-pointer transition-all duration-300 ease relative">
      <div v-if="item.subMenu"
        class="flex items-center justify-between gap-3 px-3 2xl:px-0 p-3 transition-all duration-300 ease"
        @click="handleOpenSubmenu(idx)" :class="{
          'text-primary': isActive(item),
          'hover:text-primary': !isActive(item),
        }">
        <div class="flex items-center gap-3">
          <component :is="item.icon" class="w-6 h-6" />
          <span class="hidden 2xl:inline">{{ item.label }}</span>
        </div>
        <icons-arrow1 :class="[
          'transition-transform duration-300 ease hidden 2xl:block',
          openIndexs.includes(idx) ? '-rotate-180' : 'rotate-0',
        ]" />
      </div>
      <nuxt-link v-else :to="item.to"
        class="flex items-center gap-3 px-3 2xl:px-0 p-3 transition-all duration-300 ease rounded-xl" :class="{
          'text-primary': isActive(item),
          'hover:text-primary': !isActive(item),
        }">
        <component :is="item.icon" class="w-6 h-6" />
        <span class="hidden 2xl:inline">{{ item.label }}</span>
      </nuxt-link>
      <!-- Submenu -->
      <div class="hidden 2xl:block">
        <transition name="collapse">
          <div v-show="item.subMenu && openIndexs.includes(idx)" class="pl-9">
            <nuxt-link :to="drop.to" v-for="(drop, dropIdx) in item.subMenu" :key="dropIdx"
              class="h-11 px-3 flex items-center rounded-xl transition-all duration-300 ease" :class="{
                'text-primary bg-background-pop': isActive(drop),
                'hover:text-primary hover:bg-background-pop': !isActive(drop),
              }">
              <span>{{ drop.label }}</span>
            </nuxt-link>
          </div>
        </transition>
      </div>
      <div class="2xl:hidden">
        <transition name="slide">
          <div v-show="item.subMenu && openIndexs.includes(idx)"
            class="absolute z-3 top-0 left-[calc(100%+16px)] bg-background-surface1 rounded-2xl">
            <nuxt-link :to="drop.to" v-for="(drop, dropIdx) in item.subMenu" :key="dropIdx"
              class="h-11 px-3 flex items-center rounded-xl transition-all duration-300 ease" :class="{
                'text-primary bg-background-pop': isActive(drop),
                'hover:text-primary hover:bg-background-pop': !isActive(drop),
              }">
              <span class="w-25">{{ drop.label }}</span>
            </nuxt-link>
          </div>
        </transition>
      </div>
    </li>
  </ul>
  <transition name="slide-right" mode="out-in">
    <side-bar-mobile v-if="showSideBar"/>
  </transition>
</template>

<script setup lang="ts">
import {
  IconsCustomer,
  IconsDashboard,
  IconsIncome,
  IconsProduct,
  IconsPromote,
  IconsShop,
} from "#components";
import { useSideBar } from "~/composable/useSideBar";

const colorMode = useColorMode();
type Menu = {
  label: string;
  icon?: Component;
  to?: string;
  title?: string;
  default?: boolean;
  subMenu?: Menu[];
};
const menu = ref<Menu[]>([
  { label: "Dashboard", icon: markRaw(IconsDashboard), to: "/dashboard" },
  {
    label: "Product",
    icon: markRaw(IconsProduct),
    subMenu: [
      { label: "Overview", title: "Product Overview", to: "/product" },
      { label: "Drafts", title: "Drafts", to: "/product/drafts" },
      { label: "Released", title: "Released", to: "/product/released" },
      { label: "Comments", title: "Comments", to: "/product/comments" },
      { label: "Scheduled", title: "Scheduled", to: "/product/scheduled" },
    ],
  },
  {
    label: "Customers",
    icon: markRaw(IconsCustomer),
    subMenu: [
      { label: "Overview", title: "Customers", to: "/customer" },
      { label: "Customer list" },
    ],
  },
  { label: "Shop", icon: markRaw(IconsShop) },
  { label: "Income", icon: markRaw(IconsIncome) },
  { label: "Promote", icon: markRaw(IconsPromote) },
]);
const isTablet = useMediaQuery('(max-width:1439px)')
const route = useRoute()
const openIndexs = ref<number[]>([]);
const { showSideBar } = useSideBar()
const handleOpenSubmenu = (index: number) => {
  const isOpen = openIndexs.value.includes(index);
  if (isTablet.value) {
    openIndexs.value = isOpen ? [] : [index]
  }
  else {
    if (isOpen) {
      openIndexs.value = openIndexs.value.filter(i => i !== index);
    } else {
      openIndexs.value.push(index);
    }
  }
};
const isActive = (item: Menu) => {
  if (item.to && route.path === item.to) {
    return true;
  }
  if (item.subMenu?.some((sub) => sub.to === route.path)) {
    return true;
  }
  return false;
};

watch(
  () => route.fullPath,
  () => {
    if (isTablet.value) {
      openIndexs.value = [];
    }
  }
)
watchEffect(() => {
  if (isTablet.value) {
    openIndexs.value = []
  } else {
    const index = menu.value.findIndex(m =>
      m.subMenu?.some(sub => sub.to === route.path)
    )
    openIndexs.value = [index]
  }
  
})
</script>

<style lang="scss" scoped>
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
</style>
