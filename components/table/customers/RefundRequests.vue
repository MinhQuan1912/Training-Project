<template>
  <div class="container">
    <div
      class="bg-background-02 pt-3 px-3 pb-6 flex flex-col gap-8 rounded-4xl w-114"
    >
      <div class="flex flex-col gap-3">
        <div
          class="py-2.5 px-3 text-primary text-xl leading-[145%] font-semibold"
        >
          Refund requests
        </div>

        <div class="flex gap-5 items-center">
          <div class="bg-secondary-01 p-5 rounded-full">
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
        class="mx-3 py-3.5 px-7 rounded-full border-[1.5px] border-solid border-stroke-stroke2 flex justify-center text-sm font-semibold text-secondary cursor-pointer"
      >
        Review refund requests
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
