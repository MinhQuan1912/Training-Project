<template>
  <DataTable :items="schedules" :columns="columns" :classTableTr="classTableTr">
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
            <div class="hidden group-hover:flex gap-2 items-center">
              <div class="group/button">
                <NuxtLink
                  to=""
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover/button:border-stroke rounded-md group-hover/button:text-primary/80"
                  @click.stop="onEdit(item)"
                >
                  <icons-edit />
                  <div class="text-sm font-semibold">Edit</div>
                </NuxtLink>
              </div>

              <div class="group/button">
                <NuxtLink
                  to="#"
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover/button:border-stroke rounded-md group-hover/button:text-primary/80"
                  @click.stop.prevent="onDelete(item)"
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
            <div class="block group-hover:hidden">ui8.net/product-link</div>
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

  <Transition name="fade-zoom">
    <div
      v-if="showEditModal"
      class="fixed h-[100dvh] overflow-hidden scroll-contain inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <UCard class="w-[50dvw]">
        <template #header>
          <h2 class="text-lg font-semibold">Edit Item</h2>
        </template>

        <div
          class="flex flex-col gap-4 overflow-y-auto max-h-[50vh] custom-scroll"
        >
          <UFormField label="Name">
            <UInput
              v-model="currentItem.name"
              placeholder="Enter name"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Description">
            <UTextarea
              v-model="currentItem.description"
              placeholder="Enter description"
              class="w-full"
            />
          </UFormField>

          <div class="flex gap-2 w-full">
            <UFormField label="Status" class="flex-1">
              <USelect
                v-model="currentItem.status"
                :items="statusOptions"
                class="w-full overflow-visible"
              />
            </UFormField>

            <UFormField label="Price" class="flex-1">
              <UInput
                v-model="currentItem.price"
                type="number"
                class="w-full"
              />
            </UFormField>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="neutral"
              variant="outline"
              @click="showEditModal = false"
              >Cancel</UButton
            >
            <UButton color="success" @click="saveEdit">Save</UButton>
          </div>
        </template>
      </UCard>
    </div>
  </Transition>

  <Transition name="fade-zoom">
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <UCard class="w-[30dvw]">
        <div class="p-3 space-y-4">
          <h3 class="text-lg font-medium">Confirm Delete</h3>
          <p>
            Bạn có chắc chắn muốn xóa <b>{{ currentItem?.name }}</b> không?
          </p>
          <div class="flex justify-end gap-3">
            <UButton
              color="neutral"
              variant="outline"
              @click="showDeleteConfirm = false"
              >Cancel</UButton
            >
            <UButton color="success" @click="confirmDelete">Delete</UButton>
          </div>
        </div>
      </UCard>
    </div>
  </Transition>
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
    cellClass: "py-4 pl-5 flex-1 whitespace-nowrap",
  },
  {
    field: "price",
    label: "Price",
    headerClass: "w-3/20 lg:w-3/10 py-4",
    cellClass: "w-3/20 lg:w-3/10 py-4 pl-8 pr-12.5",
  },
  {
    field: "scheduledFor",
    label: "Scheduled for",
    headerClass: "w-1/4 py-4 pr-4",
    cellClass: "text-secondary w-1/4 py-4 pr-4 rounded-r-2xl whitespace-nowrap",
  },
];

const classTableTr = {
  header: "text-tertiary items-center text-left",
  body: "group bottomHover align-middle hover:bg-background-pop outline-[1.5px] hover:rounded-2xl outline-solid outline-transparent p-4 hover:outline-primary/7.5 border-t-[1.5px] hover:border-none border-solid border-stroke-subtle text-left",
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

// them sua xoa
const showEditModal = ref(false);
const showDeleteConfirm = ref(false);
const currentItem = ref({
  id: 0,
  image: "",
  name: "",
  description: "",
  status: "",
  price: 0,
  sales: 0,
  growth: 0,
  rating: 0,
  reviews: 0,
  views: 0,
});

const onEdit = (item) => {
  currentItem.value = {
    name: item.titleComment,
    ...item,
  };
  showEditModal.value = true;
};

const onDelete = (item) => {
  currentItem.value = {
    name: item.titleComment,
    ...item,
  };
  showDeleteConfirm.value = true;
};
</script>
