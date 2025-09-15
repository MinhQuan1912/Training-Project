<template>
  <div class="product-list">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row p-3 justify-between sm:items-center gap-2 sm:gap-0">
      <div class="flex flex-col sm:flex-row xs:pl-5 sm:items-center justify-between gap-2 sm:gap-6">
        <h6 class="text-primary text-base xs:text-xl leading-[145%] font-semibold">
          Products
        </h6>
        <div
          class="flex bg-background-surface1 border-[1.5px] border-stroke-subtle w-full sm:w-70 rounded-full p-3 pr-5 gap-2 text-secondary">
          <icons-search class="min-w-6" />
          <input type="search" placeholder="Search products" class="w-full text-sm leading-[150%]" v-model="searchInput"
            @keyup.enter="handleSearchProduct" />
          <div
            class="h-6 min-w-6 bg-background-surface1 text-secondary rounded-full flex opacity-0 justify-center items-center hover:bg-primary"
            :class="{ 'opacity-100 cursor-pointer': searchInput }" @click="clearSearchInput">
            <icons-close class="w-4 h-4" />
          </div>
        </div>
      </div>
      <div
        class="flex sm:hidden m:flex gap-1 text-sm leading-[100%] font-semibold h-12 w-full s:w-auto overflow-x-auto s:overflow-x-visible">
        <div v-for="(tab, idx) in tabs" :key="idx"
          class="flex justify-center items-center p-4 sm:p-6 rounded-[48px] cursor-pointer transition-all duration-300 whitespace-nowrap"
          @click="activeTab = tab" :class="{
            'text-primary border-[1.5px] border-stroke': activeTab === tab,
            'text-secondary border border-transparent': activeTab !== tab,
          }">
          {{ tab }}
        </div>
      </div>
      <div class="hidden sm:flex m:hidden items-center">
        <select-dropdown :data="tabs" v-model:selected-option="activeTab" addition-class="h-12 " />
      </div>
    </div>
    <data-table :items="searchResult" :columns="columns" :classTableTr="{
      padding: 'pb-8 xs:px-4',
      header: 'text-xs text-tertiary opacity-80 h-16.75 px-4',
      body: 'h-24 hover:bg-background-highlight transition-all duration-200 ease px-4 group/setting rounded-[16px] outline-[1.5px] outline-solid outline-transparent hover:outline-[#313131]',
      thInput: 'min-w-10 text-right',
      tdInput: 'rounded-2xl w-10 text-right',
    }">
      <!-- Product -->
      <template #column-product="{ item }">
        <div class="flex px-5 gap-5 items-center min-w-75 w-90">
          <div class="h-12 min-w-12 max-w-12 lg:h-16 lg:min-w-16 lg:max-w-16 rounded-xl overflow-hidden">
            <img :src="(item as productList).image" class=" object-cover w-full h-full" />
          </div>
          <div class="flex flex-col justify-center relative">
            <p class="font-semibold text-primary">{{ (item as productList).name }}</p>
            <p class="lg:group-hover/setting:hidden text-sm text-secondary line-clamp-2 opacity-80">{{
              (item as
              productList).type }}
            </p>
            <div
              class="hidden lg:group-hover/setting:flex gap-2 h-6 relative -left-1 text-sm leading-[100%] font-semibold text-secondary transition-all duration-200 ease">
              <button class="setting-button" @click.stop="toggleEditModal((item as productList).id)">
                <icons-edit />
                <p class="">Edit</p>
              </button>
              <button class="setting-button" @click.stop="toggleDeleteModal((item as productList).id)">
                <icons-trash />
                <p class="">Delete</p>
              </button>
              <button class="setting-button">
                <icons-share />
                <p class="">Share</p>
              </button>
            </div>
          </div>
        </div>
      </template>
      <!-- Status  -->
      <template #column-status="{ item }">
        <div class="flex items-center">
          <badge-status :status="(item as productList).status" />
        </div>
      </template>
      <!-- Price -->
      <template #column-price="{ item }">
        <div class="text-primary">
          ${{ (item as productList).price.toFixed(2) }}
        </div>
      </template>
      <!-- Sales -->
      <template #column-sales="{ item }">
        <div class="flex gap-2 items-center">
          <span class="text-primary">${{ (item as productList).sales.value?.toLocaleString('en-US') }}</span>
          <badge-trend :growth-rate="(item as productList).sales.growthRate" />
        </div>
      </template>
      <!-- Views -->
      <template #column-views="{ item }">
        <div class="flex gap-2 items-center">
          <span class="text-primary">{{ formatNum((item as productList).views.current ?? 0) }}</span>
          <div class="w-8 h-1.5 rounded-xs bg-[#7b7b7b66]">
            <div class="h-1.5 rounded-xs bg-chart-green"
              :style="{ width: (((item as productList).views.current ?? 0) / ((item as productList).views.kpi ?? 1) * 100) + '%' }">
            </div>
          </div>
        </div>
        <div
          class="flex lg:hidden gap-2 h-6 relative -left-1 text-sm leading-[100%] font-semibold text-secondary transition-all duration-200 ease">
          <button class="setting-button" @click.stop="toggleEditModal((item as productList).id)">
            <icons-edit />
            <p class="">Edit</p>
          </button>
          <button class="setting-button" @click.stop="toggleDeleteModal((item as productList).id)">
            <icons-trash />
            <p class="">Delete</p>
          </button>
          <button class="setting-button">
            <icons-share />
            <p class="">Share</p>
          </button>
        </div>
      </template>
      <!-- Likes -->
      <template #column-likes="{ item }">
        <div class="hidden xl:flex gap-2 items-center ">
          <span class="text-primary">{{ (item as productList).likes.current }}</span>
          <div class="w-8 h-1.5 rounded-xs bg-[#7b7b7b66]">
            <div class="h-1.5 rounded-xs bg-chart-green"
              :style="{ width: (((item as productList).likes.current ?? 0) / ((item as productList).likes.kpi ?? 1) * 100) + '%' }">
            </div>
          </div>
        </div>
      </template>
    </data-table>
  </div>
  <!-- Edit modal -->
  <modal-edit :isOpen="selectedEditId ? true : false" @close="toggleEditModal(null)" @save="saveEditModal">
    <form class="flex gap-x-4 gap-y-4 flex-wrap max-h-85 sm:max-h-none overflow-y-auto sm:overflow-y-visible" v-if="editProduct">
      <div class="flex gap-4 flex-col sm:flex-row w-full ">
        <div class="flex flex-col gap-4 w-full sm:w-[calc(50%-8px)] ">
          <div class="flex flex-col gap-1 xs:gap-2 w-full">
            <div class="text-base xl:text-lg">Product name</div>
            <input type="text" class="!border border-black rounded-xl p-2 text-sm xs:text-xl h-8 xs:h-12"
              v-model="editProduct.name">
          </div>
          <div class="flex flex-col gap-1 xs:gap-2 w-full">
            <div class="text-base xl:text-lg">Product type</div>
            <select-dropdown :data="typeList" v-model:selected-option="editProduct.type"
              addition-class="text-sm xs:text-xl !h-8 xs:!h-12 !text-black !p-2 rounded-xl"
              text-class="!text-black !bg-white !h-8 xs:!h-12 text-sm xs:text-xl" />
          </div>
          <div class="flex flex-col gap-1 xs:gap-2 w-full">
            <div class="text-base xl:text-lg">Product price</div>
            <input type="number" step="any" class="!border border-black rounded-xl p-2 text-sm xs:text-xl h-8 xs:h-12"
              v-model="editProduct.price">
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full sm:w-[calc(50%-8px)]">
          <div class="text-base xl:text-lg">Product image</div>
          <upload-image v-model:preview="editProduct.image" image-id="preview" fit-class="object-cover"
            addition-class="h-full aspect-square" />
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
  <!-- Delete modal -->
  <modal-delete :isOpen="selectedDeleteId ? true : false" @close="toggleDeleteModal(null)"
    @delete="deleteProduct(selectedDeleteId)" />
