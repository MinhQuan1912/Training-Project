<template>
  <div class="container">
    <div class="bg-background-02 rounded-4xl flex flex-col gap-3 flex-1">
      <CommentsTitle v-model="searchComment" />

      <CommentsTable :search="searchComment" />
    </div>
  </div>
</template>

<script setup>
import CommentsTitle from "~/components/title/products/CommentsTitle.vue";
import CommentsTable from "~/components/table/products/CommentsTable.vue";
definePageMeta({
  title: "Comments",
});

const searchComment = ref("");
</script>

<style lang="scss" scoped></style>
