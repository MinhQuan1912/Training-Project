<template>
  <div class="w-12 h-12">
    <img src="/images/logo.png" class="w-full h-full object-contain" />
  </div>
  <ul class="flex flex-col text-sm font-semibold ">
    <li v-for="(item, idx) in menu" :key="idx" class="cursor-pointer transition-all duration-300 ease">
      <div v-if="item.subMenu" class="flex items-center justify-between gap-3 p-3 transition-all duration-300 ease"
        @click="
          handleOpenSubmenu(idx);
        " :class="{
          'text-primary': activeIndex === idx,
          'hover:text-primary': activeIndex !== idx,
        }">
        <div class="flex items-center gap-3">
          <component :is="item.icon" class="w-6 h-6" />
          {{ item.label }}
        </div>
        <icons-arrow1 :class="[
          'transition-transform duration-300 ease',
          openIndexs.includes(idx) ? '-rotate-180' : 'rotate-0',
        ]" />
      </div>
      <nuxt-link v-else :to="item.to" class="flex items-center gap-3 p-3 transition-all duration-300 ease rounded-xl"
        :class="{
          'text-primary': activeIndex === idx,
          'hover:text-primary': activeIndex !== idx,
        }">
        <component :is="item.icon" class="w-6 h-6" />
        {{ item.label }}
      </nuxt-link>
      <transition name="collapse">
        <div v-show="item.subMenu && openIndexs.includes(idx)" class="pl-9">
          <nuxt-link :to="drop.to" v-for="(drop, dropIdx) in item.subMenu" :key="dropIdx"
            class="h-11 px-3 flex items-center rounded-xl transition-all duration-300 ease hover:text-primary hover:bg-background-pop">
            {{ drop.label }}
          </nuxt-link>
        </div>
      </transition>
    </li>
  </ul>
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
const colorMode = useColorMode();
interface Menu {
  label: string;
  icon?: Component;
  to?: string;
  title?: string;
  default?: boolean;
  subMenu?: Menu[];
}
const menu = ref<Menu[]>([
  { label: "Dashboard", icon: markRaw(IconsDashboard), to: "/" },
  {
    label: "Product",
    icon: markRaw(IconsProduct),
    subMenu: [
      { label: "Overview", title: "Product Overview", to: "/product" },
      { label: "Drafts", title: "Drafts", to: "/" },
      { label: "Released", title: "Released", to: "/product/released" },
      { label: "Comments", title: "Comments", to: "" },
      { label: "Scheduled", title: "Scheduled", to: "" },
    ],
  },
  {
    label: "Customers",
    icon: markRaw(IconsCustomer),
    subMenu: [
      { label: "Overview", title: "Customers", to: "/" },
      { label: "Customer list" },
    ],
  },
  { label: "Shop", icon: markRaw(IconsShop) },
  { label: "Income", icon: markRaw(IconsIncome) },
  { label: "Promote", icon: markRaw(IconsPromote) },
]);
const emit = defineEmits(["title"]);
const openIndexs = ref<number[]>([]);
const activeIndex = ref<number | null>(null);
const handleOpenSubmenu = (index: number) => {
  const isOpen = openIndexs.value.includes(index);
  if (isOpen) {
    openIndexs.value = openIndexs.value.filter((i) => i !== index);
    if (activeIndex.value === index) {
      activeIndex.value = null;
    }
  } else {
    openIndexs.value.push(index);
    activeIndex.value = index;
  }
};

</script>

<style lang="scss" scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 270px;
  opacity: 1;
}
</style>
