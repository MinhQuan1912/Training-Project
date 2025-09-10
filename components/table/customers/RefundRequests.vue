<template>
  <div
    class="bg-background-02 pt-3 px-3 pb-3 sm:pb-6 flex flex-col gap-8 rounded-2xl sm:rounded-4xl @container"
  >
    <div class="flex flex-col gap-3">
      <div
        class="py-2.5 sm:px-3 text-primary text-xl leading-[145%] font-semibold"
      >
        Refund requests
      </div>

      <div class="flex gap-5 items-center flex-col @xs:flex-row sm:px-3">
        <div class="bg-secondary-01 p-5 rounded-full cursor-pointer">
          <icons-bags />
        </div>

        <div class="text-secondary text-sm leading-[150%]">
          You have
          <span class="text-primary text-[15px] font-semibold leading-6"
            >52 open refund requests</span
          >
          to action. This includes
          <span class="text-primary text-[15px] font-semibold leading-6"
            >8 new requests</span
          >. 👀
        </div>
      </div>
    </div>

    <div
      class="sm:mx-3 py-2 px-3 sm:py-3.5 sm:px-7 rounded-full border-[1.5px] border-solid border-stroke hover:border-primary/80 hover:text-primary/80 flex justify-center text-xs sm:text-sm font-semibold text-secondary cursor-pointer"
    >
      Review refund requests
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
