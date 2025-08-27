<template>
  <div class="flex flex-col gap-3 w-full">
    <!-- Overview -->
    <div class="product-overview ">
      <div class="w-full flex justify-between h-12">
        <div class="px-5 flex items-center text-primary text-xl leading-[145%] font-semibold ">
          <p>Overview</p>
        </div>
        <div class="flex gap-1">
          <div v-for="(tab, tabIdx) in overviewTab" :key="tabIdx"
            class="cursor-pointer px-6 py-4.25 border-[1.5px] rounded-[48px] font-semibold text-sm leading-[100%] transition-all duration-300 ease"
            :class="{
              'text-primary border-stroke': activeOverviewTab === tab,
              'text-secondary border-transparent': activeOverviewTab !== tab
            }" @click="activeOverviewTab = tab">
            {{ tab }}
          </div>
        </div>
      </div>
      <div class="p-5 text-primary gap-8 flex flex-wrap">
        <div v-for="(item, idx) in overViewList" :key="idx" class="overview-item"
          :class="{ '!hiddenxl:!flex': item.label === 'Sales' }">
          <div class="w-16 h-16 bg-background-surface1 flex justify-center items-center rounded-full">
            <component :is="item.icon" />
          </div>
          <div class="flex gap-2 xl:gap-3.5">
            <div class="flex flex-col w-38.75 2xl:w-41.5">
              <div class="flex gap-2 items-center h-6 mb-2">
                <p class="font-semibold leading-[150%]">{{ item.label }}</p>
                <u-tooltip :text="item.label"><icons-helping /></u-tooltip>
              </div>
              <h2 class="flex text-[60px] font-medium leading-[125%] mb-3">
                <span class="text-tertiary text-[32px] font-semibold leading-[145%] mr-2.5 pt-2">$</span>
                {{ item.revenue }}
              </h2>
              <div class="flex gap-2 items-center">
                <products-overview-trend :growth-rate="item.growthRate" />
                <span class="text-tertiary text-sm leading-[150%]">vs last year</span>
              </div>
            </div>
            <div class="w-16 xl:w-[136px] pt-11 xl:pt-5 xl:pl-6">
              <img src="/images/chart1.png" class="w-16 h-14 xl:w-23.5 xl:h-20 object-contain">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3 w-full">
      <!-- Product activity -->
      <div class="product-overview !gap-4 flex-1">
        <products-overview-product-activity/>
      </div>
      <!-- Product Views -->
      <div class="product-overview !gap-3 w-78 3xl:w-135 h-76">
        <h6 class="h-12 px-3 py-2.5 text-xl leading-[145%] text-primary font-semibold">Product Views</h6>

      </div>
    </div>
    <!-- Products -->
    <products-overview-product-list />
  </div>
</template>
<script setup lang="ts">
import { IconsArrow2, IconsFolder, IconsPerson, IconsProduct } from '#components';
definePageMeta({
  title: 'Product Overview'
})

const overViewList = ref([
  {
    label: 'Earning',
    icon: markRaw(IconsFolder),
    revenue: '128k',
    growthRate: 14
  },
  {
    label: 'Customer',
    icon: markRaw(IconsPerson),
    revenue: '512',
    growthRate: -41
  },
  {
    label: 'Sales',
    icon: markRaw(IconsProduct),
    revenue: '6812',
    growthRate: 32
  },
  {
    label: 'Payout',
    icon: markRaw(IconsArrow2),
    revenue: '256k',
    growthRate: 5
  },
])

const overviewTab = ref(['1D', '7D', '1M', '6M', '1Y'])
const activeOverviewTab = ref('1Y')
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
