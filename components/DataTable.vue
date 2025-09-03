<template>
  <div class="pb-8 px-4 overflow-x-auto overflow-y-hidden">
    <table class="table-auto w-full overflow-x-auto">
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
          :class="[
            classTableTr.body,
            checked.includes(item)
              ? 'bg-background-pop rounded-2xl outline-[1.5px] outline-solid outline-stroke-card-hover-dark'
              : '',
          ]"
          :index="index"
        >
          <td class="w-10 pl-4 py-4 rounded-l-2xl">
            <input
              type="checkbox"
              :id="'checkbox-' + itemIndex"
              class="original-checkbox"
              v-model="checked"
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

const checked = ref<Array<any>>([]);

const allChecked = computed({
  get() {
    if (props.items.length > 0) {
      return checked.value.length === props.items.length;
    }
  },

  set(value: boolean) {
    if (value) {
      checked.value = [...props.items];
    } else {
      checked.value = [];
    }
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
