<template>
  <DataTable
    :items="schedules"
    :columns="columns"
    :classTableTr="classTableTr"
    @row-hover="handleRowHover"
  >
    <template #cell-product="{ item, index }">
      <div class="flex items-center">
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
            <div
              class="flex gap-2 items-center"
              v-if="hoveredRowIndex === index"
            >
              <div class="group">
                <NuxtLink
                  to=""
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md group-hover:text-primary/80"
                  data-modal-target="crud-modal"
                  data-modal-toggle="crud-modal"
                >
                  <icons-edit />
                  <div class="text-sm font-semibold">Edit</div>
                </NuxtLink>
              </div>

              <div class="group">
                <NuxtLink
                  to="#"
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md group-hover:text-primary/80"
                >
                  <icons-trash />
                  <div class="text-sm font-semibold">Delete</div>
                </NuxtLink>
              </div>

              <div class="group">
                <NuxtLink
                  to="#"
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md group-hover:text-primary/80"
                >
                  <icons-calendar-check />
                  <div class="text-sm font-semibold">Reschedule</div>
                </NuxtLink>
              </div>
            </div>
            <div v-else>ui8.net/product-link</div>
          </div>
        </div>
      </div>
    </template>

    <template #cell-price="{ item, index }">
      <div
        class="text-sm font-semibold px-2 py-1.75 border-[1.5px] border-solid rounded-lg inline"
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

    <template #cell-scheduledFor="{ item, index }">
      {{ item.scheduleFor }}
    </template>
  </DataTable>
</template>

<script setup>
import { ref, computed } from "vue";
import DataTable from "~/components/DataTable.vue";
import ScheduledTitle from "~/components/title/products/ScheduledTittle.vue";
import { defineProps } from "vue";

// Trong script setup của bạn
const columns = [
  {
    field: "product",
    label: "Products",
    headerClass: "py-4 pl-5 flex-1",
    cellClass: "py-4 pl-5 flex-1",
  },
  {
    field: "price",
    label: "Price",
    headerClass: "w-3/20 lg:w-3/10 py-4",
    cellClass: "w-3/20 lg:w-3/10 py-4",
  },
  {
    field: "scheduledFor",
    label: "Scheduled for",
    headerClass: "w-1/4 py-4 pr-4",
    cellClass: "text-secondary w-1/4 py-4 pr-4 rounded-r-2xl",
  },
];

const classTableTr = {
  header: "text-tertiary items-center text-left",
  body: "bottomHover align-middle hover:bg-background-pop outline-[1.5px] hover:rounded-2xl outline-solid outline-transparent p-4 hover:outline-primary/7.5 border-t-[1.5px] hover:border-none border-solid border-stroke-subtle text-left",
};

const schedules = ref([
  {
    img: "/images/1.png",
    product: "Bento Pro v.2",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/2.png",
    product: "Fleet – Travel UI Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/3.png",
    product: "Bento Pro - Vol. 2",
    activeIndex: false,
    price: "98.00",
    priceStatus: false,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/4.png",
    product: "Core Dashboard Builder v.1",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
  },
  {
    img: "/images/5.png",
    product: "Paradox - Coded Template",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/6.png",
    product: "Bento UI Design Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/7.png",
    product: "Bloom - 3D Illustrations",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/8.png",
    product: "Tiny - Avatar Builder",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
]);

const showModalEdit = ref(false);

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
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

const hoveredRowIndex = ref(null);

const handleRowHover = (index) => {
  hoveredRowIndex.value = index;
  console.log("Hovered row index in parent:", index);
};
</script>
