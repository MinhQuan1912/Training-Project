<template>
  <DataTable :items="items" :columns="columns">
    <template #cell-name="{ item }">
      <div class="font-bold text-lg">{{ item.name }}</div>
      <div class="text-sm text-gray-500">Mã: {{ item.code }}</div>
    </template>
  </DataTable>
</template>

<script setup>
const items = ref([
  { id: 1, name: "Sản phẩm A", code: "SP001", price: 100 },
  { id: 2, name: "Sản phẩm B", code: "SP002", price: 200 },
]);

const columns = ref([
  {
    field: "name",
    label: "Tên & Mã sản phẩm",
    headerClass: "w-1/2",
    cellClass: "w-1/2",
  },
  { field: "price", label: "Giá", headerClass: "w-1/2", cellClass: "w-1/2" },
]);
</script>

<style lang="scss" scoped></style>
