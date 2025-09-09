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
    <!-- Table -->
    <!-- <div class="xs:px-4 pb-8 overflow-x-auto min-w-full">
      <table class="min-w-full text-sm text-primary leading-[150%]">
        <thead>
          <tr
            class="justify-between items-center gap-6 px-4 text-xs text-tertiary opacity-80 h-16.75"
          >
            <th
              class="w-94 2xl:min-w-128 cursor-pointer group"
              @click="chooseAll"
            >
              <div class="flex gap-5 items-center px-4">
                <input
                  type="checkbox"
                  class="checkbox group-hover:!border-shade05-50"
                  :checked="selectedAll"
                />
                Product
              </div>
            </th>
            <th class="text-left">Status</th>
            <th class="text-left">Price</th>
            <th class="text-left">Sales</th>
            <th class="text-left">Views</th>
            <th class="text-left hidden xl:table-cell">Likes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in searchResult" :key="product.id" class="h-24 rounded-xl hover:bg-background-highlight outline outline-solid outline-transparent hover:outline-shade05-50 group
                        transition-all duration-200 ease" @click="handleSelectRow(product.id)">
            
            <td class="rounded-l-xl group/setting">
              <div class="flex gap-5 items-center min-w-75">
                <input
                  type="checkbox"
                  class="checkbox group-hover:!border-shade05-50"
                  v-model="selectedId"
                  :value="product.id"
                />
                <img
                  :src="product.image"
                  class="h-12 w-12 md:h-16 md:w-16 object-contain"
                />
                <div class="flex flex-col justify-center">
                  <p class="font-semibold">{{ product.name }}</p>
                  <p
                    class="min-h-6 text-sm text-secondary group-hover/setting:hidden transition-all duration-200 ease line-clamp-2"
                  >
                    {{ product.type }}
                  </p>
                  <div
                    class="hidden group-hover/setting:flex gap-2 h-6 relative -left-1 text-sm leading-[100%] font-semibold text-secondary transition-all duration-200 ease"
                  >
                    <button class="setting-button">
                      <icons-edit />
                      <p class="">Edit</p>
                    </button>
                    <button class="setting-button">
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
            </td>
            
            <td class="min-w-26 flex-1">
              <badge-status :status="product.status" class="w-20" />
            </td>
            
            <td class="min-w-21 flex-1">
              <div class="min-w-21 flex-1">${{ product.price.toFixed(2) }}</div>
            </td>
            
            <td class="min-w-42 flex-1">
              <div class="flex gap-2 items-center">
                <span>${{ product.sales.value?.toLocaleString("en-US") }}</span>
                <badge-trend :growth-rate="product.sales.growthRate" />
              </div>
            </td>
            
            <td class="min-w-24 flex-1 ">
              <div class="flex gap-2 items-center">
                <span>{{
                  product.views.current ? formatNum(product.views.current) : 0
                }}</span>
                <div class="w-8 h-1.5 rounded-xs bg-[#7B7B7B66]">
                  <div
                    class="h-1.5 rounded-xs bg-chart-green"
                    :style="{
                      width:
                        product.views.current && product.views.kpi
                          ? (product.views.current / product.views.kpi) * 100 +
                            '%'
                          : '0%',
                    }"
                  ></div>
                </div>
              </div>
            </td>
            
            <td class="w-24 hidden xl:table-cell rounded-r-xl">
              <div class="flex gap-2 items-center">
                <span>{{ product.likes.current }}</span>
                <div class="w-8 h-1.5 rounded-xs bg-[#7B7B7B66]">
                  <div
                    class="h-1.5 rounded-xs bg-chart-green"
                    :style="{
                      width:
                        product.likes.current && product.likes.kpi
                          ? (product.likes.current / product.likes.kpi) * 100 +
                            '%'
                          : '0%',
                    }"
                  ></div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <data-table :items="searchResult" :columns="columns" :classTableTr="{
      padding: 'pb-8 px-4',
      header: 'text-xs text-tertiary opacity-80 h-16.75 px-4',
      body: 'h-24 hover:bg-background-highlight transition-all duration-200 ease px-4 group/setting',
      thInput: 'min-w-10 text-right',
      tdInput: 'rounded-2xl w-10 text-right'
    }">
      <!-- Product -->
      <template #column-product="{ item }">
        <div class="flex px-5 gap-5 items-center min-w-75">
          <img :src="(item as productList).image" class="h-12 w-12 lg:h-16 lg:w-16 object-contain" />
          <div class="flex flex-col justify-center relative">
            <p class="font-semibold text-primary">{{ (item as productList).name }}</p>
            <p class="group-hover/setting:hidden text-sm text-secondary line-clamp-2 opacity-80">{{ (item as
              productList).type }}
            </p>
            <div
              class="hidden group-hover/setting:flex gap-2 h-6 relative -left-1 text-sm leading-[100%] font-semibold text-secondary transition-all duration-200 ease">
              <button class="setting-button" @click.stop="toggleEditModal((item as productList).id)">
                <icons-edit />
                <p class="">Edit</p>
              </button>
              <modal-edit :isOpen="selectedEditId === (item as productList).id" @close="toggleEditModal(null)"
                :item="(item as productList)" @save="saveEditModal" />
              <button class="setting-button" @click.stop="toggleDeleteModal((item as productList).id)">
                <icons-trash />
                <p class="">Delete</p>
              </button>
              <modal-delete :isOpen="selectedDeleteId === (item as productList).id" @close="toggleDeleteModal(null)"
                :item="(item as productList)" @delete="deleteProduct" />
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
  id: number,
  image: string,
  name: string,
  type: string,
  status: boolean,
  price: number,
  sales: productData,
  views: productData,
  likes: productData
}
const columns = [
  { label: "Product", slot: "product", headerClass: "text-left min-w-85  px-5" },
  { label: "Status", slot: "status", headerClass: "text-left min-w-26 w-50" },
  { label: "Price", slot: "price", headerClass: "text-left min-w-21 w-45" },
  { label: "Sales", slot: "sales", headerClass: "text-left min-w-42 w-66" },
  { label: "Views", slot: "views", headerClass: "text-left min-w-24 w-54", cellClass: "rounded-r-2xl" },
  { label: "Likes", slot: "likes", headerClass: "text-left hidden xl:table-cell w-24", cellClass: "rounded-r-2xl" },
];

