<template>
  <div
    class="px-3 pt-3 flex flex-col gap-3 bg-background-02 rounded-2xl sm:rounded-4xl"
  >
    <div
      class="py-2.5 sm:px-3 text-lg font-semibold leading-[145%] text-primary"
    >
      Gender
    </div>

    <div
      class="py-3 sm:py-6 sm:px-3 flex flex-col gap-8 @container items-center"
    >
      <div class="w-69.5 h-69.5">
        <DoughnutChart :chartDataPoints="genderDataGt" />
      </div>

      <div
        class="flex justify-between flex-col @xs:flex-row lg:grid grid-cols-3 gap-4 w-full"
      >
        <div
          class="flex flex-col gap-1"
          v-for="(genderData, index) in genderDataGtNew"
          :key="index"
        >
          <div class="text-xs leading-[160%] text-tertiary">
            {{ genderData.label }}
          </div>

          <div class="leading-[150%] text-primary text-base font-bold">
            {{ genderData.percent }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DoughnutChart from "~/components/DoughnutChart.vue";

const genderDataGt = ref([
  { label: "Female", value: 1485, color: "#7b7b7b" },
  { label: "Male", value: 45009, color: "#7b7b7b" },
  { label: "Undefined", value: 950, color: "#7b7b7b" },
]);

const total = computed(() => {
  return genderDataGt.value.reduce((sum, valueSum) => sum + valueSum.value, 0);
});

const genderDataGtNew = computed(() => {
  if (total.value <= 0) {
    return [];
  }

  return genderDataGt.value.map((item) => {
    const percent = ((item.value / total.value) * 100).toFixed(1);
    return { ...item, percent: Number(percent) };
  });
});
</script>

<style lang="scss" scoped></style>
