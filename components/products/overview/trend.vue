<template>
    <div class="max-w-19.5 flex px-2 py-1.5 items-center rounded-lg border-[1.5px] " :class="{
        '!bg-[#00a6560d] !border-[#00a65626] !text-primary-02': growthRate > 0,
        '!border-[#ff6a5526] !bg-[#ff6a550d] !text-[#ff6a55]': growthRate < 0
    }">
        <icons-balance-comparison class="!w-4 !h-4 " :class="{
            '!rotate-0': growthRate > 0,
            '!rotate-180': growthRate < 0
        }" />

        <p class="text-sm font-semibold leading-[100%]">{{ growthRate > 0 ? growthRate : -growthRate }}%</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    growthRate: {
        type: Number,
        default: 0
    }
})
</script>

<style lang="scss" scoped></style>