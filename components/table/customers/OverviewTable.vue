<template>
  <div class="container">
    <div class="pt-4 px-5 pb-5 flex flex-col">
      <div
        class="flex gap-8 divide-x-[1.5px] divide-solid divide-stroke-subtle"
      >
        <div
          class="flex flex-col gap-10 w-1/3"
          v-for="(overview, index) in overviews"
          :key="index"
          :class="{ 'pr-8': index !== overviews.length - 1 }"
        >
          <div
            class="bg-background-surface1 p-5 rounded-full inline w-fit h-fit flex-none"
          >
            <component :is="iconComponents[overview.iconName]" />
          </div>

          <div class="flex items-center justify-between">
            <div class="">
              <div class="flex gap-2">
                <div
                  class="text-primary font-semibold overflow-hidden cursor-pointer"
                >
                  {{ overview.title }}
                </div>

                <div
                  class="m-0.75 text-secondary w-4.5 h-4.5 flex justify-center items-center border-[1.5px] border-solid border-secondary rounded-full opacity-50 flex-none cursor-pointer"
                >
                  ?
                </div>
              </div>

              <div
                class="text-6xl font-medium text-primary leading-[125%] mt-2 mb-3"
              >
                {{ overview.content }}
              </div>

              <div class="flex gap-2 items-center">
                <div
                  class="py-1.5 px-2 flex gap-1 items-center border-[1.5px] border-solid rounded-lg"
                  :class="{
                    'bg-primary-02/5 border-primary-02/15':
                      overview.status === true,
                    'bg-primary-04/5 border-primary-04/15':
                      overview.status === false,
                  }"
                >
                  <icons-arrow-top v-if="overview.status === true" />
                  <icons-arrow-bottom v-else />

                  <div
                    class="text-sm font-semibold"
                    :class="{
                      'text-primary-02': overview.status === true,
                      'text-primary-04': overview.status === false,
                    }"
                  >
                    {{ overview.percent }}%
                  </div>
                </div>

                <div class="text-tertiary text-sm leading-[150%]">
                  vs last year
                </div>
              </div>
            </div>

            <div class="pt-8 pb-11 px-6 mb-4.75">
              <component :is="iconGraphComponents[overview.iconGraph]" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-4 flex-col mt-10 mb-5.5">
        <div class="flex flex-col gap-10 relative">
          <div class="flex gap-6 items-center">
            <div class="w-8 text-xs leading-[160%] text-tertiary">2k</div>
            <div
              class="w-full border-t-[1.5px] border-dashed border-stroke"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8 text-xs leading-[160%] text-tertiary">1.5k</div>
            <div
              class="w-full border-t-[1.5px] border-dashed border-stroke"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8 text-xs leading-[160%] text-tertiary">1k</div>
            <div
              class="w-full border-t-[1.5px] border-dashed border-stroke"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8 text-xs leading-[160%] text-tertiary">500</div>
            <div
              class="w-full border-t-[1.5px] border-dashed border-stroke"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8 text-xs leading-[160%] text-tertiary">0</div>
            <div
              class="w-full border-t-[1.5px] border-dashed border-stroke"
            ></div>
          </div>
        </div>

        <div
          class="flex justify-around gap-3 mx-5 text-tertiary text-xs leading-[160%]"
        >
          <div>Apr</div>

          <div>May</div>

          <div>Jun</div>

          <div>July</div>
        </div>
      </div>

      <div class="mt-5.5 flex flex-col gap-6">
        <div class="flex justify-between">
          <div class="flex flex-col gap-1">
            <div class="flex gap-3 items-center">
              <div class="leading-7 font-medium text-lg text-primary">
                857 new customers today!
              </div>
              <div
                class="py-1.5 px-2 flex gap-1 bg-primary-02/5 border-[1.5px] border-solid border-primary-02/15 items-center rounded-lg"
              >
                <icons-arrow-top />
                <div class="text-primary-02 text-sm font-semibold">36.8%</div>
              </div>
            </div>

            <div class="text-secondary text-sm leading-[150%]">
              Send a welcome message to all new customers.
            </div>
          </div>

          <div class="p-3.5 w-6 h-6"></div>
        </div>

        <div class="flex justify-between">
          <div
            class="py-8 px-6 flex flex-col gap-4 items-center"
            v-for="(newCustomer, index) in newCustomers"
            :key="index"
          >
            <div class="w-16 h-16">
              <img
                :src="newCustomer.img"
                alt=""
                class="w-full h-full rounded-full object-contain"
              />
            </div>

            <div
              class="text-secondary font-semibold leading-[150%] w-19.5 flex justify-center"
            >
              {{ newCustomer.content }}
            </div>
          </div>

          <div class="py-8 px-6 flex flex-col gap-4 items-center">
            <div
              class="w-16 h-16 flex justify-center items-center p-5 border-[1.5px] border-solid border-stroke rounded-full cursor-pointer"
            >
              <icons-arrow-right />
            </div>

            <div
              class="text-secondary font-semibold leading-[150%] w-19.5 flex justify-center"
            >
              View All
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import wallet from "~/components/icons/wallet.vue";
import Customer from "~/components/icons/customerlight.vue";
import Product from "~/components/icons/productlight.vue";
import graph1 from "~/components/icons/graph1.vue";
import graph2 from "~/components/icons/graph2.vue";
import graph3 from "~/components/icons/graph3.vue";

const overviews = ref([
  {
    iconName: "wallet",
    iconGraph: "graph1",
    title: "Total customers",
    content: "320K",
    status: true,
    percent: 36.8,
    time: "vs last year",
  },
  {
    iconName: "customer",
    iconGraph: "graph2",
    title: "New customers",
    content: "857",
    status: false,
    percent: 36.8,
    time: "vs last year",
  },
  {
    iconName: "product",
    iconGraph: "graph3",
    title: "Sales",
    content: "6812",
    status: true,
    percent: 36.8,
    time: "vs last year",
  },
]);

import { ref } from "vue";

const iconComponents = {
  wallet: wallet,
  customer: Customer,
  product: Product,
};

const iconGraphComponents = {
  graph1: graph1,
  graph2: graph2,
  graph3: graph3,
};

const newCustomers = ref([
  {
    img: "/images/avatar01.png",
    content: "Gladyce",
  },
  {
    img: "/images/avatar02.png",
    content: "Elbert",
  },
  {
    img: "/images/avatar03.png",
    content: "Joyce",
  },
  {
    img: "/images/avatar04.png",
    content: "Joyce",
  },
  {
    img: "/images/avatar05.png",
    content: "Joyce",
  },
  {
    img: "/images/avatar06.png",
    content: "Joyce",
  },
  {
    img: "/images/avatar07.png",
    content: "Joyce",
  },
]);
</script>

<style lang="scss" scoped></style>
