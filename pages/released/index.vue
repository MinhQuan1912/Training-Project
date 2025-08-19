<template>
  <div class="bg-[#191919] rounded-4xl flex flex-col gap-3">
    <Title />

    <ReleasedTable />
  </div>
</template>

<script setup>
import Title from "~/components/title/ReleaseTitle.vue";
import ReleasedTable from "~/components/table/ReleasedTable.vue";
</script>

<style lang="scss" scoped></style>
