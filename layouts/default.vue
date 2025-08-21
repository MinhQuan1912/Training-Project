<template>
  <div class="p-5 flex gap-5 bg-black h-screen">
    <div class="w-75 flex flex-col gap-5">
      <div class="w-12 h-12">
        <img src="/images/logo.png" class="w-full h-full object-cover" alt="" />
      </div>
      <nav>
        <ul class="flex flex-col">
          <li v-for="(item, idx) in menu" :key="idx" class="cursor-pointer">
            <div
              v-if="item.subMenu"
              class="flex items-center justify-between p-3 gap-3"
            >
              <div class="flex items-center gap-3">
                <component :is="item.icon" class="w-6 h-6" />
                {{ item.label }}
              </div>
            </div>
            <div v-else class="flex items-center p-3 gap-3"></div>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex flex-col gap-5 w-full">
      <layout-header />
      <div class="flex-1 overflow-y-auto custom-scroll">
        <slot />
      </div>
    </div>
  </div>
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

const menu = ref([
  {
    label: "Dashboard",
    icon: IconsDashboard,
    to: "/",
  },
  {
    label: "Product",
    icon: IconsProduct,
    title: "Product Overview",
    subMenu: [
      {
        label: "Overview",
        to: "/",
      },
      {
        label: "Drafts",
        to: "/",
      },
      {
        label: "Realeased",
        to: "",
      },
      {
        label: "Comments",
        to: "",
      },
      {
        label: "Scheduled",
        to: "",
      },
    ],
  },
  {
    label: "Customers",
    icon: IconsCustomer,
    subMenu: [
      {
        label: "Overview",
        to: "/",
      },
      {
        label: "Customer list",
        to: "/",
      },
    ],
  },
  {
    label: "Shop",
    icon: IconsShop,
    to: "/",
  },
  {
    label: "Income",
    icon: IconsIncome,
    to: "/",
  },
  {
    label: "Promote",
    icon: IconsPromote,
    to: "/",
  },
]);
</script>
