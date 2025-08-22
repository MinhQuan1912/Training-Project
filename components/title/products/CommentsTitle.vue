<template>
  <div class="container">
    <div class="p-3 flex justify-between items-center h-18">
      <div class="flex items-center">
        <div class="text-2xl font-medium leading-[145%] text-primary pl-5 pr-6">
          8 new comments
        </div>
        <div
          class="flex bg-background-surface1 border-[1.5px] border-stroke-subtle w-70 rounded-full p-3 pr-5 gap-2 text-secondary"
        >
          <icons-search />
          <input
            type="text"
            placeholder="Search products"
            class="text-sm leading-[150%] w-full"
          />
        </div>
      </div>

      <div class="relative">
        <select
          name=""
          id=""
          class="appearance-none w-45 py-3 pl-5 pr-3 rounded-full border-[1.5px] border-solid border-stroke-stroke2 bg-background-02 text-secondary focus:outline-none"
        >
          <option value="" class="text-sm">Newest first</option>
          <option value=""></option>
          <option value=""></option>
        </select>

        <div
          class="pointer-events-none absolute inset-y-0 flex items-center right-3 px-2 py-2.5 cursor-pointer"
        >
          <icons-chev-down />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
