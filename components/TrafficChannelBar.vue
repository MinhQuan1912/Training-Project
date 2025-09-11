<template>
  <Bar id="traffic-chart" :options="chartOptions" :data="chartData" />
</template>

<script setup lang="ts">
import { Bar } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";

const chartData: ChartData<"bar"> = {
  labels: ["22", "23", "24", "25", "26", "27", "28"],
  datasets: [
    {
      label: "Direct",
      backgroundColor: "#3b82f6",
      data: [800, 1500, 1000, 1200, 1900, 1200, 2000],
    },
    {
      label: "Search",
      backgroundColor: "#ef4444",
      data: [1200, 2000, 1500, 1700, 2000, 1800, 2200],
    },
    {
      label: "Other",
      backgroundColor: "#f59e0b",
      data: [300, 500, 300, 400, 500, 300, 400],
    },
  ],
};

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      stacked: false,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      stacked: false,
      beginAtZero: true,
      grid: {
        color: "rgba(255, 255, 255, 0.2)",
        borderDash: [5, 5],
      },
      ticks: {
        display: false,
        stepSize: 500,
        callback: function (value: string | number) {
          if (typeof value === "number") {
            return value >= 1000 ? `${value / 1000}k` : value.toString();
          }
          return "";
        },
      },
    },
  },
};
</script>
