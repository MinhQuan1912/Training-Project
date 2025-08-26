<template>
    <div class="product-list">
        <!-- Header -->
        <div class="flex p-3 justify-between items-center">
            <div class="flex pl-5 items-center justify-between gap-6">
                <h6 class="text-primary text-xl leading-[145%] font-semibold">Products</h6>
                <div
                    class="flex bg-background-surface1 border-[1.5px] border-stroke-subtle w-70 rounded-full p-3 pr-5 gap-2 text-secondary">
                    <icons-search />
                    <input type="search" placeholder="Search products" class="text-sm leading-[150%] w-full">
                </div>
            </div>
            <div class="flex gap-1 text-sm leading-[100%] font-semibold h-12">
                <div v-for="(tab, idx) in tabs" :key="idx"
                    class="flex justify-center items-center p-6 rounded-[48px] cursor-pointer transition-all duration-300"
                    @click="activeTab = tab.label" :class="{
                        'text-primary border-[1.5px] border-stroke': activeTab === tab.label,
                        'text-secondary border border-transparent': activeTab !== tab.label
                    }">{{ tab.label }}
                </div>
            </div>
        </div>
        <!-- Table -->
        <div class="px-4 pb-8">
            <table class="w-full text-sm text-primary leading-[150%]">
                <thead>
                    <tr class="justify-between items-center gap-6 px-4 text-xs text-tertiary opacity-80 h-16.75">
                        <th class="w-94 2xl:w-128">
                            <div class="flex gap-5 items-center px-4">
                                <input type="checkbox" class="checkbox" @change="chooseAll" :checked="selectedAll" />
                                Product
                            </div>
                        </th>
                        <th class="w-26 xl:w-50 text-left">Status</th>
                        <th class="w-21 xl:w-45 text-left">Price</th>
                        <th class="w-42 xl:w-66 text-left">Sales</th>
                        <th class="xl:w-54 text-left">Views</th>
                        <th class="w-24 text-left hidden 2xl:table-cell">Likes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in productList" :key="product.id" class="h-24 hover:bg-background-highlight">
                        <!-- Product -->
                        <td class="rounded-l-xl hover:border-white">
                            <div class="flex gap-5 items-center">
                                <input type="checkbox" class="checkbox" v-model="selectedId" :value="product.id"/>
                                <img :src="product.image" class="h-16 w-16 object-contain" />
                                <div class="flex flex-col">
                                    <p class="font-semibold ">{{ product.name }}</p>
                                    <p class="text-sm text-secondary">{{ product.type }}</p>
                                </div>
                            </div>
                        </td>
                        <!-- Status -->
                        <td >
                            <products-overview-status :status="product.status" class="w-20"/>
                        </td>
                        <!-- Price -->
                        <td>${{ product.price.toFixed(2) }}</td>
                        <!-- Sales -->
                        <td>
                            <div class="flex gap-2 items-center">
                                <span>${{ product.sales.value?.toLocaleString('en-US') }}</span>
                                <products-overview-trend :growth-rate="product.sales.growthRate" />
                            </div>
                        </td>
                        <!-- Views -->
                        <td class="w-24 rounded-r-xl">
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
import { select } from '#build/ui'

const activeTab = ref('Market')
const tabs = ref([
    { label: 'Market' },
    { label: 'Traffic sources' },
    { label: 'Viewers' }
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
        type: 'UI Design Kit',
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
const selectedId = ref<number[]>([])
const selectedAll = computed(() => {
    return selectedId.value.length === productList.value.length
})
const chooseAll = (event: Event) => {
    const target = event.target as HTMLInputElement || null
    if (!target) return
    if (target.checked) {
        selectedId.value = productList.value.map(p=>p.id)
    }
    else {
        selectedId.value = []
    }
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
    width: 24px;
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
</style>