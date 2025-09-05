<template>
  <div class="px-3 pt-3 flex flex-col gap-3 bg-background-02 rounded-4xl">
    <div class="py-2.5 px-3 text-lg font-semibold leading-[145%] text-primary">
      Gender
    </div>

    <div class="py-6 px-3 flex flex-col gap-8 @container">
      <div></div>

      <div
        class="flex justify-between flex-col @xs:flex-row lg:grid grid-cols-3 gap-4"
      >
        <div class="flex flex-col gap-1">
          <div class="text-xs leading-[160%] text-tertiary">Female</div>

          <div class="leading-[150%] text-primary text-base">30.16%</div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-xs leading-[160%] text-tertiary">Female</div>

          <div class="leading-[150%] text-primary text-base">30.16%</div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-xs leading-[160%] text-tertiary">Female</div>

          <div class="leading-[150%] text-primary text-base">30.16%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
