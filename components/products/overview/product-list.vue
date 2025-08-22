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
                    <div class="w-24">Likes</div>
                </div>
                <div class="">

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
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
const productList = ref([
    {
        id: 1,
        image: '/images/6.png',
        name: 'Tasteful Bento 3D Graphics',
        type: 'UI Design Kit',
        status: 'Active',
        price: 98.00,
        sales: {
            value: 3200,
            change: 'increase',
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
        image: '/images/6.png',
        name: 'Flavor Fusion 3D Collection',
        type: 'UI Design Kit',
        status: 'Active',
        price: 75.41,
        sales: {
            value: 6381,
            change: 'decrease',
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
        image: '/images/6.png',
        name: 'Artisan Meal 3D Visuals',
        type: 'UI Design Kit',
        status: 'Offline',
        price: 93.12,
        sales: {
            value: 4494,
            change: 'decrease',
        },
        views: {
            current:89,
            kpi: 100
        },
        likes: {
            current: 454,
            kpi: 1000
        }
    },
    {
        id: 4,
        image: '/images/6.png',
        name: 'Culinary  Creations 3D Illustration',
        type: 'UI Design Kit',
        status: 'Active',
        price: 58.41,
        sales: {
            value: 8645,
            change: 'increase',
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
        image: '/images/6.png',
        name: 'Savory Bento 3D Design Kit',
        type: 'UI Design Kit',
        status: 'Offline',
        price: 69.53,
        sales: {
            value: 5140,
            change: 'increase',
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