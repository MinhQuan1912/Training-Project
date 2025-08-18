<template>
  <div class="p-3 flex justify-between items-center h-18">
    <div class="flex items-center">
      <div class="text-2xl font-medium leading-[1.45] text-primary pl-5 pr-6">
        Products
      </div>
      <div class="relative flex items-center">
        <input
          type="search"
          placeholder="Search products"
          class="py-3 pl-10 pr-5 text-sm text-secondary rounded-full border-[1.5px] border-solid border-bgSurface1 w-70 bg-bgSurface1"
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
        class="p-3 cursor-pointer rounded-full border-[1.5px] solid border-stroke02"
      >
        <icons-bulletlist />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
