<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from "vue";
import { Line } from "vue-chartjs";

const props = defineProps({
  mockData: {
    type: Object,
    required: true,
  },
});

const chartData = computed(() => props.mockData);

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y;
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#A0A0A0",
      },
    },
    y: {
      min: 0,
      max: 2000,
      ticks: {
        stepSize: 450,
        color: "#A0A0A0",
        callback: function (value) {
          if (value === 2000) return "2k";
          if (value === 1500) return "1.5k";
          if (value === 1000) return "1k";
          return value;
        },
      },
      grid: {
        color: "rgba(255, 255, 255, 0.1)",
        borderDash: [5, 5],
      },
    },
  },
}));
</script>
