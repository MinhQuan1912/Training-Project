<template>
  <div class="container">
    <div class="border-cus-4 min-h-[85dvh] min-w-full">
      <div class="p-3 w-full flex justify-between items-center">
        <div class="flex gap-6 items-center">
          <h2 class="text-primary text-6 leading-[145%] tracking-[0.06px]">
            Products
          </h2>
          <UInput
            v-model="value"
            placeholder="Search products"
            icon="i-lucide-search"
            color="success"
            :ui="{
              root: 'text-secondary',
              base: 'p-3 pl-9 border-1 !text-secondary shadow-3 w-40 sm:w-62 text-sm leading-[150%] tracking-[0.035px] cursor-pointer',
              leadingIcon: 'text-secondary',
            }"
          >
          </UInput>
        </div>
        <div class="gap-2 items-center hidden sm:flex">
          <icons-sort class="cursor-pointer hover:opacity-40" />
          <icons-list class="cursor-pointer hover:opacity-40" />
        </div>
      </div>
      <div class="mt-3 p-4 overflow-x-auto custom-scroll">
        <table
          class="border-separate border-spacing-0 text-sm text-gray-200 p-1 min-w-full"
        >
          <thead
            class="w-full table-fixed rounded-xl text-tertiary text-xs font-normal leading-[160%] tracking-[0.048px]"
          >
            <tr
              class="rounded-[16px] p-4 hover:!bg-background-highlight border-b-[2px] border-stroke-subtle"
            >
              <th class="p-4 rounded-l-[16px]">
                <label
                  class="relative w-6 h-6 flex items-center justify-center border-2 border-[#727272] rounded-[6px] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleAll"
                    class="peer hidden"
                  />
                  <span
                    class="absolute inset-0 flex shrink-0 items-center justify-center peer-checked:before:content-['✔'] peer-checked:before:text-green-500 peer-checked:before:text-sm"
                  ></span>
                </label>
              </th>
              <th class="p-6 pl-4 text-left min-w-80 md:w-120">Product</th>
              <th class="p-6 pl-4 text-left">Status</th>
              <th class="p-6 pl-4 text-left">Price</th>
              <th class="p-6 pl-4 text-left">Sales</th>
              <th class="p-6 pl-4 text-left">Rating</th>
              <th
                class="p-6 pl-4 text-left rounded-r-[16px] hidden lg:table-cell"
              >
                Views
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in data"
              :key="index"
              class="rounded-[16px] outline-[1.5px] outline-solid outline-transparent hover:outline-[#313131] hover:bg-background-highlight group cursor-pointer"
              :class="{
                'bg-background-highlight': selected.includes(item),
              }"
              @click="toggleSelect(item)"
            >
              <td class="p-4 rounded-l-[16px]">
                <label
                  class="relative w-6 h-6 flex items-center shrink-0 justify-center border-2 border-[#727272] rounded-[6px] cursor-pointer"
                  @click.stop
                >
                  <input
                    type="checkbox"
                    v-model="selected"
                    :value="item"
                    class="peer hidden"
                  />
                  <span
                    class="absolute inset-0 flex items-center justify-center peer-checked:before:content-['✔'] peer-checked:before:text-green-500 peer-checked:before:text-sm"
                  ></span>
                </label>
              </td>
              <td class="p-4 w-full min-w-80 md:w-120">
                <div class="flex items-center gap-3">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-16 h-16 rounded-md object-cover"
                  />
                  <div class="w-full">
                    <div class="font-medium text-white text-base">
                      {{ item.name }}
                    </div>
                    <div
                      class="text-sm text-gray-400 block group-hover:hidden duration-100"
                    >
                      {{ item.description }}
                    </div>
                    <div
                      class="text-sm text-gray-400 hidden group-hover:flex gap-2 items-center duration-100 cursor-pointer"
                    >
                      <div
                        class="flex items-center gap-1 hover:text-white"
                        @click.stop="onEdit(item)"
                      >
                        <icons-edit-2 />
                        <span>Edit</span>
                      </div>
                      <div
                        class="flex items-center gap-1 hover:text-white"
                        @click.stop.prevent="onDelete(item)"
                      >
                        <icons-trash-2 />
                        <span>Delete</span>
                      </div>
                      <div
                        class="flex items-center gap-1 hover:text-white"
                        @click.stop
                      >
                        <icons-eye-2 />
                        <span>Unpublish</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="p-4">
                <span
                  class="px-2 py-1 text-sm rounded-md border font-medium"
                  :class="
                    item.status === 'Active'
                      ? 'bg-green-500/10 text-green-400 border-green-500/30'
                      : 'bg-red-500/10 text-red-400 border-red-500/30'
                  "
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="p-4">${{ item.price }}</td>
              <td class="p-4">
                <div class="flex flex-nowrap items-center gap-2">
                  <span>${{ item.sales.toLocaleString() }}</span>
                  <div
                    class="text-sm whitespace-nowrap hidden md:inline-block border border-solid rounded-[8px] bg-green-500/10 border-green-500/30 leading-[1] tracking-[0.175px] text-primary-02 py-1.5 px-2"
                    :class="
                      item.growth >= 0
                        ? 'text-green-400'
                        : 'text-red-400 bg-red-500/10  border-red-500/30'
                    "
                  >
                    {{ item.growth >= 0 ? "↑" : "↓" }} {{ item.growth }}%
                  </div>
                </div>
              </td>
              <td class="p-4">
                <div class="flex items-center flex-nowrap gap-1">
                  <UIcon
                    name="ant-design:star-outlined"
                    class="size-5 text-yellow-400 block group-hover:hidden"
                  />
                  <UIcon
                    name="ant-design:star-filled"
                    class="size-5 text-yellow-400 hidden group-hover:block"
                  />
                  <span class="whitespace-nowrap"
                    >{{ item.rating }} ({{ item.reviews }})</span
                  >
                </div>
              </td>
              <td class="p-4 rounded-r-[16px] hidden lg:table-cell">
                <div class="flex items-center gap-2">
                  {{ item.views }}m
                  <UProgress
                    v-model="item.views"
                    :max="300"
                    color="success"
                    class="hidden lg:block w-8"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <UModal
    v-model:open="showEditModal"
    :overlay="true"
    title="Edit Item"
    :ui="{
      footer: 'flex !justify-end gap-2',
    }"
  >
    <template #body
      ><div
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
              :popper="{ strategy: 'absolute' }"
            />
          </UFormField>

          <UFormField label="Price" class="flex-1">
            <UInput v-model="currentItem.price" type="number" class="w-full" />
          </UFormField>
        </div></div
    ></template>
    <template #footer>
      <div class="flex gap-2">
        <UButton
          color="neutral"
          variant="outline"
          @click="showEditModal = false"
        >
          Cancel
        </UButton>
        <UButton color="success" @click="saveEdit">Save</UButton>
      </div>
    </template>
  </UModal>
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
<script setup lang="ts">
import { h, resolveComponent } from "vue";
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UIcon = resolveComponent("UIcon");
const value = ref("");
const data = ref([
  {
    id: 1,
    image: "/images/6.png",
    name: "Bento Pro v.2",
    description: "UI Design Kit",
    status: "Active",
    price: 98,
    sales: 3200,
    growth: 36.8,
    rating: 4.8,
    reviews: 88,
    views: 89,
  },
  {
    id: 2,
    image: "/images/5.png",
    name: "Dashboard Kit",
    description: "Admin Templates",
    status: "Active",
    price: 120,
    sales: 5400,
    growth: 22.5,
    rating: 4.6,
    reviews: 152,
    views: 120,
  },
  {
    id: 3,
    image: "/images/4.png",
    name: "Landing Page Kit",
    description: "Marketing UI Pack",
    status: "Offline",
    price: 79,
    sales: 2600,
    growth: -5.2,
    rating: 4.3,
    reviews: 65,
    views: 45,
  },
  {
    id: 4,
    image: "/images/3.png",
    name: "Mobile UI Kit",
    description: "iOS + Android",
    status: "Offline",
    price: 150,
    sales: 8800,
    growth: 48.1,
    rating: 4.9,
    reviews: 210,
    views: 200,
  },
  {
    id: 5,
    image: "/images/2.png",
    name: "E-commerce Kit",
    description: "Shop UI Components",
    status: "Active",
    price: 110,
    sales: 4200,
    growth: 18.4,
    rating: 4.5,
    reviews: 134,
    views: 95,
  },
  {
    id: 6,
    image: "/images/6.png",
    name: "Bento Pro v.2",
    description: "UI Design Kit",
    status: "Active",
    price: 98,
    sales: 3200,
    growth: 36.8,
    rating: 4.8,
    reviews: 88,
    views: 89,
  },
]);
const statusOptions = ref(["Active", "Offline"]);
const selected = ref<any[]>([]);
const selectAll = ref(false);

