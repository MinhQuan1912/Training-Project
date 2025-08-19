<template>
  <div class="bg-background-02 rounded-4xl flex flex-col gap-3">
    <CommentsTitle />

    <CommentsTable />
  </div>
</template>

<script setup>
import CommentsTitle from "~/components/title/products/CommentsTitle.vue";
import CommentsTable from "~/components/table/products/CommentsTable.vue";
</script>

<style lang="scss" scoped></style>