const productList = ref<productList[]>([
  {
    id: 1,
    image: "/images/1.png",
    name: "Tasteful Bento 3D Graphics",
    type: "UI Design Kit UI Design Kit UI Design Kit UI Design Kit ",
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
    type: "UI Design Kit",
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
    type: "UI Design Kit",
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
    type: "UI Design Kit",
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
    type: "UI Design Kit",
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
const selectedId = ref<number[]>([]);
const selectedAll = computed(() => {
  return selectedId.value.length === productList.value.length;
});
const toggleEditModal = (id: number | null) => {
  selectedEditId.value = id
}
const saveEditModal = (newProd: productList) => {
  const index = productList.value.findIndex(p => p.id === newProd.id)
  productList.value[index] = { ...productList.value[index], ...newProd }
  toggleEditModal(null)
}
watch(productList, (newVal) => {
  searchResult.value = [...newVal]
}, { deep: true })
const toggleDeleteModal = (id: number | null) => {
  selectedDeleteId.value = id
}
const deleteProduct = (id: number) => {
  productList.value = productList.value.filter(p => p.id !== id)
}
const chooseAll = () => {
  if (selectedAll.value) {
    selectedId.value = [];
  } else {
    selectedId.value = productList.value.map((p) => p.id);
  }
};
const handleSelectRow = (id: number) => {
  if (selectedId.value.includes(id)) {
    selectedId.value = selectedId.value.filter((i) => i !== id);
  } else {
    selectedId.value.push(id);
  }
};
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

.setting-button {
  display: flex;
  padding: 4px;
  padding-left: 6px;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border: 1.5px solid transparent;

  &:hover {
    border: 1.5px solid var(--color-shade05-50);
    border-radius: 6px;
    color: var(--color-primary);

    p {
      opacity: 80%;
    }
  }
}
</style>
