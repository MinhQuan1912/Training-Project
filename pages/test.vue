<template>
  <div class="custom-checkbox-container">
    <input type="checkbox" id="myCheckbox" class="original-checkbox" />
    <label for="myCheckbox" class="custom-checkbox"></label>
  </div>
</template>

<style lang="scss" scoped>
.original-checkbox {
  display: none;
}

.custom-checkbox {
  @extend .original-checkbox;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid #333;
  background-color: black;
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
  top: 50%; // Dùng top: 50% để dịch chuyển xuống giữa
  left: 50%; // Dùng left: 50% để dịch chuyển sang giữa
  width: 6px;
  height: 12px;
  border: solid black;
  border-width: 0 3px 3px 0;
  transform: translate(-50%, -50%) rotate(45deg); // Sử dụng transform để dịch chuyển lại cho chính xác
}
</style>
