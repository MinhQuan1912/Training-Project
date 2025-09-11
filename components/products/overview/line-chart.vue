<template>
    <canvas ref="chartRef"></canvas>
</template>

<script setup lang="ts">
import {
    Chart,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    LineController,
} from "chart.js"
Chart.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, LineController)
const chartRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const props = defineProps<{
    date: string[],
    value: number[],
    growth: number
}>()

onMounted(() => {
    if (!chartRef.value) return
    chart = new Chart(chartRef.value, {
        type: "line",
        data: {
            labels: props.date,
            datasets: [
                {
                    data: props.value,
                    backgroundColor: props.growth > 0 ? '#00a656' : '#ff381c',
                    borderColor: props.growth > 0 ? '#00a656' : '#ff381c',
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 0,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                },
            },
        },
    })
})

onBeforeUnmount(() => {
    chart?.destroy()
    chart = null
})
</script>

<style scoped></style>