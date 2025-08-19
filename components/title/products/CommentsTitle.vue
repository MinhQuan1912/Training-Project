<template>
  <div class="container">
    <div class="p-3 flex justify-between items-center h-18">
      <div class="flex items-center">
        <div class="text-2xl font-medium leading-[1.45] text-primary pl-5 pr-6">
          8 new comments
        </div>
        <div class="relative flex items-center">
          <input
            type="search"
            placeholder="Search comments"
            class="py-3 pl-10 pr-5 text-sm text-secondary rounded-full border-[1.5px] border-solid border-stroke-subtle w-70 bg-background-01 focus:outline-none"
          />
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer"
          >
            <icons-search />
          </div>
        </div>
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
</template>

<script setup>
defineProps({
  comments: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
