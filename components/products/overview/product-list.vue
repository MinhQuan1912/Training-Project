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
            <div class="flex gap-6 px-4 justify-between items-center">
                <div class="w-128 h-6 flex gap-5 text-tertiary items-center">
                    <input type="checkbox" class="checkbox"></input>
                    <div class="text-xs leading-[160%] opacity-80">Product</div>
                </div>
                <div
                    class="flex py-2 justify-between items-center text-xs text-tertiary leading-[160%] opacity-80 flex-1">
                    <div class="w-20">Status</div>
                    <div class="w-15">Price</div>
                    <div class="w-36">Sales</div>
                    <div class="w-24">Views</div>
                    <div class="w-24 hidden lg:block">Likes</div>
                </div>
            </div>
            <div v-for="(product) in productList" :key="product.id" class="h-24 p-4 flex gap-6">
                <div class="w-128 h-16 flex gap-5 items-center">
                    <input type="checkbox" class="checkbox"></input>
                    <img :src="product.image" class="h-16 w-16 object-contain">
                    <div class="flex flex-col">
                        <p class="leading-[160%] text-primary font-semibold">{{ product.name }}</p>
                        <p class="text-sm leading-[150%] text-secondary">{{ product.type }}</p>
                    </div>
                </div>
                <div class="h-11 flex justify-between items-center text-sm leading-[150%] text-primary flex-1">
                    <div class="w-20">
                        <products-overview-status :status="product.status" />
                    </div>
                    <div class="w-15">${{ product.price.toFixed(2) }}</div>
                    <div class="w-36 flex gap-2 items-center">
                        <span class="text-sm leading-[150%]">${{ product.sales.value?.toLocaleString('en-US') }}</span>
                        <products-overview-trend :growth-rate="product.sales.growthRate" />
                    </div>
                    <div class="w-24 flex gap-2 items-center">
                        <span class="text-sm leading-[150%]">{{ product.views.current }}m</span>
                        <div class="w-8 h-1.5 rounded-xs bg-[#7B7B7B66]">
                            <div class="h-1.5 rounded-xs bg-chart-green"
                                :style="{ width: product.views.current && product.views.kpi ? (product.views.current / product.views.kpi * 100) + '%' : '0%' }">
                            </div>
                        </div>
                    </div>
                    <div class="w-24 hidden lg:flex gap-2 items-center">
                        <span class="text-sm leading-[150%]">{{ product.likes.current }}m</span>
                        <div class="w-8 h-1.5 rounded-xs bg-[#7B7B7B66]">
                            <div class="h-1.5 rounded-xs bg-chart-green"
                                :style="{ width: product.likes.current && product.likes.kpi ? (product.likes.current / product.likes.kpi * 100) + '%' : '0%' }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const activeTab = ref('Market')
const tabs = ref([
    {
        label: 'Market'
    },
    {
        label: 'Traffic sources'
    },
    {
        label: 'Viewers'
    }
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
}
</style>