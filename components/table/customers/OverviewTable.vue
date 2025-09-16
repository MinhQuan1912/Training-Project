<template>
  <div class="sm:pt-4 sm:px-5 sm:pb-5 flex flex-col">
    <div class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-8">
      <div
        class="flex flex-col gap-5 lg:gap-10 pr-8"
        v-for="(item, index) in overviews"
        :key="index"
        :class="{
          '': index !== overviews.length - 1,
          'sm:border-r-[1.5px] border-solid border-stroke-subtle':
            index === overviews.length - 3,
          '2xl:border-r-[1.5px] border-solid border-stroke-subtle':
            index === overviews.length - 2,
          'hidden 2xl:flex': index === overviews.length - 1,
        }"
      >
        <ListProduct :item="item" />
      </div>
    </div>

    <div class="flex gap-4 flex-col mt-10 mb-5.5 h-72.75 relative">
      <LineChart class="absolute top-0 left-0" :mock-data="mockData" />
      <!-- <div class="flex flex-col gap-10 relative">
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
      </div> -->
    </div>

    <div class="mt-5.5 flex flex-col gap-6 @container">
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

      <div class="grid grid-cols-2 @xs:grid-cols-4 @2xl:grid-cols-8">
        <div
          class="py-4 px-3 sm:py-8 sm:px-6 flex flex-col gap-4 items-center cursor-pointer"
          v-for="(newCustomer, index) in newCustomers"
          :key="index"
          :class="{
            'hidden @2xl:flex': newCustomers.length - 4 <= index,
          }"
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

        <div
          to=""
          class="py-4 px-3 sm:py-8 sm:px-6 flex flex-col gap-4 items-center group cursor-pointer"
          @click="toggleViewAll()"
        >
          <div
            class="w-16 h-16 flex justify-center items-center p-5 border-[1.5px] border-solid border-stroke group-hover:border-primary/80 rounded-full"
          >
            <icons-arrow-right />
          </div>

          <div
            class="text-secondary font-semibold leading-[150%] w-19.5 flex justify-center group-hover:text-primary/80"
          >
            View All
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="viewAll"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Open people
          </h3>
          <button
            @click="toggleViewAll()"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <p class="text-gray-500 dark:text-gray-400 mb-4">
            Select your people:
          </p>
          <ul class="space-y-4 mb-4 h-80 overflow-y-auto">
            <li v-for="(newCustomer, index) in newCustomers" :key="index">
              <input
                type="radio"
                id="job-1"
                name="job"
                value="job-1"
                class="hidden peer"
                required
              />
              <label
                for="job-1"
                class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
              >
                <div class="flex items-center gap-4">
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
                <svg
                  class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </label>
            </li>
          </ul>
          <button
            class="text-white inline-flex w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next step
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import wallet from "~/components/icons/wallet.vue";
import customer from "~/components/icons/customerlight.vue";
import product from "~/components/icons/productlight.vue";
import graph1 from "~/components/icons/graph1.vue";
import graph2 from "~/components/icons/graph2.vue";
import graph3 from "~/components/icons/graph3.vue";
import LineChart from "~/components/vue-chart/LineChart.vue";

const mockData = reactive({
  labels: ["Apr", "May", "Jun", "July"],
  datasets: [
    {
      label: "New Customers",
      data: [1500, 750, 1250, 1500],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      pointBackgroundColor: "rgb(34, 197, 94)",
      pointBorderColor: "#fff",
      borderWidth: 2,
      pointRadius: 5,
      tension: 0.4,
      pointRadius: 0,
    },
    {
      label: "Target",
      data: [800, 800, 80, 800],
      borderColor: "rgb(255, 255, 255)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      pointRadius: 0,
      border: [5, 5],
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
});

const overviews = ref([
  {
    id: 1,
    iconName: markRaw(wallet),
    iconGraph: markRaw(graph1),
    title: "Total customers",
    price: "320K",
    status: true,
    chart: {
      data: {
        date: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        value: [
          2824, 1409, 5506, 5012, 4657, 3286, 2679, 9935, 2424, 7912, 1520,
          1488,
        ],
      },
      growthRate: 14,
    },
  },
  {
    id: 2,
    iconName: markRaw(customer),
    iconGraph: markRaw(graph2),
    title: "New customers",
    price: "857",
    status: false,
    chart: {
      data: {
        date: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        value: [
          2824, 1409, 5506, 5012, 4657, 3286, 2679, 9935, 2424, 7912, 1520,
          1488,
        ],
      },
      growthRate: -14,
    },
  },
  {
    id: 3,
    iconName: markRaw(product),
    iconGraph: markRaw(graph3),
    title: "Sales",
    price: "6812",
    status: true,
    chart: {
      data: {
        date: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        value: [
          2824, 1409, 5506, 5012, 4657, 3286, 2679, 9935, 2424, 7912, 1520,
          1488,
        ],
      },
      growthRate: 14,
    },
  },
]);

import { ref } from "vue";
import ListProduct from "~/components/ListProduct.vue";

const iconComponents = {
  wallet: wallet,
  customer: customer,
  product: product,
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

const viewAll = ref(false);

const toggleViewAll = () => {
  viewAll.value = !viewAll.value;
};
</script>

<style lang="scss" scoped></style>
