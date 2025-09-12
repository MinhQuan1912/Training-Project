<template>
  <div
    class="px-3 pt-3 flex flex-col gap-3 bg-background-02 rounded-2xl sm:rounded-4xl"
  >
    <div
      class="py-2.5 sm:px-3 text-lg font-semibold leading-[145%] text-primary"
    >
      Devices
    </div>

    <div
      class="py-3 sm:py-6 sm:px-3 flex flex-col gap-8 @container items-center"
    >
      <div class="w-69.5 h-69.5">
        <DoughnutChart :chartDataPoints="genderData1" />
      </div>

      <div
        class="flex justify-between flex-col @xs:flex-row lg:grid grid-cols-3 gap-6 w-full"
      >
        <div
          class="flex gap-2"
          v-for="(genderData, index) in genderDataNew"
          :key="index"
        >
          <icons-mobile v-if="genderData.label === 'Mobile'" />
          <icons-tablet v-if="genderData.label === 'Tablet'" />
          <icons-desktop v-if="genderData.label === 'Desktop'" />

          <div class="flex flex-col gap-1">
            <div class="text-tertiary text-xs leading-[160%]">
              {{ genderData.label }}
            </div>

            <div class="text-primary font-semibold leading-[150%]">
              {{ genderData.percent }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DoughnutChart from "~/components/vue-chart/DoughnutChart.vue";

const genderData1 = ref([
  { id: 1, label: "Mobile", value: 140, color: "#7b7b7b" },
  { id: 2, label: "Tablet", value: 450, color: "#7b7b7b" },
  { id: 3, label: "Desktop", value: 950, color: "#7b7b7b" },
]);

const total = computed(() => {
  return genderData1.value.reduce((sum, valueSum) => sum + valueSum.value, 0);
});

const genderDataNew = computed(() => {
  if (total.value <= 0) {
    return [];
  }

  return genderData1.value.map((item) => {
    const percent = ((item.value / total.value) * 100).toFixed(1);
    return { ...item, percent: Number(percent) };
  });
});
</script>

<style lang="scss" scoped></style>
