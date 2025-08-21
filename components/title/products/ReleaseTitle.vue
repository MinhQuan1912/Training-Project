<template>
  <div class="container">
    <div class="p-3 flex justify-between items-center h-18">
      <div class="flex items-center">
        <div class="text-2xl font-medium leading-[145%] text-primary pl-5 pr-6">
          Products
        </div>
        <div class="relative flex items-center">
          <input
            type="search"
            placeholder="Search products"
            class="py-3 pl-10 pr-5 text-sm text-secondary rounded-full border-[1.5px] border-solid border-stroke-subtle w-70 bg-background-surface1 focus:outline-none"
          />
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
          >
            <icons-search />
          </div>
        </div>
      </div>

      <div class="flex gap-2">
        <NuxtLink class="p-3 cursor-pointer">
          <icons-layoutgrid />
        </NuxtLink>

        <NuxtLink
          class="p-3 cursor-pointer rounded-full border-[1.5px] solid border-stroke"
        >
          <icons-bulletlist />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
