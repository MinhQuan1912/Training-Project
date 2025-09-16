<template>
  <div class="flex items-center justify-between h-12">
    <h6
      class="xs:px-5 flex items-center xs:text-xl leading-[145%] font-semibold text-primary"
    >
      Product activity
    </h6>
    <select-dropdown
      v-model:selected-option="selectedOption"
      :data="options"
      addition-class="w-40 h-12 !pr-0 xs:!pr-3"
      text-class="text-secondary"
    />
  </div>
  <data-table
    :items="filterActivities"
    :columns="columns"
    :class-table-tr="{
      padding: 'xs:px-5 pt-4',
      header: 'flex gap-6 justify-between items-center',
      body: 'flex gap-6 border-t border-stroke-subtle w-full h-17',
      thInput: 'hidden',
      tdInput: 'hidden',
    }"
    t-body-class="block overflow-y-auto max-h-34"
    t-head-class="block"
  >
    <!-- Week -->
    <template #column-week="{ item }">
      <div class="text-primary text-sm leading-[150%]">
        {{ (item as activityRow).week }}
      </div>
    </template>

    <!-- Products -->
    <template #column-products="{ item }">
      <div class="flex items-center gap-2 text-primary text-sm leading-[150%]">
        {{ formatNum((item as activityRow).product.value) }}
        <span v-if="(item as activityRow).product.growthRate">
          <badge-trend :growth-rate="(item as activityRow).product.growthRate" />
        </span>
      </div>
    </template>

    <!-- Views -->
    <template #column-views="{ item }">
      <div class="flex items-center gap-2 text-primary text-sm leading-[150%]">
        {{ formatNum((item as activityRow).view.value) }}
        <span v-if="(item as activityRow).view.growthRate">
          <badge-trend :growth-rate="(item as activityRow).view.growthRate" />
        </span>
      </div>
    </template>

    <!-- Likes -->
    <template #column-likes="{ item }">
      <div class="flex items-center gap-2 text-primary text-sm leading-[150%]">
        {{ (item as activityRow).like.value }}
        <span v-if="(item as activityRow).like.growthRate">
          <badge-trend :growth-rate="(item as activityRow).like.growthRate" />
        </span>
      </div>
    </template>

    <!-- Comments -->
    <template #column-comments="{ item }">
      <div class="flex items-center gap-2 text-primary text-sm leading-[150%]">
        {{ (item as activityRow).comment.value }}
        <span v-if="(item as activityRow).comment.growthRate">
          <badge-trend :growth-rate="(item as activityRow).comment.growthRate" />
        </span>
      </div>
    </template>
  </data-table>
</template>

<script setup lang="ts">
import { useFormatNumber } from "~/composable/useFormatNumber";

type activityCol = {
  value: number;
  growthRate?: number;
};
type activityRow = {
  week: string;
  product: activityCol;
  view: activityCol;
  like: activityCol;
  comment: activityCol;
};
const columns = [
  {
    label: "Week",
    slot: "week",
    headerClass:
      "min-w-28 flex-1 py-5 text-left text-xs leading-[160%] text-tertiary",
    cellClass: "min-w-28 py-4 flex-1 flex items-center",
  },
  {
    label: "Products",
    slot: "products",
    headerClass: "flex-1 min-w-37.5 px-4 py-5 text-left text-xs leading-[160%] text-tertiary",
    cellClass: "min-w-37.5 p-4 flex-1 flex items-center",
  },
  {
    label: "Views",
    slot: "views",
    headerClass: "flex-1 min-w-37.5 px-4 py-5 text-left text-xs leading-[160%] text-tertiary",
    cellClass: "min-w-37.5 p-4 flex-1 flex items-center",
  },
  {
    label: "Likes",
    slot: "likes",
    headerClass: "flex-1 min-w-37.5 px-4 py-5 text-left text-xs leading-[160%] text-tertiary",
    cellClass: "min-w-37.5 p-4 flex-1 flex items-center",
  },
  {
    label: "Comments",
    slot: "comments",
    headerClass:
      "flex-1 py-5 text-left text-xs leading-[160%] text-tertiary hidden 2xl:table-cell",
    cellClass: "p-4 flex-1 hidden 2xl:table-cell items-center",
  },
];
const productActivityList = ref<activityRow[]>([
  {
    week: "13 Jan - 20 Jan",
    product: {
      value: 24394,
      growthRate: 12,
    },
    view: {
      value: 32193,
      growthRate: -23,
    },
    like: {
      value: 48,
      growthRate: 51,
    },
    comment: {
      value: 16,
      growthRate: -21,
    },
  },
  {
    week: "20 Jan - 27 Jan",
    product: { value: 40924 },
    view: { value: 15694 },
    like: { value: 64 },
    comment: { value: 32 },
  },
  {
    week: "27 Jan - 03 Feb",
    product: { value: 14930 },
    view: { value: 2943 },
    like: { value: 134 },
    comment: { value: 71 },
  },
  {
    week: "03 Feb - 10 Feb",
    product: { value: 64930 },
    view: { value: 16940 },
    like: { value: 64 },
    comment: { value: 71 },
  },
]);
const { formatNum } = useFormatNumber();
const options = computed(() => {
  const opt = [];
  for (let i = 1; i <= productActivityList.value.length; i++) {
    opt.push(`Last ${i} week`);
  }
  return opt;
});
const selectedOption = ref<string>(options.value[1] || "");
const filterActivities = computed(() => {
  const week = parseInt(selectedOption.value.match(/\d+/)?.[0] || "1");
  const filterList = productActivityList.value.slice(-week);
  return filterList;
});
watchEffect(() => {
  productActivityList.value.forEach((item, index, arr) => {
    if (index === 0) return;
    const prev = arr[index - 1];
    const calcGrowthRate = (currVal: number, prevVal: number) => {
      return prevVal === 0
        ? 0
        : Math.round(((currVal - prevVal) / prevVal) * 100);
    };
    if (prev) {
      item.product.growthRate = calcGrowthRate(
        item.product.value,
        prev.product.value
      );
      item.view.growthRate = calcGrowthRate(item.view.value, prev.view.value);
      item.like.growthRate = calcGrowthRate(item.like.value, prev.like.value);
      item.comment.growthRate = calcGrowthRate(
        item.comment.value,
        prev.comment.value
      );
    }
  });
});
</script>

<style lang="scss" scoped></style>
