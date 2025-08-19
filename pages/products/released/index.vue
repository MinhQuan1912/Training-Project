<template>
  <div class="bg-background-02 rounded-4xl flex flex-col gap-3">
    <ReleaseTitle />

    <ReleasedTable />
  </div>
</template>

<script setup>
import ReleaseTitle from "~/components/title/products/ReleaseTitle.vue";
import ReleasedTable from "~/components/table/products/ReleasedTable.vue";
</script>

<style lang="scss" scoped></style>
