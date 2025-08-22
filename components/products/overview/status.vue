<template>
    <div class="h-7 border-[1.5px] flex justify-center items-center rounded-lg" :class="{
    '!bg-[#00a6560d] !border-[#00a65626] !text-primary-02': change = 'Active',
    '!border-[#ff6a5526] !bg-[#ff6a550d] !text-[#ff6a55]': change = 'Offline'
    }">
        {{ change }}
    </div>
</template>

<script setup>
defineProps({
    change: {
        type: String,
        default: 'increase'
    }
})
</script>

<style lang="scss" scoped>

</style>