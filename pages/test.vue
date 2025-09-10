<template>
  <div class="flex justify-center p-4 gap-6">
    <TransitionGroup
      name="fade"
      tag="div"
      class="flex justify-center p-4 gap-6"
    >
      <div
        class="bg-red-500 w-10 h-10 flex items-center justify-center text-white rounded-full"
        style="background-color: red"
        v-for="number in numbers.slice(0, 2)"
        :key="number.value"
      >
        {{ number.value }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const numbers = ref([{ value: 1 }, { value: 2 }, { value: 3 }]);

let intervalId = null;

const shiftNumbers = () => {
  const firstElement = numbers.value.shift();
  numbers.value.push(firstElement);
};

onMounted(() => {
  intervalId = setInterval(shiftNumbers, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-leave-active {
  position: absolute;
}
</style>
