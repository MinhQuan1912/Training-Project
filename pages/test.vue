<script setup>
const data = [
  { label: "Mobile", value: 15.2, color: "#D3D3D3" },
  { label: "Tablet", value: 17.1, color: "#D3D3D3" },
  { label: "Desktop", value: 66.62, color: "#D3D3D3" },
];

const hoverColor = "#00B512";
</script>

<template>
  <UCard class="w-full max-w-sm mx-auto">
    <div class="relative flex items-center justify-center p-8">
      <svg class="w-72 h-72" viewBox="0 0 36 36">
        <circle
          class="text-gray-700"
          stroke="currentColor"
          stroke-width="3"
          fill="none"
          r="16"
          cx="18"
          cy="18"
        />
        <circle
          v-for="(item, index) in data"
          :key="item.label"
          :class="[
            item.label === 'Mobile' ? 'text-green-500' : 'text-gray-400',
            'transition-colors duration-200 ease-in-out',
            'hover:cursor-pointer',
          ]"
          :style="{
            strokeDasharray: item.value + ' 100',
            strokeDashoffset:
              100 -
              data
                .slice(0, index)
                .reduce((acc, current) => acc + current.value, 0),
            transform: 'rotate(-90deg)',
            transformOrigin: '18px 18px',
            stroke: item.label === 'Mobile' ? hoverColor : item.color,
          }"
          stroke-width="3"
          fill="none"
          r="16"
          cx="18"
          cy="18"
        />
        <text
          x="18"
          y="18"
          text-anchor="middle"
          class="fill-white text-xs font-bold"
        >
          {{ data[0].value }}%
        </text>
        <text
          x="18"
          y="24"
          text-anchor="middle"
          class="fill-gray-400 text-[8px]"
        >
          Mobile
        </text>
        <div></div>
      </svg>
    </div>

    <div class="flex justify-around p-4">
      <div v-for="item in data" :key="item.label" class="flex items-center">
        <div
          class="w-4 h-4 rounded-full mr-2"
          :style="{ backgroundColor: item.color }"
        ></div>
        <div>
          <div class="text-sm font-semibold">{{ item.label }}</div>
          <div class="text-xs text-gray-400">{{ item.value }}%</div>
        </div>
      </div>
    </div>
  </UCard>
</template>
