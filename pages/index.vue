<template>
  <div class="chart-container">
    <h2>Biểu đồ 1: Dân số các nước</h2>
    <DoughnutChart :chartDataPoints="chartDataPoints1" />
  </div>

  <div class="chart-container">
    <h2>Biểu đồ 2: Doanh số sản phẩm</h2>
    <DoughnutChart :chartDataPoints="chartDataPoints2" />
  </div>
</template>

<script setup>
import DoughnutChart from "~/components/vue-chart/DoughnutChart.vue";

const chartDataPoints1 = ref([
  { label: "Việt Nam", value: 100000000, color: "#FF6384" },
  { label: "Thái Lan", value: 70000000, color: "#36A2EB" },
  { label: "Indonesia", value: 270000000, color: "#FFCE56" },
  { label: "Malaysia", value: 33000000, color: "#4BC0C0" },
  { label: "Philippines", value: 115000000, color: "#9966FF" },
]);

const chartDataPoints2 = ref([
  { label: "Điện thoại", value: 550, color: "#E87A5B" },
  { label: "Máy tính", value: 320, color: "#5B86E8" },
  { label: "Phụ kiện", value: 130, color: "#82C4A2" },
  { label: "Thiết bị khác", value: 80, color: "#C082C4" },
]);
</script>

<style scoped>
.chart-container {
  width: 500px;
  height: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: white;
  text-align: center;
}

h2 {
  font-family: "Arial", sans-serif;
  margin-bottom: 20px;
}
</style>