</template>

<script setup lang="ts">
import { useFormatNumber } from "~/composable/useFormatNumber";

const { formatNum } = useFormatNumber();
const activeTab = ref("Market");
const tabs = ref(["Market", "Traffic sources", "Viewers"]);
type productData = {
  value?: number;
  growthRate?: number;
  current?: number;
  kpi?: number;
};
type productList = {
  id: number;
  image: string;
  name: string;
  type: string;
  status: boolean;
  price: number;
  sales: productData;
  views: productData;
  likes: productData;
};
const columns = [
  {
    label: "Product",
    slot: "product",
    headerClass: "text-left min-w-85 px-5",
  },
  { label: "Status", slot: "status", headerClass: "text-left min-w-26 w-50" },
  { label: "Price", slot: "price", headerClass: "text-left min-w-21 w-45" },
  { label: "Sales", slot: "sales", headerClass: "text-left min-w-42 w-66" },
  {
    label: "Views",
    slot: "views",
    headerClass: "text-left min-w-24 w-54",
    cellClass: "rounded-r-2xl flex h-24 gap-3 justify-between lg:table-cell items-center",
  },
  {
    label: "Likes",
    slot: "likes",
    headerClass: "text-left hidden xl:table-cell w-24",
    cellClass: "rounded-r-2xl",
  },
];
const typeList = ref([
  'UI Design Kit',
  'Admin Templates',
  'Marketing UI Pack',
  'iOS + Android',
  'Shop UI Components'
])
const productList = ref<productList[]>([
  {
    id: 1,
    image: "/images/1.png",
    name: "Tasteful Bento 3D Graphics",
    type: "UI Design Kit",
    status: true,
    price: 98,
    sales: {
      value: 3200,
      growthRate: 42,
    },
    views: {
      current: 48524123,
      kpi: 100000000,
    },
    likes: {
      current: 480,
      kpi: 1000,
    },
  },
  {
    id: 2,
    image: "/images/2.png",
    name: "Flavor Fusion 3D Collection",
    type: "Admin Templates",
    status: true,
    price: 75.41,
    sales: {
      value: 6381,
      growthRate: -14,
    },
    views: {
      current: 75412553,
      kpi: 100000000,
    },
    likes: {
      current: 889,
      kpi: 1000,
    },
  },
  {
    id: 3,
    image: "/images/3.png",
    name: "Artisan Meal 3D Visuals",
    type: "Marketing UI Pack",
    status: false,
    price: 93.12,
    sales: {
      value: 4494,
      growthRate: 32,
    },
    views: {
      current: 89734513,
      kpi: 100000000,
    },
    likes: {
      current: 454,
      kpi: 1000,
    },
  },
  {
    id: 4,
    image: "/images/4.png",
    name: "Culinary  Creations 3D Illustration",
    type: "iOS + Android",
    status: true,
    price: 58.41,
    sales: {
      value: 8645,
      growthRate: -20,
    },
    views: {
      current: 14533412,
      kpi: 100000000,
    },
    likes: {
      current: 323,
      kpi: 1000,
    },
  },
  {
    id: 5,
    image: "/images/5.png",
    name: "Savory Bento 3D Design Kit",
    type: "Shop UI Components",
    status: false,
    price: 69.53,
    sales: {
      value: 5140,
      growthRate: 51,
    },
    views: {
      current: 66423143,
      kpi: 100000000,
    },
    likes: {
      current: 918,
      kpi: 1000,
    },
  },
]);
const selectedEditId = ref<number | null>(null)
const selectedDeleteId = ref<number | null>(null)
const searchInput = ref("");
const searchResult = ref<productList[]>([...productList.value]);
const editProduct = ref<Partial<productList | null>>(null)

