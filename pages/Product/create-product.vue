<template>
    <div class="flex gap-3">
        <div class="flex flex-col gap-3 flex-1">
            <div class="create-product-section">
                <h6 class="h-12 flex items-center pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Product details
                </h6>
                <div class="flex flex-col px-5 gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-5.5 flex items-center py-1 ">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Product title</span>
                            <u-tooltip class="ml-1.5" text="Maximum 100 characters. No HTML or emoji allowed"
                                :delay-duration="0" :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div
                            class="h-12 flex justify-between items-center py-3 px-5 border-[1.5px] border-stroke rounded-[48px]">
                            <input type="text" class="text-primary text-sm leading-[150%]">
                            <icons-tick class="text-primary-02" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center py-1 ">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Description</span>
                            <u-tooltip class="ml-1.5" text="Description" :delay-duration="0"
                                :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div class="h-60 flex flex-col rounded-2xl border-[1.5px] border-stroke">
                            <div class="flex items-center">
                                <div class="flex flex-1 p-1 gap-1">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-135"></div>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'New Product'
})
</script>

<style lang="scss" scoped>
.create-product-section {
    padding: 12px;
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: var(--color-background-02);
    border-radius: 32px;
}
</style>