<template>
  <div class="container pb-8 px-4">
    <table class="table-auto w-full">
      <thead>
        <tr class="text-left flex">
          <th
            v-for="column in columns"
            :key="column.field"
            :class="column.headerClass"
          >
            <slot :name="`header-${column.field}`">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td
            v-for="column in columns"
            :key="column.field"
            :class="column.cellClass"
          >
            <slot :name="`cell-${column.field}`" :item="item">
              {{ item[column.field] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});
</script>
