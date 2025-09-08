<template>
  <DataTable
    :items="commentsFilter"
    :columns="columns"
    :classTableTr="classTableTr"
    @row-click="handleRowClick"
  >
    <template v-slot:column-comments="{ item, index }">
      <div class="flex items-center">
        <div class="w-12 h-12 mr-5 rounded-full flex-none">
          <img
            :src="item.imgComment"
            alt=""
            class="w-full h-full rounded-full object-contain"
          />
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <div class="flex items-center gap-3">
              <div class="font-semibold text-primary">
                {{ item.titleComment }}
              </div>
              <div class="flex gap-2 items-center">
                <div class="text-secondary text-xs lg:text-sm">
                  {{ item.instaComment }}
                </div>
                <icons-status_indicator />
                <div class="text-secondary text-xs lg:text-sm">
                  {{ item.timeComment }}
                </div>
              </div>
            </div>

            <div class="text-primary/80">
              {{ item.contentComment }}
            </div>
          </div>
        </div>
      </div>

      <div
        :class="[
          'transition-all ml-18 duration-1000 ease-in-out',
          item.activeIndex === true
            ? 'max-h-100 opacity-100 visible'
            : 'max-h-0 opacity-0 invisible',
        ]"
      >
        <div class="flex gap-4 mt-4.5">
          <div class="w-8 h-8 rounded-full flex flex-none">
            <img
              :src="item.imgAnswer"
              alt=""
              class="w-full h-full rounded-full object-cover"
            />
          </div>

          <div>
            <div class="flex items-center gap-3">
              <div class="font-semibold text-primary">
                {{ item.titleAnswer }}
              </div>
              <div class="flex gap-2 items-center">
                <div class="text-secondary text-xs lg:text-sm">
                  {{ item.instaAnswer }}
                </div>
                <icons-status_indicator />
                <div class="text-secondary text-xs lg:text-sm">
                  {{ item.timeAnswer }}
                </div>
              </div>
            </div>

            <div class="text-primary/80">
              {{ item.contentAnswer }}
            </div>

            <div class="flex gap-5 items-center text-secondary mt-2">
              <NuxtLink
                to="#"
                class="flex items-center gap-1 py-1 pr-1.5 hover:text-primary/80"
                @click.stop="handleModalEditComment(item)"
              >
                <icons-edit />
                <div class="text-xs lg:text-sm font-semibold">Reply</div>
              </NuxtLink>

              <NuxtLink
                to="#"
                class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
              >
                <icons-heart />
                <div class="text-xs lg:text-sm font-semibold">Like</div>
              </NuxtLink>

              <NuxtLink
                @click.stop="handleModalDeleteComment(item)"
                to="#"
                class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
              >
                <icons-trash />
                <div class="text-xs lg:text-sm font-semibold">Remove</div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:column-product="{ item, index }">
      <div class="flex items-center">
        <div class="grid transition-all">
          <div
            class="hidden lg:flex gap-5 items-center text-secondary mt-2"
            v-if="item.activeIndex === true"
          >
            <NuxtLink
              @click.stop="handleModalEditProduct(item)"
              to="#"
              class="flex items-center gap-1 py-1 pr-1.5 hover:text-primary/80"
            >
              <icons-edit />
              <div class="text-xs lg:text-sm font-semibold">Reply</div>
            </NuxtLink>

            <NuxtLink
              to="#"
              class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
            >
              <icons-heartRed />
              <div class="text-xs lg:text-sm font-semibold">Like</div>
            </NuxtLink>

            <NuxtLink
              @click.stop="handleModalDeleteProduct(item)"
              to="#"
              class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
            >
              <icons-trash />
              <div class="text-xs lg:text-sm font-semibold">Remove</div>
            </NuxtLink>
          </div>

          <div
            class="flex gap-5 items-center"
            v-if="item.activeIndex === false"
          >
            <div class="w-16 h-16 rounded-xl flex-none">
              <img
                :src="item.imgProduct"
                alt=""
                class="w-full h-full rounded-xl object-contain"
              />
            </div>
            <div class="relative cursor-pointer">
              <div class="font-semibold text-primary">
                {{ item.titleProduct }}
              </div>
              <div class="font-normal text-secondary">
                {{ item.contentProduct }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div
      class="w-2 h-2 rounded-full flex-none absolute top-4 right-4"
      :class="{ 'bg-primary-02': item.on === true }"
    ></div>
  </DataTable>

  <div
    v-if="deleteModalComment"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs lg:text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          data-modal-hide="popup-modal"
          @click="handleModalDeleteComment(item)"
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
            <span class="font-bold">{{ selectItem.titleComment }}</span> this
            product?
          </h3>
          <button
            @click="handleDeleteComment(item)"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs lg:text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
          >
            Yes, I'm sure
          </button>
          <button
            @click="handleModalDeleteComment(item)"
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
    v-if="editModalComment"
    tabindex="-1"
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
            Edit Product
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs lg:text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            data-modal-toggle="crud-modal"
            @click="handleModalEditComment(item)"
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
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Name Comment</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product Name"
                v-model="selectItem.titleComment"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Insta Comment</label
              >
              <input
                type="text"
                name="insta"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                v-model="selectItem.instaComment"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Time Comment</label
              >
              <input
                type="datetime"
                name="schedulefor"
                id="schedulefor"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="datetime"
                v-model="selectItem.timeComment"
              />
            </div>
            <div class="col-span-2">
              <label
                for="price"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Nội dung Comment</label
              >
              <input
                type="datetime"
                name="schedulefor"
                id="schedulefor"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="datetime"
                v-model="selectItem.contentComment"
              />
            </div>

            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Name Answer</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product Name"
                v-model="selectItem.titleAnswer"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Insta Answer</label
              >
              <input
                type="text"
                name="insta"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                v-model="selectItem.instaAnswer"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Time Answer</label
              >
              <input
                type="datetime"
                name="schedulefor"
                id="schedulefor"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="datetime"
                v-model="selectItem.timeAnswer"
              />
            </div>
            <div class="col-span-2">
              <label
                for="price"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Nội dung Answer</label
              >
              <input
                type="datetime"
                name="schedulefor"
                id="schedulefor"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="datetime"
                v-model="selectItem.contentAnswer"
              />
            </div>
          </div>
          <button
            @click="handleSaveComment()"
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
            Save comments
          </button>
        </form>
      </div>
    </div>
  </div>

  <div
    v-if="deleteModalProduct"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <button
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs lg:text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          data-modal-hide="popup-modal"
          @click="handleModalDeleteProduct()"
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
            <span class="font-bold">{{ selectItem.titleProduct }}</span> this
            product?
          </h3>
          <button
            @click="handleDeleteProduct(item)"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs lg:text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer"
          >
            Yes, I'm sure
          </button>
          <button
            @click="handleModalDeleteProduct()"
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
    v-if="editModalProduct"
    tabindex="-1"
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
            Edit Product
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs lg:text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            data-modal-toggle="crud-modal"
            @click="handleModalEditProduct(item)"
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
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
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
                v-model="selectItem.titleProduct"
              />
            </div>
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-xs lg:text-sm font-medium text-gray-900 dark:text-white"
                >Nội dung</label
              >
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-xs lg:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Product Name"
                v-model="selectItem.contentProduct"
              />
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
    slot: "comments",
    label: "Comments",
    headerClass: "w-3/5 pl-5 mr-6 min-w-115",
    cellClass: "w-3/5 pl-5 flex flex-col text-sm lg:text-base mr-6 min-w-115",
  },
  {
    slot: "product",
    label: "Product",
    headerClass: "w-3/25",
    cellClass:
      "w-3/25 rounded-r-2xl flex items-center whitespace-nowrap text-sm lg:text-base",
  },
];

