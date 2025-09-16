<template>
  <DataTable
    :items="schedulesSearch"
    :columns="columns"
    :classTableTr="classTableTr"
  >
    <template v-slot:column-product="{ item, index }">
      <div class="flex items-center text-sm lg:text-base">
        <div class="w-16 h-16 mr-5 rounded-xl">
          <img
            :src="item.img"
            alt=""
            class="w-full h-full rounded-xl object-contain"
          />
        </div>
        <div class="relative">
          <div class="font-semibold text-primary">
            {{ item.product }}
          </div>
          <div class="font-normal text-secondary">
            <div class="hidden group-hover:flex gap-2 items-center">
              <div class="group/button">
                <NuxtLink
                  to=""
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover/button:border-stroke rounded-md group-hover/button:text-primary/80"
                  @click.stop="handleModalEdit(item)"
                >
                  <icons-edit />
                  <div class="text-sm font-semibold">Edit</div>
                </NuxtLink>
              </div>

              <div class="group/button">
                <NuxtLink
                  to="#"
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover/button:border-stroke rounded-md group-hover/button:text-primary/80"
                  @click.stop="handleModalDelete(item)"
                >
                  <icons-trash />
                  <div class="text-sm font-semibold">Delete</div>
                </NuxtLink>
              </div>

              <div class="group/button">
                <NuxtLink
                  to="#"
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover/button:border-stroke rounded-md group-hover/button:text-primary/80"
                >
                  <icons-calendar-check />
                  <div class="text-sm font-semibold">Reschedule</div>
                </NuxtLink>
              </div>
            </div>
            <div class="block group-hover:hidden">{{ item.link }}</div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:column-price="{ item, index }">
      <div
        class="text-xs lg:text-sm font-semibold px-2 py-1.75 border-[1.5px] border-solid rounded-lg inline"
        :class="{
          'text-primary-03 bg-primary-03/5 border-primary-03/15':
            !item.priceStatus,
          'text-primary-02 bg-primary-02/5 border-primary-02/15':
            item.priceStatus,
        }"
      >
        ${{ item.price }}
      </div>
    </template>

    <template v-slot:column-scheduledFor="{ item, index }">
      {{ item.scheduleFor }}
    </template>
  </DataTable>

  <div
    v-if="deleteModal"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs lg:text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          data-modal-hide="popup-modal"
          @click="handleModalDelete()"
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
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete
            <span class="font-bold">{{ selectItem.product }}</span> this
            product?
          </h3>
          <button
            @click.stop="handleDeleteProduct(item)"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs lg:text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
          >
            Yes, I'm sure
          </button>
          <button
            @click="handleModalDelete()"
            data-modal-hide="popup-modal"
            type="button"
            class="py-2.5 px-5 ms-3 text-xs lg:text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="editModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
  >
    <div class="relative p-4 w-full max-w-lg max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Product
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs lg:text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            data-modal-toggle="crud-modal"
            @click="handleModalEdit(item)"
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
        <form class="p-4 md:p-5">
          <!-- <div
              class="w-20 h-20 rounded-2xl relative flex flex-col items-center"
            >
              <img :src="selectItem.img" alt="" class="object-cover w-full" />
              <div>
                <label for="edit-file" class="cursor-pointer">Brower</label>
                <input
                  type="file"
                  id="edit-file"
                  class="hidden"
                  @change="handleFile"
                  accept="image/*"
                />
              </div>
            </div> -->

            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="name"
                  class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                  >Products</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product Name"
                  v-model="selectItem.product"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="name"
                  class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                  >Link</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Link Product Name"
                  v-model="selectItem.link"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                  >Price</label
                >
                <input
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  v-model="selectItem.price"
                />
              </div>
              <div class="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                  >Schedule For</label
                >
                <input
                  type="datetime"
                  name="schedulefor"
                  id="schedulefor"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="datetime"
                  v-model="selectItem.scheduleFor"
                />
              </div>
            </div>
          </div>

          <button
            @click="handleSaveProduct()"
            type="submit"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs lg:text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
          >
            <svg
              class="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Save product
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DataTable from "~/components/DataTable.vue";
import ScheduledTitle from "~/components/title/products/ScheduledTittle.vue";
import { defineProps } from "vue";

