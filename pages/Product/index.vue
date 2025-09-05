<template>
  <div v-if="!showCreateProduct" class="flex flex-col gap-3 w-full">
    <!-- Overview -->
    <div class="product-overview">
      <div class="w-full flex justify-between h-12">
        <div class="xs:px-5 flex items-center text-primary text-base xs:text-xl leading-[145%] font-semibold">
          <p>Overview</p>
        </div>
        <div class="hidden sm:flex gap-1">
          <div v-for="(tab, tabIdx) in overviewTab" :key="tabIdx"
            class="cursor-pointer px-6 py-4.25 border-[1.5px] rounded-[48px] font-semibold text-sm leading-[100%] transition-all duration-300 ease"
            :class="{
              'text-primary border-stroke': activeOverviewTab === tab,
              'text-secondary border-transparent': activeOverviewTab !== tab,
            }" @click="activeOverviewTab = tab">
            {{ tab }}
          </div>
        </div>
        <div class="flex sm:hidden items-center">
          <select-dropdown :data="overviewTab" v-model:selected-option="activeOverviewTab" addition-class="h-12"/>
        </div>
      </div>
      <div class="xs:p-3 lg:p-5 text-primary gap-4 lg:gap-8 4xl:gap-16 flex flex-col m:grid grid-cols-3 3xl:grid-cols-4">
        <div v-for="(item, idx) in overViewList" :key="idx" class="overview-item"
          :class="{ '!hidden 3xl:!flex': item.label === 'Sales' }">
          <div class="w-10 h-10 sm:w-16 sm:h-16 bg-background-surface1 flex justify-center items-center rounded-full">
            <component :is="item.icon" />
          </div>
          <div class="flex gap-4 4xl:gap-10 items-center w-1/2 m:w-auto">
            <div class="flex flex-col">
              <div class="flex gap-2 items-center h-6 sm:mb-2">
                <p class="font-semibold leading-[150%]">{{ item.label }}</p>
                <tooltip :text="item.label"><icons-helping class="w-4 h-4 sm:w-6 sm:h-6"/></tooltip>
              </div>
              <h2 class="flex text-4xl sm:text-[60px] font-medium leading-[125%] sm:mb-3">
                <span class="text-tertiary text-[32px] font-semibold leading-[145%] mr-2.5 sm:pt-2">$</span>
                {{ isMobile ? item.revenue : formatNum(item.revenue) }}
              </h2>
              <div class="flex gap-2 items-center">
                <badge-trend :growth-rate="item.growthRate" />
                <span class="text-tertiary text-sm leading-[150%]">vs last year</span>
              </div>
            </div>
            <div class="w-16 h-14 xl:w-23.5 xl:h-20 hidden m:block">
              <img src="/images/chart1.png" class="w-full h-full object-contain" />
            </div>
          </div>
          <div class="flex m:hidden justify-center items-center ml-3 xs:ml-0">
            <img src="/images/chart1.png" class="w-15 xs:w-25 md:w-4/5 md:h-4/5 object-fill" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col m:flex-row gap-3 w-full">
      <!-- Product activity -->
      <div class="product-overview !gap-4 flex-1">
        <products-overview-product-activity />
      </div>
      <!-- Product Views -->
      <div class="product-overview !gap-3 w-full m:w-78 3xl:w-135 h-76">
        <h6 class="h-12 xs:px-3 py-2.5 text-base xs:text-xl leading-[145%] text-primary font-semibold">
          Product Views
        </h6>
      </div>
    </div>
    <!-- Products -->
    <products-overview-product-list />
  </div>
  <products-create-product v-else />
</template>
<script setup lang="ts">
import {
  IconsArrow2,
  IconsFolder,
  IconsPerson,
  IconsProduct,
} from "#components";
import { useCreateProduct } from "~/composable/useCreateProduct";
import { useFormatNumber } from "~/composable/useFormatNumber";
definePageMeta({
  title: "Product Overview",
});
const { showCreateProduct } = useCreateProduct();
const { formatNum } = useFormatNumber()
const isMobile = useMediaQuery('(max-width:899px)')
const overViewList = ref([
  {
    label: "Earning",
    icon: markRaw(IconsFolder),
    revenue: 128594,
    growthRate: 14,
  },
  {
    label: "Customer",
    icon: markRaw(IconsPerson),
    revenue: 512,
    growthRate: -41,
  },
  {
    label: "Sales",
    icon: markRaw(IconsProduct),
    revenue: 6812,
    growthRate: 32,
  },
  {
    label: "Payout",
    icon: markRaw(IconsArrow2),
    revenue: 256012,
    growthRate: 5,
  },
]);

const overviewTab = ref(["1D", "7D", "1M", "6M", "1Y"]);
const activeOverviewTab = ref("1Y");

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
  border-right: 1.5px solid rgba(123, 123, 123, 0.1);
  gap: 40px;

  @media (width < 900px) {
    flex-direction: row;
    align-items: center;
  }

  @media (width < 640px) {
    gap: 16px;
  }
}
</style>
