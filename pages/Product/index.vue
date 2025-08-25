<template>
  <div class="flex flex-col gap-3 w-full">
    <!-- Overview -->
    <div class="product-overview">
      <div class="w-full flex justify-between h-12">
        <div class="px-5 flex items-center text-primary text-xl leading-[145%] font-semibold ">
          <p>Overview</p>
        </div>
        <div class="flex gap-1">
          <div class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]">1D</div>
          <div class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]">7D</div>
          <div class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]">1M</div>
          <div class="px-6 py-4.25 text-secondary font-semibold text-sm leading-[100%]">6M</div>
          <div
            class="px-6 py-4.25 text-primary font-semibold text-sm leading-[100%] rounded-[48px] border-[1.5px] border-stroke">
            1Y</div>
        </div>
      </div>
      <div class="p-5 text-primary flex gap-8 flex-wrap">
        <div v-for="(item, idx) in overViewList" :key="idx" class="overview-item"
          :class="{ '!hidden lg:!flex': item.label === 'Sales' }">
          <div class="w-16 h-16 bg-background-surface1 flex justify-center items-center rounded-full">
            <component :is="item.icon" />
          </div>
          <div class="flex gap-4">
            <div class="flex flex-col max-w-41.5">
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
            <div class="w-[136px]">
              <img src="/images/chart1.png" class="w-full h-full object-cover" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-3 w-full">
      <!-- Product activity -->
      <div class="product-overview !gap-4 flex-1">
        <div class="flex items-center justify-between h-12">
          <h6 class="px-5 flex items-center text-xl leading-[145%] font-semibold text-primary">
            Product activity
          </h6>
          <div
            class="w-40 max-w-45 flex justify-between items-center p-3 pl-5 rounded-full border-[1.5px] border-stroke text-secondary">
            <p class="text-sm leading-[150%] ">Last 2 week</p>
            <icons-arrow1 />
          </div>
        </div>
        <div class="px-5 pt-4">
          <div class="flex gap-6 py-5 text-xs leading-[160%] text-tertiary w-full">
            <div class="flex-1">Week</div>
            <div class="flex-1">Products</div>
            <div class="flex-1">Views</div>
            <div class="flex-1">Likes</div>
            <div class="flex-1 hidden lg:block">Comments</div>
          </div>
          <div v-for="(item, idx) in productActivityList" :key="idx"
            class="flex items-center gap-6 h-17 text-primary text-sm leading-[150%]">
            <div class="flex-1" v-for="(data, dataIdx) in item" :key="dataIdx"
              :class="{ 'hidden lg:block': data === item.comment }">
              <div class="flex items-center gap-2">{{ data.value }}
                <span v-if="data.growthRate">
                  <products-overview-trend :growth-rate="data.growthRate" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Product Views -->
      <div class="product-overview !gap-3 w-78 lg:w-135 h-76">
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
type activityCol = {
  value: string,
  growthRate?: number
}
type activityRow = {
  week: activityCol,
  product: activityCol,
  view: activityCol,
  like: activityCol,
  comment: activityCol
}
const productActivityList = ref<activityRow[]>([
  {
    week: { value: '27 Jan - 03 Feb', },
    product: {
      value: '24k',
      growthRate: 31
    },
    view: {
      value: '24k',
      growthRate: -32
    },
    like: {
      value: '48',
      growthRate: 12
    },
    comment: {
      value: '16',
      growthRate: -18
    }
  },
  {
    week: { value: '03 Feb - 10 Feb' },
    product: { value: '40k' },
    view: {
      value: '16k',
      growthRate: -29
    },
    like: { value: '64' },
    comment: { value: '32' }
  }
])
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

.table-data>div {
  width: calc((100% - 24px * 4) / 5)
}

.table-header>div {
  width: calc((100% - 24px * 4) / 5)
}
</style>
