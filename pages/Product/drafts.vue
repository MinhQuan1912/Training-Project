<template>
  <div class="container">
    <div class="overflow-hidden border-cus-4">
      <div class="w-full flex justify-between items-center py-3 px-3 gap-3">
        <div class="flex flex-col xs:flex-row gap-2 xs:gap-6 xs:items-center w-full sm:w-auto">
          <h2 class="text-primary text-6 leading-[145%] tracking-[0.06px] xs:pl-5 pt-2 xs:pt-0">
            Products
          </h2>
          <UInput v-model="value" placeholder="Search products" icon="i-lucide-search" color="success" :ui="{
            root: 'text-secondary flex-1',
            base: 'p-3 pl-9 border-1 !text-secondary shadow-3 w-40 sm:w-62 text-sm leading-[150%] tracking-[0.035px] w-full',
            leadingIcon: 'text-secondary',
          }" @keydown.enter="handleSearch">
          </UInput>
        </div>
        <div class="gap-2 items-center flex text-secondary">
          <div @click="layout = 'grid'" :class="{
            'border border-solid border-[#282828] rounded-full text-primary ': layout === 'grid',
          }">
            <icons-sort class="transition-all duration-200 ease cursor-pointer hover:text-primary" />
          </div>
          <div @click="layout = 'list'" :class="{
            'border border-solid border-[#282828] rounded-full text-primary': layout === 'list'
          }" class="w-12 h-12 flex justify-center items-center">
            <icons-list class="transition-all duration-200 ease cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>
      <div v-if="layout === 'grid'"
        class=" md:p-8 xs:py-5 grid xs:grid-cols-2 md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        <ProductsDraftCard v-for="(item, index) in results" :key="item.id" :id="item.id" :title="item.title"
          :image="item.image" :price="item.price" :date="item.date" @edit="toggleEditModal(item.id)"
          @delete="toggleDeleteModal(item.id)" @editBefore="toggleEditModal(results[index - 1]?.id ?? null)"
          @editAfter="toggleEditModal(results[index + 1]?.id ?? null)"
          @deleteBefore="toggleDeleteModal(results[index - 1]?.id ?? null)"
          @deleteAfter="toggleDeleteModal(results[index + 1]?.id ?? null)"
          :class="index % 3 !== 1 ? 'md:opacity-0 lg:opacity-100' : ''" v-bind="index % 3 === 1
            ? {
              'item-before': results[index - 1] || null,
              'item-after': results[index + 1] || null,
            }
            : {}
            " />
      </div>
      <div v-if="layout === 'list'">
        <DataTable :items="results" :columns="columns" :classTableTr="{
          header: 'rounded-[16px] p-4 ',
          body: 'rounded-[16px] outline-[1.5px] outline-solid outline-transparent hover:outline-[#313131] hover:bg-background-highlight group cursor-pointer',
  tdInput: 'min-w-10 w-10 text-right rounded-2xl',
          thInput: 'min-w-10 w-10 text-right ',
          padding: 'pb-8 px-4'
        }"
          tHeadClass="w-full table-fixed rounded-xl text-tertiary text-xs font-normal leading-[160%] tracking-[0.048px]">
          <!-- Product -->
          <template #column-product="{ item }">
            <div class="flex items-center gap-3">
              <div class="h-12 min-w-12 max-w-12 lg:h-16 lg:min-w-16 lg:max-w-16 rounded-xl overflow-hidden">
                <img :src="(item as Data).image" :alt="(item as Data).title" loading="lazy" decoding="async"
                  class="object-cover w-full h-full" />
              </div>
              <div class="w-full">
                <div class="font-medium text-primary text-base leading-[150%]">
                  {{ (item as Data).title }}
                </div>
                <div class="text-sm text-secondary opacity-80">
                  {{ formatDate((item as Data).date) }}
                </div>
              </div>
            </div>
          </template>
          <!--  Price -->
          <template #column-price="{ item }">
            <div class="text-primary ">
              ${{ (item as Data).price.toFixed(2) }}
            </div>
            <div class="text-sm text-secondary flex gap-3 items-center duration-100 cursor-pointer">
              <div class="flex items-center gap-1 hover:text-white transition-colors duration-250 ease"
                @click.stop="toggleEditModal((item as Data).id)">
                <icons-edit-2 />
                <span>Edit</span>
              </div>
              <div class="flex items-center gap-1 hover:text-white transition-colors duration-250 ease"
                @click.stop.prevent="toggleDeleteModal((item as Data).id)">
                <icons-trash-2 />
                <span>Delete</span>
              </div>
              <div class="flex items-center gap-1 hover:text-white transition-colors duration-250 ease" @click.stop>
                <icons-eye-2 />
                <span>Unpublish</span>
              </div>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
  <modal-edit :isOpen="selectedEditId ? true : false" @close="toggleEditModal(null)" @save="saveEditModal">
    <form class="flex gap-x-4 gap-y-4 flex-wrap max-h-75 md:max-h-none overflow-y-auto md:overflow-y-visible"
      v-if="editProduct">
      <div class="flex gap-4 w-full">
        <div class="text-base flex items-center xl:text-lg w-1/2">Product image</div>
        <upload-image v-model:preview="editProduct.image" image-id="preview" fit-class="object-cover"
          addition-class="!w-[calc(50%-8px)] !h-auto aspect-square" />
      </div>
      <div class="flex flex-col gap-1 xs:gap-2 w-full">
        <div class="text-base xl:text-lg">Product name</div>
        <input type="text" class="!border-[1.5px] border-black rounded-xl p-2 text-sm xs:text-xl h-8 xs:h-12"
          v-model="editProduct.title">
      </div>
      <div class="flex flex-col gap-1 xs:gap-2 w-full xs:w-[calc(50%-8px)]">
        <div class="text-base xl:text-lg">Product price</div>
        <input type="number" class="!border-[1.5px] border-black rounded-xl p-2 text-sm xs:text-xl h-8 xs:h-12"
          v-model="editProduct.price">
      </div>
      <div class="flex flex-col gap-1 xs:gap-2 w-full xs:w-[calc(50%-8px)]">
        <div class="text-base xl:text-lg">Schedule time</div>
        <input type="datetime-local" class="!border-[1.5px] border-black rounded-xl p-2 text-sm xs:text-xl h-8 xs:h-12"
          v-model="editProduct.date" />
      </div>
    </form>
  </modal-edit>
  <modal-delete :isOpen="selectedDeleteId ? true : false" @close="toggleDeleteModal(null)"
    @delete="deleteProduct(selectedDeleteId)" />
