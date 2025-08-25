<template>
  <div class="container">
    <div class="flex w-full items-center h-12 justify-between">
      <div class="text-xl font-semibold leading-[145%] text-primary px-5">
        Overview
      </div>

      <div class="flex gap-3">
        <div class="p-3 border-[1.5px] border-solid border-stroke rounded-full">
          <icons-calendar />
        </div>

        <div class="relative">
          <select
            name=""
            id=""
            class="appearance-none w-45 py-3 pl-5 pr-3 rounded-full border-[1.5px] border-solid border-stroke bg-background-02 text-secondary focus:outline-none"
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
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
