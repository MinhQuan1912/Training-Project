<template>
  <div class="container overflow-hidden">
    <div class="border-cus-4 min-h-[85dvh] min-w-full">
      <div class="p-3 w-full flex justify-between items-center">
        <div class="flex flex-col xs:flex-row gap-2 xs:gap-6 xs:items-center w-full sm:w-auto">
          <h2 class="text-primary text-6 leading-[145%] tracking-[0.06px]">
            Products
          </h2>
          <UInput v-model="value" placeholder="Search products" icon="i-lucide-search" color="success" :ui="{
            root: 'text-secondary',
            base: 'p-3 pl-9 border-1 !text-secondary shadow-3 w-full sm:w-62 text-sm leading-[150%] tracking-[0.035px]',
            leadingIcon: 'text-secondary',
          }" @keydown.enter="handleSearch">
          </UInput>
        </div>
        <div class="gap-2 items-center flex text-secondary">
          <div @click="layout = 'grid'" :class="{
            'border border-solid border-[#282828] rounded-full text-primary': layout === 'grid',
          }">
            <icons-sort class="transition-all duration-200 ease cursor-pointer hover:text-primary" />
          </div>
          <div @click="layout = 'list'" :class="{
            'border border-solid border-[#282828] rounded-full text-primary': layout === 'list',
          }" class="w-12 h-12 flex justify-center items-center">
            <icons-list class="transition-all duration-200 ease cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>
      <div v-if="layout === 'list'">
        <DataTable :items="results" :columns="columns" :classTableTr="{
          padding: 'pb-8 xs:px-4',
          header: 'text-xs text-tertiary opacity-80 h-16.75 px-4',
          body: 'h-24 hover:bg-background-highlight transition-all duration-200 ease px-4 group/setting rounded-[16px] outline-[1.5px] outline-solid outline-transparent hover:outline-[#313131]',
          thInput: 'min-w-10 text-right',
          tdInput: 'rounded-2xl w-10 text-right',
        }">
          <template #column-product="{ item }">
            <div class="flex px-5 gap-5 items-center xs:min-w-75 max-w-50 xs:max-w-none truncate">
              <div class="h-12 min-w-12 max-w-12 lg:h-16 lg:min-w-16 lg:max-w-16 rounded-xl overflow-hidden">
                <img :src="(item as Data).image" :alt="(item as Data).name" loading="lazy" decoding="async"
                  class="object-cover w-full h-full" />
              </div>
              <div class="flex flex-col justify-center relative">
                <p class="font-semibold text-primary">{{ (item as Data).name }}</p>
                <p class="lg:group-hover/setting:hidden text-sm text-secondary line-clamp-2 opacity-80 xs:min-w-63">{{
                  (item as
                    Data).description }}
                </p>
                <div
                  class="hidden lg:group-hover/setting:flex gap-2 h-6 relative -left-1 text-sm leading-[100%] font-semibold text-secondary transition-all duration-200 ease">
                  <button class="setting-button" @click.stop="toggleEditModal((item as Data).id)">
                    <icons-edit />
                    <p class="">Edit</p>
                  </button>
                  <button class="setting-button" @click.stop="toggleDeleteModal((item as Data).id)">
                    <icons-trash />
                    <p class="">Delete</p>
                  </button>
                  <button class="setting-button">
                    <icons-hide />
                    <p class="">Unpublish</p>
                  </button>
                </div>
              </div>
            </div>
          </template>
          <!-- Status -->
          <template #column-status="{ item }">
            <div class="flex items-center">
              <badge-status :status="(item as Data).status" />
            </div>
          </template>
          <!-- Price -->`
          <template #column-price="{ item }">
            <div class="text-primary">
              ${{ (item as Data).price.toLocaleString() }}
            </div>
          </template>
          <!-- Sales -->
          <template #column-sales="{ item }">
            <div class="flex gap-2 items-center">
              <span class="text-primary">${{ (item as Data).sales.toLocaleString('en-US') }}</span>
              <badge-trend :growth-rate="(item as Data).growth" />
            </div>
          </template>
          <!-- Rating -->
          <template #column-rating="{ item }">
            <div class="flex items-center flex-nowrap gap-1">
              <div class="text-secondary group-hover/setting:text-chart-yellow">
                <icons-star />
              </div>
              <p class="whitespace-nowrap text-primary">
                {{ (item as Data).rating }} <span class="!text-secondary">({{ (item as Data).reviews }})</span>
              </p>
            </div>
            <div
              class="flex lg:hidden gap-2 h-6 relative -left-1 text-sm leading-[100%] font-semibold text-secondary transition-all duration-200 ease">
              <button class="setting-button" @click.stop="toggleEditModal((item as Data).id)">
                <icons-edit />
                <p class="">Edit</p>
              </button>
              <button class="setting-button" @click.stop="toggleDeleteModal((item as Data).id)">
                <icons-trash />
                <p class="">Delete</p>
              </button>
              <button class="setting-button">
                <icons-hide />
                <p class="">Unpublish</p>
              </button>
            </div>
          </template>
          <!-- Views -->
          <template #column-views="{ item }">
            <div class="flex gap-2 items-center">
              <span class="text-primary">{{ formatNum((item as Data).views) }}</span>
              <div class="w-8 h-1.5 rounded-xs bg-[#7b7b7b66]">
                <div class="h-1.5 rounded-xs bg-chart-green"
                  :style="{ width: (((item as Data).views ?? 0) / 300 * 100) + '%' }">
                </div>
              </div>
            </div>
          </template>
        </DataTable>
      </div>
      <div v-if="layout === 'grid'"
        class="md:p-8 xs:py-5 grid xs:grid-cols-2 md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 overflow-hidden">
        <ProductsDraftCard v-for="(item, index) in results" :key="item.id" :id="item.id" :title="item.name"
          :image="item.image" :price="item.price" @edit="toggleEditModal(item.id)" @delete="toggleDeleteModal(item.id)"
          @editBefore="toggleEditModal(results[index - 1]?.id ?? null)"
          @editAfter="toggleEditModal(results[index + 1]?.id ?? null)"
          @deleteBefore="toggleDeleteModal(results[index - 1]?.id ?? null)"
          @deleteAfter="toggleDeleteModal(results[index + 1]?.id ?? null)"
          :class="index % 3 !== 1 ? 'md:opacity-0 lg:opacity-100' : ''" v-bind="index % 3 === 1 ? {
            'item-before':
              results[index - 1] || null, 'item-after': results[index + 1] || null,
          } : {}" />
      </div>
    </div>
  </div>

  <modal-edit :isOpen="selectedEditId ? true : false" @close="toggleEditModal(null)" @save="saveEditModal">
    <form class="flex gap-x-4 gap-y-4 flex-wrap max-h-85 sm:max-h-none overflow-y-auto sm:overflow-y-visible"
      v-if="editProduct">
      <div class="flex gap-4 flex-col sm:flex-row w-full ">
        <div class="flex flex-col gap-4 w-full sm:w-[calc(50%-8px)] ">
          <div class="flex flex-col gap-1 xs:gap-2 w-full">
            <div class="text-base xl:text-lg">Product name</div>
            <input type="text" class="!border-[1.5px] border-black rounded-xl p-2 text-sm xs:text-xl h-8 xs:h-12"
              v-model="editProduct.name">
          </div>
          <div class="flex flex-col gap-1 xs:gap-2 w-full">
            <div class="text-base xl:text-lg">Product type</div>
            <select-dropdown :data="typeList" v-model:selected-option="editProduct.description"
              addition-class="text-sm xs:text-xl h-8 xs:h-12 !text-black !p-2 rounded-xl"
              text-class="!text-black !bg-white !h-8 xs:!h-12 text-sm xs:text-xl" />
          </div>
          <div class="flex flex-col gap-1 xs:gap-2 w-full">
            <div class="text-base xl:text-lg">Product price</div>
            <input type="number" class="!border-[1.5px] border-black rounded-xl p-2 text-sm xs:text-xl h-8 xs:h-12"
              v-model="editProduct.price">
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full sm:w-[calc(50%-8px)]">
          <div class="text-base xl:text-lg">Product image</div>
          <upload-image v-model:preview="editProduct.image" image-id="preview" fit-class="object-cover"
            addition-class="h-full aspect-[1/1] bg-white" />
        </div>
      </div>
      <div class="flex flex-col gap-1 xs:gap-2 w-full">
        <div class="text-base xl:text-lg">Product status</div>
        <div class="flex justify-between items-center gap-5">
          <label
            class="flex justify-center items-center flex-1 h-12 border-3 rounded-xl cursor-pointer transition-colors duration-200 ease"
            :class="editProduct.status === true
              ? 'bg-primary-02 text-white border-primary-02'
              : 'border-primary-02 text-primary-02 hover:text-white hover:bg-primary-02'">
            <input type="radio" class="hidden" :value="true" v-model="editProduct.status" />
            Active
          </label>
          <label
            class="flex justify-center items-center flex-1 h-12 border-3 rounded-xl cursor-pointer transition-colors duration-200 ease"
            :class="editProduct.status === false
              ? 'bg-[#ff6a55] text-white border-[#ff6a55]'
              : 'border-[#ff6a55] text-[#ff6a55] hover:text-white hover:bg-[#ff6a55]'">
            <input type="radio" class="hidden" :value="false" v-model="editProduct.status" />
            Offline
          </label>
        </div>
      </div>
    </form>
  </modal-edit>
  <modal-delete :isOpen="selectedDeleteId ? true : false" @close="toggleDeleteModal(null)"
    @delete="deleteProduct(selectedDeleteId)" />
</template>
<script setup lang="ts">
import { h, resolveComponent } from "vue";
import { useFormatNumber } from "~/composable/useFormatNumber";
const UButton = resolveComponent("UButton");
const UCheckbox = resolveComponent("UCheckbox");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UIcon = resolveComponent("UIcon");
const value = ref("");
const { formatNum } = useFormatNumber()
type Data = {
  id: number,
  image: string,
  name: string,
  description: string,
  status: boolean,
  price: number,
  sales: number,
  growth: number,
  rating: number,
  reviews: number,
  views: number
}
const data = ref<Data[]>([
  {
    id: 1,
    image: "/images/6.png",
    name: "Bento Pro v.2",
    description: "UI Design Kit",
    status: true,
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
    status: true,
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
    status: false,
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
    status: true,
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
    status: true,
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
    status: false,
    price: 98,
    sales: 3200,
    growth: 36.8,
    rating: 4.8,
    reviews: 88,
    views: 89,
  },
]);
const columns = [
  { slot: "product", label: "Product", headerClass: "text-left px-5 min-w-70 w-160" },
  { slot: "status", label: "Status", headerClass: "text-left min-w-23 w-49.5" },
  { slot: "price", label: "Price", headerClass: "text-left min-w-18 w-44.5" },
  { slot: "sales", label: "Sales", headerClass: "text-left min-w-40 w-65.5" },
  { slot: "rating", label: "Rating", headerClass: "text-left min-w-23 w-49.5", cellClass: "rounded-r-2xl flex h-24 gap-9 justify-between lg:table-cell items-center" },
  { slot: "views", label: "Views", headerClass: "text-left hidden xl:table-cell w-24", cellClass: "rounded-r-2xl hidden xl:table-cell" },
]
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

const results = ref<Data[]>([...data.value])

const handleSearch = () => {
  results.value = data.value.filter((p) =>
    p.name.toLowerCase().includes(value.value.toLowerCase())
  );
};
const typeList = ref([
  'UI Design Kit',
  'Admin Templates',
  'Marketing UI Pack',
  'iOS + Android',
  'Shop UI Components'
])

const layout = ref("list");

definePageMeta({
  title: "Released",
});
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
