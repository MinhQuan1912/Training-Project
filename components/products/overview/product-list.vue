<template>
    <div class="product-list">
        <div class="flex p-3 justify-between items-center">
            <div class="flex pl-5 items-center justify-between gap-6">
                <h6 class="text-primary text-xl leading-[145%] font-semibold">Products</h6>
                <div
                    class="flex bg-background-01 border-[1.5px] border-stroke-subtle w-70 rounded-full p-3 pr-5 gap-2 text-secondary">
                    <icons-search />
                    <input type="text" placeholder="Search products" class="text-sm leading-[150%] w-full">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

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