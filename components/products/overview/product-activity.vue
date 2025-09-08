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
  <div class="xs:px-5 sm:pt-4 overflow-x-auto min-w-full">
    <table class="w-full text-sm leading-[150%] text-primary">
      <thead class="block">
        <tr class="text-xs leading-[160%] text-tertiary flex gap-6">
          <th class="flex-1 py-5 text-left">Week</th>
          <th class="flex-1 py-5 text-left">Products</th>
          <th class="flex-1 py-5 text-left">Views</th>
          <th class="flex-1 py-5 text-left">Likes</th>
          <th class="flex-1 py-5 text-left hidden 2xl:table-cell">Comments</th>
        </tr>
      </thead>
      <tbody class="block overflow-y-auto max-h-34 min-w-150 overflow-x-auto">
        <tr
          v-for="(item, idx) in filterActivities"
          :key="idx"
          class="flex gap-6 h-17 border-t border-stroke-subtle w-full"
        >
          <!-- Week -->
          <td class="py-4 flex-1 flex items-center">{{ item.week }}</td>
          <!-- Product -->
          <td class="py-4 flex-1 flex items-center">
            <div class="flex items-center gap-2">
              {{ formatNum(item.product.value) }}
              <span v-if="item.product.growthRate">
                <badge-trend :growth-rate="item.product.growthRate" />
              </span>
            </div>
          </td>
          <!-- View -->
          <td class="py-4 flex-1 flex items-center">
            <div class="flex items-center gap-2">
              {{ formatNum(item.view.value) }}
              <span v-if="item.view.growthRate">
                <badge-trend :growth-rate="item.view.growthRate" />
              </span>
            </div>
          </td>
          <!-- Like -->
          <td class="py-4 flex-1 flex items-center">
            <div class="flex items-center gap-2">
              {{ item.like.value }}
              <span v-if="item.like.growthRate">
                <badge-trend :growth-rate="item.like.growthRate" />
              </span>
            </div>
          </td>
          <!-- Comment -->
          <td class="py-4 hidden 2xl:table-cell flex-1">
            <div class="flex items-center gap-2">
              {{ item.comment.value }}
              <span v-if="item.comment.growthRate">
                <badge-trend :growth-rate="item.comment.growthRate" />
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
    comment: { value: 51 },
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
