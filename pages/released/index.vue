``<template>
  <div class="container">
    <div class="flex justify-between items-center">
      <div class="flex gap-6 items-center">
        <h2 class="text-primary text-6 leading-[145%] tracking-[0.06px]">
          Products
        </h2>
        <UInput
          v-model="value"
          placeholder="Search products"
          icon="i-lucide-search"
          :ui="{
            base: 'p-3 pl-8 border-1 text-secondary shadow-3 w-62',
            leading: 'pointer-events-none',
          }"
        />
      </div>
      <div class="flex gap-2 items-center">
        <icons-sort />
        <icons-list />
      </div>
    </div>
    <div class="w-full">
      <UTable
        :data="data"
        :columns="columns"
        class="flex-1"
        :ui="{
          tr: 'border-b-0 !rounded-[16px] hover:bg-background-highlight overflow-hidden group data-[selected=true]:bg-background-highlight',
        }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UIcon = resolveComponent("UIcon");
const value = ref("");
const data = [
  {
    id: 1,
    image: "/images/6.png",
    name: "Bento Pro v.2",
    description: "UI Design Kit",
    status: "Active",
    price: 98,
    sales: 3200,
    growth: 36.8,
    rating: 4.8,
    reviews: 88,
    views: "89m",
  },
  {
    id: 2,
    image: "/images/6.png",
    name: "Dashboard Kit",
    description: "Admin Templates",
    status: "Active",
    price: 120,
    sales: 5400,
    growth: 22.5,
    rating: 4.6,
    reviews: 152,
    views: "120m",
  },
  {
    id: 3,
    image: "/images/6.png",
    name: "Landing Page Kit",
    description: "Marketing UI Pack",
    status: "Offline",
    price: 79,
    sales: 2600,
    growth: -5.2,
    rating: 4.3,
    reviews: 65,
    views: "45m",
  },
  {
    id: 4,
    image: "/images/6.png",
    name: "Mobile UI Kit",
    description: "iOS + Android",
    status: "Offline",
    price: 150,
    sales: 8800,
    growth: 48.1,
    rating: 4.9,
    reviews: 210,
    views: "200m",
  },
  {
    id: 5,
    image: "/images/6.png",
    name: "E-commerce Kit",
    description: "Shop UI Components",
    status: "Active",
    price: 110,
    sales: 4200,
    growth: 18.4,
    rating: 4.5,
    reviews: 134,
    views: "95m",
  },
];
const columns: TableColumn<any>[] = [
  {
    id: "select",
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? "indeterminate"
          : table.getIsAllPageRowsSelected(),
        color: "success",
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value),
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        color: "success",
        "onUpdate:modelValue": (value: boolean | "indeterminate") =>
          row.toggleSelected(!!value),
        "aria-label": "Select row",
      }),
  },
  {
    accessorKey: "product",
    header: () =>
      h(
        "div",
        {
          class: "text-xs leading-[160%] tracking-[0.048px] text-tertiary",
        },
        [h("span", {}, "Product")]
      ),
    cell: ({ row }) => {
      const item = row.original;
      return h("div", { class: "flex items-center gap-3" }, [
        h("img", {
          src: item.image,
          alt: item.name,
          class: "w-10 h-10 rounded-md",
        }),
        h("div", {}, [
          h("div", { class: "font-medium text-white" }, item.name),
          h("div", { class: "text-xs text-gray-400" }, item.description),
        ]),
      ]);
    },
  },
  {
    accessorKey: "status",
    header: () =>
      h(
        "div",
        {
          class: "text-xs leading-[160%] tracking-[0.048px] text-tertiary",
        },
        [h("span", {}, "Status")]
      ),
    cell: ({ row }) =>
      h(
        "div",
        {
          class: [
            row.original.status === "Active"
              ? "border-success/15 bg-success/5 text-green-400"
              : "border-error/15 bg-error/5 text-red-400",
            "p-2 rounded-lg border-[1.5px] text-xs w-14.5 text-center",
          ],
        },
        `${row.original.status}`
      ),
  },
  {
    accessorKey: "price",
    header: () =>
      h(
        "div",
        {
          class: "text-xs leading-[160%] tracking-[0.048px] text-tertiary",
        },
        [h("span", {}, "Price")]
      ),
    cell: ({ row }) => `$${row.original.price}`,
  },
  {
    accessorKey: "sales",
    header: () =>
      h(
        "div",
        {
          class: "text-xs leading-[160%] tracking-[0.048px] text-tertiary",
        },
        "Sales"
      ),
    cell: ({ row }) => {
      const item = row.original;
      return h("div", { class: "flex items-center gap-2 justify-start" }, [
        h("span", {}, `$${item.sales.toLocaleString()}`),
        h(
          "span",
          {
            class:
              item.growth >= 0
                ? "text-green-400 text-xs"
                : "text-red-400 text-xs",
          },
          `${item.growth >= 0 ? "↑" : "↓"} ${item.growth}%`
        ),
      ]);
    },
  },
  {
    accessorKey: "rating",
    header: () =>
      h(
        "div",
        {
          class: "text-xs leading-[160%] tracking-[0.048px] text-tertiary",
        },
        "Rating"
      ),
    cell: ({ row }) => {
      const item = row.original;
      return h("div", { class: "flex items-center gap-1" }, [
        h(UIcon, {
          name: "material-symbols:star",
          class: "w-4 h-4 text-secondary group-hover:text-yellow-500",
        }),
        h("span", {}, `${item.rating} (${item.reviews})`),
      ]);
    },
  },
  {
    accessorKey: "views",
    header: () =>
      h(
        "div",
        {
          class: "text-xs leading-[160%] tracking-[0.048px] text-tertiary",
        },
        "Views"
      ),
    cell: ({ row }) => row.original.views,
  },
];
definePageMeta({
  title:'Released'
})
</script>

<style lang="scss" scoped>
:deep(tr.absolute.w-full.h-px) {
  background-color: var(--color-stroke-subtle);
}
</style>