const columns = [
  {
    slot: "product",
    label: "Products",
    headerClass: "w-2/5 ml-5 min-w-89",
    cellClass: "w-2/5 ml-5 min-w-89 whitespace-nowrap",
  },
  {
    slot: "price",
    label: "Price",
    headerClass: "w-3/10 pl-8 pr-12.5 min-w-30.75",
    cellClass: "w-3/10 pl-8 pr-12.5 h-7 my-2 min-w-30.75",
  },
  {
    slot: "scheduledFor",
    label: "Scheduled for",
    headerClass: "w-1/4 min-w-30.75 max-sm:pr-6",
    cellClass:
      "w-1/4 min-w-30.75 text-secondary rounded-r-2xl whitespace-nowrap text-sm sm:text-base max-sm:pr-6 h-7 my-2",
  },
];

const classTableTr = {
  padding: "pb-4 lg:pb-8 px-2 lg:px-4",
  header: "flex text-tertiary items-center text-left text-xs p-2 lg:p-4",
  body: "flex group bottomHover align-middle hover:bg-background-pop border-[1.5px] border-solid border-t-stroke-subtle border-b-transparent border-x-transparent hover:border-primary/7.5 hover:rounded-2xl p-2 lg:p-4 text-left",
  thInput: "",
  tdInput: "rounded-2xl flex items-center",
};

const schedules = ref([
  {
    id: 1,
    img: "/images/1.png",
    product: "Bento Pro v.2",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    link: "ui8.net/product-link",
  },
  {
    id: 2,
    img: "/images/2.png",
    product: "Fleet – Travel UI Kit",
    activeIndex: false,
    price: "980000.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    link: "ui8.net/product-link",
  },
  {
    id: 3,
    img: "/images/3.png",
    product: "Bento Pro - Vol. 2",
    activeIndex: false,
    price: "98.00",
    priceStatus: false,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    link: "ui8.net/product-link",
  },
  {
    id: 4,
    img: "/images/4.png",
    product: "Core Dashboard Builder v.1",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    link: "ui8.net/product-link",
  },
  {
    id: 5,
    img: "/images/5.png",
    product: "Paradox - Coded Template",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    link: "ui8.net/product-link",
  },
  {
    id: 6,
    img: "/images/6.png",
    product: "Bento UI Design Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    link: "ui8.net/product-link",
  },
  {
    id: 7,
    img: "/images/7.png",
    product: "Bloom - 3D Illustrations",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    link: "ui8.net/product-link",
  },
  {
    id: 8,
    img: "/images/8.png",
    product: "Tiny - Avatar Builder",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    link: "ui8.net/product-link",
  },
]);

const props = defineProps({
  search: {
    type: String,
    required: true,
  },
});

const schedulesSearch = computed(() => {
  const query = props.search.toLowerCase();

  if (!query) {
    return schedules.value;
  }

  return schedules.value.filter((schedule) => {
    return schedule.product.toLowerCase().includes(query);
  });
});

// NGAY THANG NAM GIO PHUT GIAY
const date = new Date();
import { enUS } from "date-fns/locale";

import { format } from "date-fns";

const now = new Date();
const formatted = format(now, "MMM dd,yyyy 'at' h:mm a", { locale: enUS });
console.log(formatted);

// them sua xoa
const selectItem = ref({
  id: 0,
  product: "",
  price: "",
  scheduleFor: "",
});
const deleteModal = ref(false);
const editModal = ref(false);
const editImg = ref(false);

const handleModalDelete = (item) => {
  selectItem.value = { ...item };
  deleteModal.value = !deleteModal.value;
};

const handleDeleteProduct = () => {
  schedules.value = schedules.value.filter(function (d) {
    return d.id !== selectItem.value.id;
  });
  deleteModal.value = false;
};

const handleModalEdit = (item) => {
  selectItem.value = { ...item };
  editModal.value = !editModal.value;
  editImg.value = false;
};

const handleSaveProduct = () => {
  const index = schedules.value.findIndex(function (e) {
    return e.id === selectItem.value.id;
  });
  if (index !== -1) {
    schedules.value[index] = { ...selectItem.value };
  }
  editModal.value = false;
};
</script>

<style lang="scss" scoped></style>