const classTableTr = {
  header: "text-left flex items-center text-tertiary text-xs p-4",
  body: "bottomHover flex items-center p-4 relative group hover:bg-background-pop w-full hover:rounded-2xl border-[1.5px] border-solid border-t-stroke-subtle border-b-transparent border-x-transparent hover:border-primary/7.5",
};

const comments = ref([
  {
    id: 1,
    imgComment: "/images/avatar01.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    imgProduct: "/images/1.png",
    titleProduct: "123123Bento Pro v.2",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
  {
    id: 2,
    imgComment: "/images/avatar02.png",
    titleComment: "Annalece Mark",
    instaComment: "@AnnaleceMark",
    time: "2m",
    imgProduct: "/images/2.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
  {
    id: 3,
    imgComment: "/images/avatar03.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/3.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
  {
    id: 4,
    imgComment: "/images/avatar04.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/4.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    id: 5,
    imgComment: "/images/avatar05.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/5.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    id: 6,
    imgComment: "/images/avatar06.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/6.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    id: 7,
    imgComment: "/images/avatar07.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/7.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    id: 8,
    imgComment: "/images/avatar08.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/8.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    contentProduct: "UI Design Kit",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
]);

const handleRowClick = (index) => {
  comments.value.forEach((comment, i) => {
    if (i === index) {
      comment.activeIndex = !comment.activeIndex;
    }
  });
};

const props = defineProps({
  search: {
    type: String,
    require: true,
  },
});

const commentsFilter = computed(() => {
  const key = props.search.toLowerCase();

  if (!props.search) {
    return comments.value;
  }
  comments.value.filter(function (comment) {
    return comment.titleComment.toLowerCase().includes(key);
  });
});

// const handleSearch = () => {
//   const keyword = value.value.trim().toLowerCase();
//   if (!keyword) {
//     results.value = data.value;
//   } else {
//     results.value = data.value.filter((item) =>
//       item.name.toLowerCase().includes(keyword)
//     );
//   }
// };

// THÊM SỬA XÓA
const selectItem = ref({
  titleComment: "",
  instaComment: "",
  timeComment: "",
  contentComment: "",
  titleAnswer: "",
  instaAnswer: "",
  timeAnswer: "",
  contentAnswer: "",
});
const deleteModalComment = ref(false);
const deleteModalProduct = ref(false);
const editModalComment = ref(false);
const editModalProduct = ref(false);

const handleModalDeleteComment = (item) => {
  selectItem.value = { ...item };
  deleteModalComment.value = !deleteModalComment.value;
};

const handleDeleteComment = () => {
  comments.value = comments.value.filter(function (d) {
    return d.id !== selectItem.value.id;
  });
  deleteModalComment.value = false;
};

const handleModalDeleteProduct = (item) => {
  selectItem.value = { ...item };
  deleteModalProduct.value = !deleteModalProduct.value;
};

const handleDeleteProduct = () => {
  comments.value = comments.value.filter(function (d) {
    return d.id !== selectItem.value.id;
  });
  deleteModalProduct.value = false;
};

const handleModalEditComment = (item) => {
  selectItem.value = { ...item };
  editModalComment.value = !editModalComment.value;
};

const handleSaveComment = () => {
  const index = comments.value.findIndex(function (e) {
    return e.id === selectItem.value.id;
  });
  if (index !== -1) {
    comments.value[index] = { ...selectItem.value };
  }
  editModalComment.value = false;
};

const handleModalEditProduct = (item) => {
  selectItem.value = { ...item };
  editModalProduct.value = !editModalProduct.value;
};

const handleSaveProduct = () => {
  const index = comments.value.findIndex(function (e) {
    return e.id === selectItem.value.id;
  });
  if (index !== -1) {
    comments.value[index] = { ...selectItem.value };
  }
  editModalProduct.value = false;
};
</script>

<style>
.bottomHover:hover + .bottomHover {
  border-top: transparent;
}
</style>
