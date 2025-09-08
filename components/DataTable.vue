<template>
  <div class="overflow-x-auto overflow-y-hidden" :class="classTableTr.padding">
    <table class="table-auto w-full overflow-x-auto">
      <thead :class="tHeadClass">
        <tr :class="classTableTr.header" @click="toggleAllChecked">
          <th :class="classTableTr.thInput">
            <input
              type="checkbox"
              id="myCheckbox"
              class="original-checkbox"
              v-model="allChecked"
              @click="toggleAllChecked"
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
      <<<<<<< HEAD
      <tbody>
        <tr
          v-for="(item, itemIndex) in items"
          v-if="items.length > 0"
          :key="itemIndex"
          class="group"
          :class="[
            classTableTr.body,
            { 'bg-background-pop rounded-2xl': item.checked === true },
          ]"
          :index="itemIndex"
          @click="toggleCheckedItem(item)"
          @mouseenter="hoverEnterIndex(itemIndex)"
          @mouseleave="hoverLeaveIndex(itemIndex)"
        >
          =======
          <tbody :class="tBodyClass">
            <tr
              v-for="(item, itemIndex) in items"
              v-if="items.length > 0"
              :key="itemIndex"
              class="group"
              :class="[
                classTableTr.body,
                { 'bg-background-pop rounded-2xl': item.checked === true },
              ]"
              :index="itemIndex"
              @click="toggleCheckedItem(item)"
              @mouseenter.stop="$emit('row-click', itemIndex)"
              @mouseleave.stop="$emit('row-click', itemIndex)"
            >
              >>>>>>> ce5d550e421ea3dd9305467b820eb8da0809e0a8
              <td :class="classTableTr.tdInput">
                <input
                  type="checkbox"
                  :id="'checkbox-' + itemIndex"
                  class="original-checkbox group-hover:border-red-700"
                  v-model="item.checked"
                  :value="item"
                />
                <label
                  :for="'checkbox-' + itemIndex"
                  class="custom-checkbox group-hover:border-tertiary"
                  @click="toggleCheckedItem(item)"
                ></label>
              </td>
              <td
                v-for="(column, columIndex) in columns"
                :key="columIndex"
                :class="column.cellClass"
                :colspan="column.colspan"
              >
                <slot :name="`column-${column.slot}`" :item="item"> </slot>
              </td>
            </tr>
            <tr v-else class="text-primary text-center">
              Không có dữ liệu.
            </tr>
          </tbody>
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
  tBodyClass: {
    type: String,
    default: "",
  },
  tHeadClass: {
    type: String,
    default: "",
  },
  hoverEnterIndex: {
    type: Function,
    required: false,
  },
  hoverLeaveIndex: {
    type: Function,
    required: false,
  },
});

const allChecked = ref(false);

const toggleAllChecked = () => {
  allChecked.value = !allChecked.value;
  props.items.forEach((item) => {
    item.checked = allChecked.value;
  });
};

const toggleCheckedItem = (item) => {
  item.checked = !item.checked;
};

watch(
  () => props.items,
  () => {
    allChecked.value = props.items.every((item) => item.checked);
  },
  { deep: true }
);
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
