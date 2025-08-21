<template>
  <div class="flex flex-col gap-3 w-full">
    <div class="product-overview">
      <div class="w-full flex justify-between h-12">
        <div
          class="px-5 flex items-center text-primary text-xl leading-[145%] font-semibold"
        >
          <p>Overview</p>
        </div>
        <div class="flex gap-1">
          <div
            class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]"
          >
            1D
          </div>
          <div
            class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]"
          >
            7D
          </div>
          <div
            class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]"
          >
            1M
          </div>
          <div
            class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]"
          >
            6M
          </div>
          <div
            class="px-6 py-4.25 text-primary font-semibold text-sm leading-[100%] rounded-[48px] border-[1.5px] border-stroke"
          >
            1Y
          </div>
        </div>
      </div>
      <div class="p-5 text-primary flex gap-8">
        <div
          v-for="(item, idx) in overViewList"
          :key="idx"
          class="overview-item"
        >
          <div
            class="w-16 h-16 bg-background-01 flex justify-center items-center rounded-full"
          >
            <component :is="item.icon" />
          </div>
          <div class="flex gap-4">
            <div class="flex flex-col max-w-41.5">
              <div class="flex gap-2 items-center h-6 mb-2">
                <p class="font-semibold leading-[150%]">{{ item.label }}</p>
                <icons-helping />
              </div>
              <h2 class="flex text-[60px] font-medium leading-[125%] mb-3">
                <span
                  class="text-tertiary text-[32px] font-semibold leading-[145%] mr-2.5 pt-2"
                  >$</span
                >
                {{ item.revenue }}
              </h2>
              <div class="flex gap-2 items-center">
                <div
                  class="max-w-19.5 flex gap-1 px-2 py-1.5 items-center rounded-lg border-[1.5px] border-[#ff6a5526] bg-[#ff6a550d] text-[#ff6a55]"
                  :class="{
                    '!bg-[#00a6560d] !border-[#00a65626] text-primary-02':
                      item.increase,
                  }"
                >
                  <u-tooltip :delay-duration="0" :text="item.label">
                    <icons-arrow2
                      class="!w-4 !h-4 rotate-135"
                      :class="{ '!-rotate-45': item.increase }"
                    />
                  </u-tooltip>
                  <p class="text-sm font-semibold leading-[100%]">36.8%</p>
                </div>
                <span class="text-tertiary text-sm leading-[150%]"
                  >vs last year</span
                >
              </div>
            </div>
            <div class="w-[136px]">
              <img
                src="/images/chart1.png"
                class="w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3">
      <div class="product-overview !gap-4 w-252">
        <div class="flex items-center justify-between h-12">
          <h6
            class="px-5 flex items-center text-xl leading-[145%] font-semibold text-primary"
          >
            Product activity
          </h6>
          <div
            class="w-40 max-w-45 flex justify-between items-center p-3 pl-5 rounded-full border-[1.5px] border-stroke text-secondary"
          >
            <p class="text-sm leading-[150%]">Last 2 week</p>
            <icons-arrow1 />
          </div>
        </div>
        <div class="px-5 py-4"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  IconsArrow2,
  IconsFolder,
  IconsPerson,
  IconsProduct,
} from "#components";
definePageMeta({
  title: "Product Overview",
});
const overViewList = ref([
  {
    label: "Earning",
    icon: markRaw(IconsFolder),
    revenue: "128k",
    increase: true,
  },
  {
    label: "Customer",
    icon: markRaw(IconsPerson),
    revenue: "512",
    increase: false,
  },
  {
    label: "Sales",
    icon: markRaw(IconsProduct),
    revenue: "6812",
    increase: true,
  },
  {
    label: "Payout",
    icon: markRaw(IconsArrow2),
    revenue: "256k",
    increase: true,
  },
]);
</script>
<style lang="scss" scoped>
.product-overview {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background-color: var(--color-background-02);
  border-radius: 32px;
}

.overview-item {
  display: flex;
  flex-direction: column;
  padding-right: 32px;
  border-right: 1.5px solid rgba(123, 123, 123, 0.1);
  gap: 40px;
  flex-grow: 0;
}
</style>
