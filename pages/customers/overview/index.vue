<template>
  <div class="bg-background-02 rounded-4xl flex flex-col gap-3">
    <OverviewTitle />

    <OverviewTable />
  </div>
</template>

<script setup>
import OverviewTitle from "~/components/title/customers/OverviewTitle.vue";
import OverviewTable from "~/components/table/customers/OverviewTable.vue";
</script>

<style lang="scss" scoped></style>
