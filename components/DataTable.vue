<template>
  <div class="pb-8 px-4 overflow-x-auto overflow-y-hidden">
    <table class="table-auto w-full overflow-x-auto">
      <thead>
        <tr :class="classTableTr.header">
          <th class="">
            <input
              type="checkbox"
              id="myCheckbox"
              class="original-checkbox"
              v-model="allChecked"
            />
            <label for="myCheckbox" class="custom-checkbox"></label>
          </th>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :class="column.headerClass"
          >
            <slot :name="`header-${column.slot}`">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, itemIndex) in items"
          v-if="items.length > 0"
          :key="itemIndex"
          :class="[
            classTableTr.body,
            { 'bg-background-pop': item.checked === true },
          ]"
          :index="itemIndex"
        >
          <td class="rounded-l-2xl">
            <input
              type="checkbox"
              :id="'checkbox-' + itemIndex"
              class="original-checkbox"
              v-model="item.checked"
              :value="item"
            />
            <label
              :for="'checkbox-' + itemIndex"
              class="custom-checkbox"
            ></label>
          </td>
          <td
            v-for="(column, columIndex) in columns"
            :key="columIndex"
            :class="column.cellClass"
            :colspan="column.colspan"
            @click="$emit('row-click', itemIndex)"
          >
            <slot :name="`column-${column.slot}`" :item="item"> </slot>
          </td>
        </tr>
        <tr v-else class="text-primary text-center">
          Không có dữ liệu.
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, computed } from "vue";
const emit = defineEmits(["row-click"]);

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
  border-radius: 6px;
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