const toggleEditModal = (id: number | null) => {
  selectedEditId.value = id
  const prod = productList.value.find(p => p.id === id)
  editProduct.value = { ...prod }
}
const saveEditModal = () => {
  const index = productList.value.findIndex(p => p.id === editProduct.value?.id)
  productList.value[index] = { ...productList.value[index], ...editProduct.value } as productList
}
watch(productList, (newVal) => {
  searchResult.value = [...newVal]
}, { deep: true })
const toggleDeleteModal = (id: number | null) => {
  selectedDeleteId.value = id
}
const deleteProduct = (id: number | null) => {
  productList.value = productList.value.filter(p => p.id !== id)
}
const handleSearchProduct = () => {
  searchResult.value = productList.value.filter((p) =>
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
};
const clearSearchInput = () => {
  searchInput.value = "";
  searchResult.value = productList.value;
};

</script>

<style lang="scss" scoped>
.product-list {
  background-color: var(--color-background-02);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox {
  appearance: none;
  background: transparent;
  border: 2px solid var(--color-stroke);
  border-radius: 6px;
  min-width: 24px;
  height: 24px;

  &:checked {
    background-color: var(--color-chart-green);
    background-image: url("/images/tick.png");
    background-repeat: no-repeat;
    background-position: center;
  }
}

td:first-child {
  padding-left: 16px;
  padding-right: 24px;
}
</style>
