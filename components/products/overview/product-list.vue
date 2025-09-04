<template>
  <div class="product-list">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row p-3 justify-between sm:items-center gap-2 sm:gap-0">
      <div class="flex flex-col sm:flex-row pl-5 sm:items-center justify-between gap-2 sm:gap-6">
        <h6 class="text-primary text-xl leading-[145%] font-semibold">Products</h6>
        <div
          class="flex bg-background-surface1 border-[1.5px] border-stroke-subtle w-full sm:w-70 rounded-full p-3 pr-5 gap-2 text-secondary">
          <icons-search class="min-w-6" />
          <input type="search" placeholder="Search products" class="w-full text-sm leading-[150%]" v-model="searchInput"
            @keyup.enter="handleSearchProduct">
          <div
            class="h-6 min-w-6 bg-background-surface1 text-secondary rounded-full flex opacity-0 justify-center items-center hover:bg-primary"
            :class="{ 'opacity-100 cursor-pointer': searchInput }" @click="clearSearchInput">
            <icons-close class="w-4 h-4" />
          </div>
        </div>
      </div>
      <div class="flex sm:hidden m:flex gap-1 text-sm leading-[100%] font-semibold h-12">
        <div v-for="(tab, idx) in tabs" :key="idx"
          class="flex justify-center items-center p-4 sm:p-6 rounded-[48px] cursor-pointer transition-all duration-300"
          @click="activeTab = tab" :class="{
            'text-primary border-[1.5px] border-stroke': activeTab === tab,
            'text-secondary border border-transparent': activeTab !== tab
          }">{{ tab }}
        </div>
      </div>
      <div class="hidden sm:flex m:hidden items-center">
        <select-dropdown :data="tabs" v-model:selected-option="activeTab" addition-class="h-12 "/>
      </div>
    </div>
    <!-- Table -->
    <div class="px-4 pb-8 overflow-x-auto min-w-full">
      <table class="w-full text-sm text-primary leading-[150%]">
        <thead>
          <tr class="justify-between items-center gap-6 px-4 text-xs text-tertiary opacity-80 h-16.75">
            <th class="w-94 2xl:min-w-128 cursor-pointer group" @click="chooseAll">
              <div class="flex gap-5 items-center px-4 ">
                <input type="checkbox" class="checkbox group-hover:!border-shade05-50 " :checked="selectedAll" />
                Product
              </div>
            </th>
            <th class="w-26 2xl:w-50 text-left">Status</th>
            <th class="w-21 2xl:w-45 text-left">Price</th>
            <th class="w-42 2xl:w-66 text-left">Sales</th>
            <th class="2xl:w-54 text-left">Views</th>
            <th class="w-24 text-left hidden 2xl:table-cell">Likes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in searchResult" :key="product.id" class="h-24 rounded-xl hover:bg-background-highlight outline outline-solid outline-transparent hover:outline-shade05-50 group
                        transition-all duration-200 ease" @click="handleSelectRow(product.id)">
            <!-- Product -->
            <td class="rounded-l-xl group/setting">
              <div class="flex gap-5 items-center min-w-75">
                <input type="checkbox" class="checkbox group-hover:!border-shade05-50" v-model="selectedId"
                  :value="product.id" />
                <img :src="product.image" class="h-16 w-16 object-contain" />
                <div class="flex flex-col justify-center">
                  <p class="font-semibold ">{{ product.name }}</p>
                  <p
                    class="min-h-6 text-sm text-secondary group-hover/setting:hidden transition-all duration-200 ease line-clamp-2">
                    {{ product.type }}</p>
                  <div
                    class="hidden group-hover/setting:flex gap-2 h-6 relative -left-1 text-sm leading-[100%] font-semibold text-secondary transition-all duration-200 ease">
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
            <!-- Status -->
            <td>
              <badge-status :status="product.status" class="w-20" />
            </td>
            <!-- Price -->
            <td>${{ product.price.toFixed(2) }}</td>
            <!-- Sales -->
            <td>
              <div class="flex gap-2 items-center">
                <span>${{ product.sales.value?.toLocaleString('en-US') }}</span>
                <badge-trend :growth-rate="product.sales.growthRate" />
              </div>
            </td>
            <!-- Views -->
            <td class="w-24 ">
              <div class="flex gap-2 items-center">
                <span>{{ product.views.current }}m</span>
                <div class="w-8 h-1.5 rounded-xs bg-[#7B7B7B66]">
                  <div class="h-1.5 rounded-xs bg-chart-green"
                    :style="{ width: product.views.current && product.views.kpi ? (product.views.current / product.views.kpi * 100) + '%' : '0%' }">
                  </div>
                </div>
              </div>
            </td>
            <!-- Likes -->
            <td class="w-24 hidden 2xl:table-cell rounded-r-xl">
              <div class="flex gap-2 items-center">
                <span>{{ product.likes.current }}m</span>
                <div class="w-8 h-1.5 rounded-xs bg-[#7B7B7B66]">
                  <div class="h-1.5 rounded-xs bg-chart-green"
                    :style="{ width: product.likes.current && product.likes.kpi ? (product.likes.current / product.likes.kpi * 100) + '%' : '0%' }">
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref('Market')
const tabs = ref([
  'Market',
  'Traffic sources',
  'Viewers'
])
type productData = {
  value?: number,
  growthRate?: number,
  current?: number,
  kpi?: number
}
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
const productList = ref<productList[]>([
  {
    id: 1,
    image: '/images/1.png',
    name: 'Tasteful Bento 3D Graphics',
    type: 'UI Design Kit UI Design Kit UI Design Kit UI Design Kit ',
    status: true,
    price: 98,
    sales: {
      value: 3200,
      growthRate: 42,
    },
    views: {
      current: 48,
      kpi: 100
    },
    likes: {
      current: 480,
      kpi: 1000
    }
  },
  {
    id: 2,
    image: '/images/2.png',
    name: 'Flavor Fusion 3D Collection',
    type: 'UI Design Kit',
    status: true,
    price: 75.41,
    sales: {
      value: 6381,
      growthRate: -14,
    },
    views: {
      current: 75,
      kpi: 100
    },
    likes: {
      current: 889,
      kpi: 1000
    }
  },
  {
    id: 3,
    image: '/images/3.png',
    name: 'Artisan Meal 3D Visuals',
    type: 'UI Design Kit',
    status: false,
    price: 93.12,
    sales: {
      value: 4494,
      growthRate: 32,
    },
    views: {
      current: 89,
      kpi: 100
    },
    likes: {
      current: 454,
      kpi: 1000
    }
  },
  {
    id: 4,
    image: '/images/4.png',
    name: 'Culinary  Creations 3D Illustration',
    type: 'UI Design Kit',
    status: true,
    price: 58.41,
    sales: {
      value: 8645,
      growthRate: -20,
    },
    views: {
      current: 14,
      kpi: 100
    },
    likes: {
      current: 323,
      kpi: 1000
    }
  },
  {
    id: 5,
    image: '/images/5.png',
    name: 'Savory Bento 3D Design Kit',
    type: 'UI Design Kit',
    status: false,
    price: 69.53,
    sales: {
      value: 5140,
      growthRate: 51,
    },
    views: {
      current: 66,
      kpi: 100
    },
    likes: {
      current: 918,
      kpi: 1000
    }
  },
])
const searchInput = ref('')
const searchResult = ref<productList[]>([...productList.value])
const selectedId = ref<number[]>([])
const selectedAll = computed(() => {
  return selectedId.value.length === productList.value.length
})
const chooseAll = () => {
  if (selectedAll.value) {
    selectedId.value = []
  }
  else {
    selectedId.value = productList.value.map(p => p.id)
  }
}
const handleSelectRow = (id: number) => {
  if (selectedId.value.includes(id)) {
    selectedId.value = selectedId.value.filter(i => i !== id)
  }
  else {
    selectedId.value.push(id)
  }
}
const handleSearchProduct = () => {
  searchResult.value = productList.value.filter(p =>
    p.name.toLowerCase().includes(searchInput.value.toLowerCase())
  )
}
const clearSearchInput = () => {
  searchInput.value = ''
  searchResult.value = productList.value
}
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
    background-image: url('/images/tick.png');
    background-repeat: no-repeat;
    background-position: center;
  }
}

td:first-child {
  padding-left: 16px;
  padding-right: 24px
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