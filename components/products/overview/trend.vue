<template>
    <div class="max-w-19.5 flex px-2 py-1.5 items-center rounded-lg border-[1.5px] " :class="{
        '!bg-[#00a6560d] !border-[#00a65626] !text-primary-02': increase,
        '!border-[#ff6a5526] !bg-[#ff6a550d] !text-[#ff6a55]': decrease
    }">
        <icons-balance-comparison class="!w-4 !h-4 " :class="{
            '!rotate-0': increase,
            '!rotate-180': decrease
        }" />

        <p class="text-sm font-semibold leading-[100%]">36.8%</p>
    </div>
</template>

<script setup lang="ts">
defineProps({
    increase: {
        type: Boolean,
        default: false
    },
    decrease: {
        type: Boolean,
        default: false
    },
    
})
</script>

<style lang="scss" scoped></style>