const toggleAll = () => {
  if (selectAll.value) {
    selected.value = [...data.value];
  } else {
    selected.value = [];
  }
};
definePageMeta({
  title: "Released",
});
const toggleSelect = (item: any) => {
  if (selected.value.includes(item)) {
    selected.value = selected.value.filter((i) => i !== item);
  } else {
    selected.value.push(item);
  }
};
import { ref } from "vue";

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

const onEdit = (item: any) => {
  currentItem.value = { ...item };
  showEditModal.value = true;
};

const onDelete = (item: any) => {
  currentItem.value = { ...item };
  showDeleteConfirm.value = true;
};

const confirmDelete = () => {
  data.value = data.value.filter((d) => d.id !== currentItem.value.id);
  showDeleteConfirm.value = false;
};
const saveEdit = () => {
  const index = data.value.findIndex(
    (item) => item.id === currentItem.value.id
  );
  if (index !== -1) {
    data.value[index] = { ...currentItem.value };
  }
  showEditModal.value = false;
};
</script>

<style lang="scss" scoped>
:deep(tr.absolute.w-full.h-px) {
  background-color: var(--color-stroke-subtle);
}
:deep(input::placeholder) {
  color: #7b7b7b !important;
  opacity: 1;
}
input[type="checkbox"] {
  accent-color: var(--color-primary-02);
  color: white;
}

/* table {
  display: block;
  max-width: -moz-fit-content;
  max-width: fit-content;
  margin: 0 auto;
  overflow-x: auto;
  white-space: nowrap;
} */
</style>
