<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from "vue";
import { Line } from "vue-chartjs";

const mockData = {
  labels: ["Apr", "May", "Jun", "July"],
  datasets: [
    {
      label: "New Customers",
      data: [1500, 750, 1250, 1500],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.5)",
      pointBackgroundColor: "rgb(34, 197, 94)",
      pointBorderColor: "#fff",
      borderWidth: 2,
      pointRadius: 5,
      tension: 0.4,
    },
    {
      label: "Target",
      data: [800, 800, 80, 800],
      borderColor: "rgb(255, 255, 255)",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      pointRadius: 0,
      border: [5, 5],
      borderWidth: 2,
      tension: 0.4,
    },
  ],
};

const chartData = computed(() => mockData);

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
