<template>
    <div class="w-8 h-1.5 rounded-xs bg-[#7B7B7B66]">
        <div class="h-1.5 rounded-xs bg-chart-green" :style="{ width: current / kpi * 100 + '%'}"></div>
    </div>
</template>

<script setup>
defineProps({
    current: {
        type: Number,
        default: 0,
    },
    kpi: {
        type: Number,
        default: 0,
    }
})

</script>
