<template>
  <div
    class="px-3 pt-3 flex flex-col gap-3 bg-background-02 rounded-2xl sm:rounded-4xl"
  >
    <div
      class="py-2.5 sm:px-3 text-lg font-semibold leading-[145%] text-primary"
    >
      Devices
    </div>

    <div class="py-3 sm:py-6 sm:px-3 flex flex-col gap-8 @container">
      <div></div>

      <div
        class="flex justify-between flex-col @xs:flex-row lg:grid grid-cols-3 gap-6"
      >
        <div class="flex gap-2">
          <icons-mobile />

          <div class="flex flex-col gap-1">
            <div class="text-tertiary text-xs leading-[160%]">Mobile</div>

            <div class="text-primary font-semibold leading-[150%]">15.20%</div>
          </div>
        </div>

        <div class="flex gap-2">
          <icons-mobile />

          <div class="flex flex-col gap-1">
            <div class="text-tertiary text-xs leading-[160%]">Mobile</div>

            <div class="text-primary font-semibold leading-[150%]">15.20%</div>
          </div>
        </div>

        <div class="flex gap-2">
          <icons-mobile />

          <div class="flex flex-col gap-1">
            <div class="text-tertiary text-xs leading-[160%]">Mobile</div>

            <div class="text-primary font-semibold leading-[150%]">15.20%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
