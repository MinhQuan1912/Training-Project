<template>
    <div class="h-7 border-[1.5px] flex justify-center items-center rounded-lg" :class="{
    '!bg-[#00a6560d] !border-[#00a65626] !text-primary-02': status === true,
    '!border-[#ff6a5526] !bg-[#ff6a550d] !text-[#ff6a55]': status === false
    }">
        {{ status === true ? 'Active' : 'Offline' }}
    </div>
</template>

<script setup>
defineProps({
    status: {
        type: Boolean,
        default: true
    }
})
</script>

<style lang="scss" scoped>

</style>