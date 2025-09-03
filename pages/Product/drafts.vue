<template>
  <div class="container">
    <div class="overflow-hidden border-cus-4">
      <div class="w-full flex justify-between items-center py-3 px-3">
        <div class="flex gap-6 items-center">
          <h2 class="text-primary text-6 leading-[145%] tracking-[0.06px] pl-5">
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
            @keydown.enter="handleSearch"
          >
          </UInput>
        </div>
        <div class="gap-2 items-center hidden sm:flex">
          <div
            @click="layout = 'grid'"
            :class="{
              'border border-solid border-[#282828]': layout === 'grid',
            }"
            class="rounded-full"
          >
            <icons-sort class="cursor-pointer hover:opacity-40" />
          </div>
          <div
            @click="layout = 'list'"
            :class="{
              'border border-solid border-[#282828]': layout === 'list',
            }"
            class="rounded-full"
          >
            <icons-list class="cursor-pointer hover:opacity-40" />
          </div>
        </div>
      </div>
      <div
        v-if="layout === 'grid'"
        class="p-8 pt-5 grid md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-4 xxl:grid-cols-5 gap-4 md:gap-6"
      >
        <ProductsDraftCard
          v-for="(item, index) in results"
          :key="item.id"
          :id="item.id"
          :title="item.title"
          :image="item.image"
          :price="item.price"
          :date="item.date"
          @edit="onEdit(item)"
          @delete="onDelete(item)"
          @editBefore="onEdit(results[index - 1])"
          @editAfter="onEdit(results[index + 1])"
          @deleteBefore="onDelete(results[index - 1])"
          @deleteAfter="onDelete(results[index + 1])"
          :class="index % 3 !== 1 ? 'md:opacity-0 lg:opacity-100' : ''"
          v-bind="
            index % 3 === 1
              ? {
                  'item-before': results[index - 1] || null,
                  'item-after': results[index + 1] || null,
                }
              : {}
          "
        />
      </div>
      <div
        v-if="layout === 'list'"
        class="mt-3 p-4 overflow-x-auto custom-scroll"
      >
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
              <th class="p-6 pl-4 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in results"
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
                    :alt="item.title"
                    class="w-16 h-16 rounded-md object-cover"
                  />
                  <div class="w-full">
                    <div class="font-medium text-white text-base">
                      {{ item.title }}
                    </div>
                    <div
                      class="text-sm text-gray-400 block group-hover:hidden duration-100"
                    >
                      {{ item.date }}
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
              <td class="p-4">${{ item.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Transition name="fade-zoom">
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <UCard class="w-[50dvw]">
        <template #header>
          <h2 class="text-lg font-semibold">Edit Item</h2>
        </template>

        <div
          class="flex flex-col gap-4 overflow-y-auto max-h-[50vh] custom-scroll"
        >
          <UFormField label="Title">
            <UInput
              v-model="currentItem.title"
              placeholder="Enter title"
              class="w-full"
            />
          </UFormField>

          <div class="flex gap-2 w-full">
            <UFormField label="Date" class="flex-1">
              <UInput
                v-model="currentItem.date"
                type="datetime-local"
                class="w-full"
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
            Bạn có chắc chắn muốn xóa <b>{{ currentItem?.title }}</b> không?
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
const layout = ref("grid");
const selectAll = ref(false);
const selected = ref<any[]>([]);
const toggleAll = () => {
  if (selectAll.value) {
    selected.value = [...data.value];
  } else {
    selected.value = [];
  }
};
const toggleSelect = (item: any) => {
  if (selected.value.includes(item)) {
    selected.value = selected.value.filter((i) => i !== item);
  } else {
    selected.value.push(item);
  }
};
const value = ref("");
const data = ref([
  {
    id: 1,
    title: "Bento Design System",
    image: "/images/bento-1.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 2,
    title: "Core Dashboard Builder 1.0",
    image: "/images/bento-2.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 3,
    title: "Bento Design System",
    image: "/images/bento-3.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 4,
    title: "Bento Pro v. 2",
    image: "/images/bento-4.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 5,
    title: "Bento Pro v. 2",
    image: "/images/bento-1.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 6,
    title: "Bento Pro v. 2",
    image: "/images/bento-2.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 7,
    title: "Bento Design System",
    image: "/images/bento-3.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 8,
    title: "Bento Pro v. 2",
    image: "/images/bento-4.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 9,
    title: "Bento Pro v. 2",
    image: "/images/bento-1.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
  {
    id: 10,
    title: "Bento Pro v. 2",
    image: "/images/bento-2.jpg",
    price: 98,
    date: "2044-04-09T15:55:00Z",
  },
]);
const keyword = ref("");
const results = computed(() => {
  const kw = keyword.value.trim().toLowerCase();
  return kw
    ? data.value.filter((i) => i.title.toLowerCase().includes(kw))
    : data.value;
});

const handleSearch = () => {
  keyword.value = value.value;
};
const showEditModal = ref(false);
const showDeleteConfirm = ref(false);
const currentItem = ref({
  id: 0,
  title: "",
  image: "",
  price: 0,
  date: "",
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

definePageMeta({
  title: "Drafts",
});
</script>

<style lang="scss" scoped>
:deep(input::placeholder) {
  color: #7b7b7b !important;
  opacity: 1;
}
</style>
