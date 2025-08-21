<template>
  <div class="flex items-center justify-center">
    <div
      class="relative w-69 h-69 rounded-full overflow-hidden"
      :style="conicGradientStyle"
    >
      <div class="absolute inset-0 m-3 rounded-full bg-black"></div>

      <div
        class="absolute inset-0 flex flex-col items-center justify-center text-center z-10"
      >
        <div class="text-primary text-5xl font-medium leading-15">
          {{ chartData[0].value.toFixed(2) }}%
        </div>
        <div
          class="text-secondary font-semibold leading-4 overflow-hidden text-ellipsis"
        >
          {{ chartData[0].name }}
        </div>
      </div>

      <div
        class="absolute top-[10%] right-[10%] p-2 bg-gray-800 text-white rounded-lg shadow-lg hidden group-hover:block"
      >
        <span class="font-bold">{{ chartData[0].name }}</span>
        <br />
        <span>1,485</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const chartData = ref([
  { name: "Mobile", value: 15.2, color: "#00B512" },
  { name: "Tablet", value: 17.1, color: "#D3D3D3" },
  { name: "Desktop", value: 66.62, color: "#7B7B7B" },
]);

const conicGradientStyle = computed(() => {
  let gradientString = "conic-gradient(";
  let currentPercentage = 0;

  chartData.value.forEach((item, index) => {
    const nextPercentage = currentPercentage + item.value;
    gradientString += `${item.color} ${currentPercentage}% ${nextPercentage}%`;

    if (index < chartData.value.length - 1) {
      gradientString += ", ";
    }
    currentPercentage = nextPercentage;
  });

  gradientString += ")";
  return {
    background: gradientString,
  };
});
</script>

<style scoped></style>
