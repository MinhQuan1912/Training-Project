<template>
  <div class="bg-background-02 rounded-4xl flex flex-col gap-3 w-full">
    <ScheduledTitle />

    <ScheduledTable />
  </div>
</template>

<script setup>
import ScheduledTitle from "~/components/title/products/ScheduledTittle.vue";
import ScheduledTable from "~/components/table/products/ScheduledTable.vue";
definePageMeta({
  title: 'Scheduled'
})
</script>

<style lang="scss" scoped></style>
