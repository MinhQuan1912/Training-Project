<template>
  <div class="bg-[#191919] rounded-4xl flex flex-col gap-3">
    <ScheduledTitle />

    <ScheduledTable />
  </div>
</template>

<script setup>
import ScheduledTitle from "~/components/title/products/ScheduledTittle.vue";
import ScheduledTable from "~/components/table/products/ScheduledTable.vue";
</script>

<style lang="scss" scoped></style>
