<template>
  <div class="bg-background-02 rounded-4xl">
    <div class="container">
      <div class="pt-3 px-3 pb-8 flex flex-col gap-8">
        <div
          class="text-xl font-semibold leading-[145%] text-primary px-5 h-12 flex items-center"
        >
          Active times
        </div>

        <div class="grid grid-cols-8 px-5 gap-0.5">
          <div class="col-span-1"></div>

          <div
            v-for="day in days"
            :key="day"
            class="text-xs leading-[160%] text-tertiary flex justify-center"
          >
            {{ day }}
          </div>

          <div
            v-for="time in times"
            :key="time"
            class="col-span-1 text-xs leading-[160%] text-tertiary text-right"
          >
            {{ time }}
          </div>

          <div
            v-for="i in 42"
            :key="i"
            class="w-full h-8 rounded-sm bg-background-dark1 cursor-pointer"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const days = ref(["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]);
const times = ref([
  "12:00 am",
  "4:00 am",
  "8:00 am",
  "12:00 pm",
  "4:00 pm",
  "8:00 pm",
]);
</script>
