<template>
  <div class="bg-[#191919] rounded-4xl flex flex-col gap-3">
    <CommentsTitle />

    <CommentsTable />
  </div>
</template>

<script setup>
import CommentsTitle from "~/components/title/CommentsTitle.vue";
import CommentsTable from "~/components/table/CommentsTable.vue";
</script>

<style lang="scss" scoped></style>
