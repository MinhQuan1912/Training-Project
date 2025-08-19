<template>
  <div class="container">
    <div class="flex">
      <div class="text-xl font-semibold leading-[145%] text-primary px-5">
        Overview
      </div>

      <div class="flex">
        <div class="p-3">
          <icons-calendar />
        </div>

        <select
          name=""
          id=""
          class="w-45 py-3 pl-5 pr-3 rounded-full border-[1.5px] border-solid border-stroke-stroke2 bg-background-02 text-secondary focus:outline-none"
        >
          <option value="" class="text-sm">Newest first</option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
