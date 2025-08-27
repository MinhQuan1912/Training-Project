<template>
  <div class="flex">
    <div class="bottom">FLEX 1</div>

    <div class="bottom">FLEX 2</div>

    <div class="bottom">FLEX 3</div>
  </div>
</template>

<script setup></script>

<style>
.flex {
  display: flex; /* Bật flexbox cho container */
}

.bottom {
  background-color: aqua; /* Màu nền mặc định cho tất cả các flex item */
  padding: 20px;
  margin: 5px;
  transition: background-color 0.3s ease; /* Thêm hiệu ứng chuyển đổi mượt mà */
}

/* Khi di chuột vào .bottom, phần tử .bottom liền kề ngay sau nó sẽ mất background */
.bottom:hover + .bottom {
  background-color: transparent;
}

/* Khi di chuột vào .bottom, tất cả các phần tử .bottom sau nó sẽ mất background */
/* .bottom:hover ~ .bottom {
  background-color: transparent;
} */
</style>
