<template>
  <div
    class="bg-background-surface1 p-5 rounded-full inline w-fit h-fit flex-none cursor-pointer"
  >
    <component :is="item.iconName" />
  </div>

  <div class="flex justify-between items-center w-full gap-4">
    <div class="w-3/4">
      <div class="flex gap-2">
        <div
          class="text-primary font-semibold overflow-hidden cursor-pointer whitespace-nowrap"
        >
          {{ item.title }}
        </div>

        <div
          class="m-0.75 text-secondary w-4.5 h-4.5 flex justify-center items-center border-[1.5px] border-solid border-secondary rounded-full opacity-50 flex-none cursor-pointer"
        >
          ?
        </div>
      </div>

      <div class="flex gap-1">
        <div
          v-if="item.dollars"
          class="pt-2 pr-1.5 pb-1.5 text-[32px] text-tertiary leading-[145%] font-semibold"
        >
          $
        </div>

        <div
          class="text-5xl md:text-6xl font-medium text-primary leading-[125%] mt-2 mb-3"
        >
          {{ item.price }}
        </div>
      </div>

      <div class="flex gap-2 items-center">
        <badge-trend :growth-rate="item.chart.growthRate" />

        <div class="text-tertiary text-sm leading-[150%] whitespace-nowrap">
          vs last year
        </div>
      </div>
    </div>

    <div class="w-1/4 h-13">
      <products-overview-line-chart
        :date="item.chart.data.date"
        :value="item.chart.data.value"
        :growth="item.chart.growthRate"
        class="object-contain"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
