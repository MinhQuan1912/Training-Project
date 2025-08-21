<template>
  <div class="bg-background-02 rounded-4xl">
    <div class="container">
      <div class="flex flex-col gap-6 pt-3 px-3 pb-8">
        <div class="flex flex-col gap-8">
          <div
            class="text-xl font-semibold leading-[145%] text-primary px-5 h-12 flex items-center"
          >
            Active times
          </div>

          <div class="flex flex-col gap-2.5">
            <div class="flex gap-7.75 px-5 justify-between">
              <div
                class="flex flex-col justify-between text-xs leading-[160%] text-tertiary"
              >
                <div>12:00 am</div>

                <div>4:00 am</div>

                <div>8:00 am</div>

                <div>12.00 pm</div>

                <div>4:00 pm</div>

                <div>8:00 pm</div>
              </div>

              <div class="grid grid-cols-7 gap-0.5">
                <div
                  class="w-32.5 h-5 rounded-sm bg-background-dark1/70 cursor-pointer"
                  v-for="i in 112"
                  :key="i"
                ></div>
              </div>
            </div>

            <div class="flex justify-between ml-20 px-5">
              <div
                class="w-23 text-xs leading-[160%] text-tertiary flex justify-center"
              >
                Mo
              </div>
              <div
                class="w-23 text-xs leading-[160%] text-tertiary flex justify-center"
              >
                Tu
              </div>
              <div
                class="w-23 text-xs leading-[160%] text-tertiary flex justify-center"
              >
                We
              </div>
              <div
                class="w-23 text-xs leading-[160%] text-tertiary flex justify-center"
              >
                Th
              </div>
              <div
                class="w-23 text-xs leading-[160%] text-tertiary flex justify-center"
              >
                Fr
              </div>
              <div
                class="w-23 text-xs leading-[160%] text-tertiary flex justify-center"
              >
                Sa
              </div>
              <div
                class="w-23 text-xs leading-[160%] text-tertiary flex justify-center"
              >
                Su
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <div class="text-xs text-primary leading-[160%] opacity-80">
            Least engaged
          </div>

          <div class="flex gap-0.5 items-center">
            <div class="w-12 h-2 rounded-xs bg-shade05-100/20"></div>

            <div class="w-12 h-2 rounded-xs bg-shade05-100/35"></div>

            <div class="w-12 h-2 rounded-xs bg-shade05-100/50"></div>
          </div>

          <div class="text-xs text-primary leading-[160%] opacity-80">
            Most engaged
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
