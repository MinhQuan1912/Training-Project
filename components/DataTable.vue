<template>
  <div class="container pb-8 px-4">
    <table class="table-auto w-full">
      <thead>
        <tr :class="classTableTr.header">
          <th class="w-10 pl-4 py-4">
            <input type="checkbox" id="myCheckbox" class="original-checkbox" />
            <label for="myCheckbox" class="custom-checkbox"></label>
          </th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :class="column.headerClass"
          >
            <slot :name="`header-${column.field}`">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in items"
          :key="index"
          :class="classTableTr.body"
          @mouseover="$emit('row-hover', index)"
          @mouseleave="$emit('row-hover', null)"
        >
          <td class="w-10 pl-4 py-4 rounded-l-2xl h-12">
            <input
              type="checkbox"
              :id="'checkbox-' + index"
              class="original-checkbox"
            />
            <label :for="'checkbox-' + index" class="custom-checkbox"></label>
          </td>
          <td
            v-for="(column, index) in columns"
            :key="index"
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
  classTableTr: {
    type: Object,
    default: () => ({
      header: "",
      body: "",
    }),
  },
});

const emits = defineEmits(["row-hover"]);

const hoveredRowIndex = ref(null);

watch(hoveredRowIndex, (newIndex) => {
  emits("row-hover", newIndex);
});
</script>

<style scoped lang="scss">
.original-checkbox {
  display: none;
}

.custom-checkbox {
  @extend .original-checkbox;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid #282828;
  background-color: #222222;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
}

.original-checkbox:checked + .custom-checkbox {
  background: white;
  border-color: white;
}

.original-checkbox:checked + .custom-checkbox::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 12px;
  border: solid black;
  border-width: 0 3px 3px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

.bottomHover:hover + .bottomHover {
  border-top: transparent;
}
</style>
