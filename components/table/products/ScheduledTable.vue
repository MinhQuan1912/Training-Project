<template>
  <div class="container pb-8 px-4">
    <table class="table-auto w-full">
      <thead>
        <tr class="text-tertiary items-center text-left">
          <th class="pl-4 py-4 w-6">
            <div class="">
              <input
                type="checkbox"
                id="myCheckbox"
                class="original-checkbox"
                v-model="allChecked"
              />
              <label for="myCheckbox" class="custom-checkbox"></label>
            </div>
          </th>
          <th class="py-4 pl-5">Products</th>
          <th class="w-3/20 lg:w-3/10 py-4">Price</th>
          <th class="w-1/4 py-4 pr-4">Scheduled for</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bottomHover align-middle hover:bg-background-pop outline-[1.5px] hover:rounded-2xl outline-solid outline-transparent p-4 hover:outline-primary/7.5 border-t-[1.5px] hover:border-none border-solid border-stroke-subtle text-left"
          v-for="(schedule, index) in filteredSchedule"
          :key="index"
          @mouseover="hoveredRowIndex = index"
          @mouseleave="hoveredRowIndex = null"
        >
          <td class="w-6 pl-4 py-4 rounded-l-2xl">
            <input
              type="checkbox"
              :id="'checkbox-' + index"
              class="original-checkbox"
              v-model="schedule.checked"
            />
            <label :for="'checkbox-' + index" class="custom-checkbox"></label>
          </td>
          <td class="py-4 pl-5">
            <div class="flex items-center">
              <div class="w-16 h-16 mr-5 rounded-xl">
                <img
                  :src="schedule.img"
                  alt=""
                  class="w-full h-full rounded-xl object-contain"
                />
              </div>
              <div class="relative">
                <div class="font-semibold text-primary">
                  {{ schedule.product }}
                </div>
                <div class="font-normal text-secondary">
                  <div
                    class="flex gap-2 items-center"
                    v-if="hoveredRowIndex === index"
                  >
                    <div class="group">
                      <NuxtLink
                        to=""
                        class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md"
                        data-modal-target="crud-modal"
                        data-modal-toggle="crud-modal"
                        @click="showModalEdit = true"
                      >
                        <icons-edit />
                        <div
                          class="text-sm font-semibold group-hover:text-primary/80"
                        >
                          Edit
                        </div>
                      </NuxtLink>
                    </div>

                    <div class="group">
                      <NuxtLink
                        to="#"
                        class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md"
                      >
                        <icons-trash />
                        <div
                          class="text-sm font-semibold group-hover:text-primary/80"
                        >
                          Delete
                        </div>
                      </NuxtLink>
                    </div>

                    <div class="group">
                      <NuxtLink
                        to="#"
                        class="flex items-center gap-1 py-1 pl-1 pr-1.5 group border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md"
                      >
                        <icons-calendar-check />
                        <div
                          class="text-sm font-semibold group-hover:text-primary/80"
                        >
                          Reschedule
                        </div>
                      </NuxtLink>
                    </div>
                  </div>
                  <div v-else>ui8.net/product-link</div>
                </div>
              </div>
            </div>
          </td>
          <td class="w-3/20 lg:w-3/10 py-4">
            <div
              class="text-sm font-semibold px-2 py-1.75 border-[1.5px] border-solid rounded-lg inline"
              :class="{
                'text-primary-03 bg-primary-03/5 border-primary-03/15':
                  !schedule.priceStatus,
                'text-primary-02  bg-primary-02/5  border-primary-02/15':
                  schedule.priceStatus,
              }"
            >
              ${{ schedule.price }}
            </div>
          </td>
          <td class="text-secondary w-1/4 py-4 pr-4 rounded-r-2xl">
            {{ schedule.scheduleFor }}
          </td>
        </tr>
      </tbody>
    </table>

    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      :class="{ 'flex m-0': showModalEdit, 'hidden m-0': !showModalEdit }"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
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
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              data-modal-toggle="crud-modal"
              @click="showModalEdit = false"
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
              <span class="sr-only" @click="showModalEdit = false"
                >Close modal</span
              >
            </button>
          </div>
          <!-- Modal body -->
          <form class="p-4 md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2">
              <div class="col-span-2">
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Products</label
                >
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
              </div>
              <div class="col-span-2">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Price</label
                >
                <input
                  type="number"
                  name="price"
                  id="price"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required=""
                  value=""
                />
              </div>
              <div class="col-span-2">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Scheduled For</label
                >
                <input
                  type="datetime"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Time set day"
                />
              </div>
            </div>
            <button
              type="submit"
              class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
            >
              Save product
            </button>
          </form>
        </div>
      </div>
    </div>

    <div
      id="popup-modal"
      tabindex="-1"
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
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
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this product?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ScheduledTitle from "~/components/title/products/ScheduledTittle.vue";
const schedules = ref([
  {
    img: "/images/1.png",
    product: "Bento Pro v.2",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/2.png",
    product: "Fleet – Travel UI Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/3.png",
    product: "Bento Pro - Vol. 2",
    activeIndex: false,
    price: "98.00",
    priceStatus: false,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/4.png",
    product: "Core Dashboard Builder v.1",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    checked: false,
  },
  {
    img: "/images/5.png",
    product: "Paradox - Coded Template",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/6.png",
    product: "Bento UI Design Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/7.png",
    product: "Bloom - 3D Illustrations",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/8.png",
    product: "Tiny - Avatar Builder",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
]);

const hoveredRowIndex = ref(null);

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
});

// const allChecked = computed({
//   get() {
//     for (let i = 0; i < schedules.value.length; i++) {
//       if (schedules.value[i] !== true) {
//         return false;
//       }
//     }

//     return true;
//   },

//   set(value) {
//     if (value === false) {
//       schedules.value.forEach((schedule) => {
//         schedule.checked = value;
//       });
//     }
//   },
// });

const allChecked = computed({
  get() {
    return schedules.value.every((schedule) => schedule.checked === true);
  },
  set(value) {
    schedules.value.forEach((schedule) => {
      schedule.checked = value;
    });
  },
});

const filteredSchedule = computed(() => {
  if (!props.searchQuery) {
    return schedules.value;
  }

  const query = props.searchQuery.toLowerCase();

  return schedules.value.filter((schedule) =>
    schedule.product.toLowerCase().includes(query)
  );
});

const showModalEdit = ref(false);

const showModalDelete = ref(false);
</script>

<style lang="scss" scoped>
.original-checkbox {
  display: none;
}

.custom-checkbox {
  @extend .original-checkbox;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid #282828;
  background-color: #222222;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
}

.original-checkbox:checked + .custom-checkbox {
  background: white;
  border-color: white;
}

.original-checkbox:checked + .custom-checkbox::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 12px;
  border: solid black;
  border-width: 0 3px 3px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

.bottomHover:hover + .bottomHover {
  border-top: transparent;
}
</style>
