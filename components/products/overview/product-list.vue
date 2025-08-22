<template>
    <div class="product-list">
        <!-- Header -->
        <div class="flex p-3 justify-between items-center">
            <div class="flex pl-5 items-center justify-between gap-6">
                <h6 class="text-primary text-xl leading-[145%] font-semibold">Products</h6>
                <div
                    class="flex bg-background-surface1 border-[1.5px] border-stroke-subtle w-70 rounded-full p-3 pr-5 gap-2 text-secondary">
                    <icons-search />
                    <input type="text" placeholder="Search products" class="text-sm leading-[150%] w-full">
                </div>
            </div>
            <div class="flex gap-1 text-sm leading-[100%] font-semibold h-12">
                <div v-for="(tab, idx) in tabs" :key="idx"
                    class="flex justify-center items-center p-6 rounded-[48px] cursor-pointer transition-all duration-300"
                    @click="activeTab = tab.label"
                    :class="{
                        'text-primary border-[1.5px] border-stroke': activeTab === tab.label,
                        'text-secondary border border-transparent': activeTab !== tab.label
                     }">{{ tab.label }}
                </div>
            </div>
        </div>
        <!-- Table -->
        <div class="px-4">
            <div class="flex gap-6 px-4 justify-between items-center">
                <div class="w-128 h-6 flex gap-5 text-tertiary">
                    <div class="w-6 h-6 border-2 border-stroke rounded-xs"></div>
                    <div class="text-xs leading-[160%] opacity-80">Product</div>
                </div>
                <div class="flex py-2 justify-evenly items-center text-xs text-tertiary leading-[160%] opacity-80 flex-1">
                    <div class="">Status</div>
                    <div class="">Price</div>
                    <div class="">Sales</div>
                    <div>Views</div>
                    <div>Likes</div>
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
        label:'Viewers'
    }
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
</style>