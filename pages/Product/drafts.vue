<template>
  <div class="container overflow-hidden">
    <div class="w-full flex justify-between items-center">
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
    </div>
    <div
      class="mt-6 p-1 grid md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-4 xxl:grid-cols-5 gap-6"
    >
      <ProductsDraftCard
        v-for="(item, index) in data"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :image="item.image"
        :price="item.price"
        :date="item.date"
        @edit="onEdit(item)"
        @delete="onDelete(item)"
      />
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
