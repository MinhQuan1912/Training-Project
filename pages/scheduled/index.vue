<template>
  <div class="bg-[#191919] rounded-4xl flex flex-col gap-3">
    <ScheduledTitle />

    <ScheduledTable />
  </div>
</template>

<script setup>
import ScheduledTitle from "~/components/title/ScheduledTittle.vue";
import ScheduledTable from "~/components/table/ScheduledTable.vue";
</script>

<style lang="scss" scoped></style>
