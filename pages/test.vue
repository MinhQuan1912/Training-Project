<template>
  <div class="flex flex-col">
    <div
      class="border-t border-solid border-blue-500 hover:border hover:border-solid hover:border-red-500"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      1
    </div>
    <div
      :class="{
        'border-t': true,
        'border-solid': true,
        'border-blue-500': !hovering,
        'border-none': hovering,
      }"
    >
      2
    </div>
    <div
      class="border-t border-solid border-blue-500 hover:border hover:border-solid hover:border-red-500"
    >
      3
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hovering = ref(false);
</script>
