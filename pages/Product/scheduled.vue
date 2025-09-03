<template>
  <div class="container">
    <div class="bg-background-02 rounded-4xl flex flex-col gap-3">
      <ScheduledTitle v-model="searchScheduled" />

      <ScheduledTable :search="searchScheduled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ScheduledTitle from "~/components/title/products/ScheduledTittle.vue";
import ScheduledTable from "~/components/table/products/ScheduledTable.vue";
definePageMeta({
  title: "Scheduled",
});

const searchScheduled = ref("");
</script>

<style lang="scss" scoped></style>