</template>
<script setup lang="ts">
import { h, resolveComponent } from "vue";
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UIcon = resolveComponent("UIcon");
const layout = ref("grid");
const value = ref("");
type Data = {
  id: number,
  title: string,
  image: string,
  price: number,
  date: string
}
const data = ref<Data[]>([
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
const columns = [
  {
    label: "Product",
    slot: "product",
    headerClass: "p-6 pl-4 text-left min-w-80 md:w-120",
    cellClass: "p-4 w-full min-w-80 md:w-120 rounded-r-2xl",
  },
  {
    label: "Price",
    slot: "price",
    headerClass: "p-6 pl-4 text-left",
    cellClass: "p-4 flex justify-between h-24 items-center gap-8 rounded-r-2xl",
  },
];

const results = ref<Data[]>([...data.value])

const handleSearch = () => {
  results.value = data.value.filter((p) =>
    p.title.toLowerCase().includes(value.value.toLowerCase())
  );
};

const selectedEditId = ref<number | null>(null)
const selectedDeleteId = ref<number | null>(null)
const editProduct = ref<Partial<Data | null>>(null)
const toggleEditModal = (id: number | null) => {
  selectedEditId.value = id
  const prod = data.value.find(p => p.id === id)
  editProduct.value = { ...prod }
}
const saveEditModal = () => {
  const index = data.value.findIndex(p => p.id === editProduct.value?.id)
  data.value[index] = { ...data.value[index], ...editProduct.value } as Data
}
watch(data, (newVal) => {
  results.value = [...newVal]
}, { deep: true })
const toggleDeleteModal = (id: number | null) => {
  selectedDeleteId.value = id
}
const deleteProduct = (id: number | null) => {
  data.value = data.value.filter(p => p.id !== id)
}
function formatDate(value: string) {
  const d = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(d)
    .replace(",", " at");
}
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
