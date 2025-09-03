<template>
  <div class="container pb-8 px-4 overflow-auto">
    <table class="table-auto w-full">
      <thead>
        <tr :class="classTableTr.header">
          <th class="w-10 pl-4 py-4">
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
            <slot :name="`header-${column.field}`">
              {{ column.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, itemIndex) in items"
          :key="itemIndex"
          :class="classTableTr.body"
          :index="index"
          @click="$emit('row-click', itemIndex)"
        >
          <td class="w-10 pl-4 py-4 rounded-l-2xl h-12">
            <input
              type="checkbox"
              :id="'checkbox-' + index"
              class="original-checkbox"
              v-model="checked"
              :value="item"
            />
            <label :for="'checkbox-' + index" class="custom-checkbox"></label>
          </td>
          <td
            v-for="(column, columIndex) in columns"
            :key="columIndex"
            :class="column.cellClass"
            :colspan="column.colspan"
          >
            <slot
              :name="`cell-${column.field}`"
              :item="item"
              :index="itemIndex"
            >
              {{ item[column.field] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
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

const checked = ref([]);

// const allChecked = computed({
//   // đọc giá trị checked, trả về boolean
//   // get được dùng để tính toán và trả về một giá trị dựa trên các dữ liệu phụ thuộc
//   // phg thức every kiểm tra xem tất cả các phần tử trong mảng có vượt qua bái kiểm tra đc triển khai bởi hàm đc cung cấp hay k, trả về boolean
//   get() {
//     return comments.value.every((comment) => comment.checked === true);
//   },
//   // gán giá trị cho allChecked (chạy khi thay đổi giá trị allChecked)
//   // set để gán giá trị dữ liệu phụ thuộc
//   set(value) {
//     comments.value.forEach((comment) => {
//       comment.checked = value;
//     });
//   },
// });

const allChecked = ref(false);
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
