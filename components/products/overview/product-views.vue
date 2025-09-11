<template>
    <canvas ref="chartRef" class=""></canvas>
</template>

<script setup lang="ts">
import {
    Chart,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    BarController
} from "chart.js"

Chart.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    BarController
)

const labels = [
    { short: "Mo", full: "Monday", value: 124940 },
    { short: "Tu", full: "Tuesday", value: 859304 },
    { short: "We", full: "Wednesday", value: 32492 },
    { short: "Th", full: "Thursday", value: 559128 },
    { short: "Fr", full: "Friday", value: 395823 },
    { short: "Sa", full: "Saturday", value: 19394 },
    { short: "Su", full: "Sunday", value: 359483 }
]
const chartRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

onMounted(() => {
    if (!chartRef.value) return
    chart = new Chart(chartRef.value, {
        type: "bar",
        data: {
            labels: labels.map(l => l.short),
            datasets: [
                {
                    data: labels.map(l => l.value),
                    backgroundColor: "#7B7B7B66",
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 8,
                        bottomRight: 8,
                    },
                    borderSkipped: false,
                    hoverBackgroundColor: '#00b512',
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    displayColors: false,
                    padding: 8,
                    backgroundColor: '#e2e2e2',
                    titleAlign: 'center',
                    titleColor: '#141414',
                    titleFont: {
                        size: 12,
                        weight: 'normal'
                    },
                    bodyColor: '#141414',
                    bodyFont: {
                        weight: "bold",
                        size: 12,
                        family: 'Inter'
                    },
                    callbacks: {
                        title: (context) => {
                            const index = context[0]?.dataIndex as number
                            return labels[index]?.full
                        },
                        label: (context) => {
                            return context.parsed.y.toLocaleString('en-US')
                        }
                    },
                }
            },
            scales: {
                y: {
                    display: false,
                    beginAtZero: false
                }
            },
            maintainAspectRatio: false
        },
    })
})
onBeforeUnmount(() => {
    chart?.destroy()
})
</script>

<style scoped>

</style>