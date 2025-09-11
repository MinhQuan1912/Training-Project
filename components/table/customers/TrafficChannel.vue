<template>
  <div
    class="pt-3 pb-3 px-3 sm:pb-4 sm:px-8 flex flex-col gap-10 bg-background-02 rounded-2xl sm:rounded-4xl @container"
  >
    <div
      class="h-12 sm:mx-5 text-xl font-semibold text-primary flex items-center"
    >
      Traffic channel
    </div>

    <div>
      <div class="relative z-0">
        <TrafficChannelBar
          class="absolute left-7 inset-0 w-full h-full pb-10 z-50"
        />

        <div
          class="flex flex-col gap-10 text-xs text-tertiary/80 leading-[160%]"
        >
          <div class="flex gap-6 items-center">
            <div class="w-8">2k</div>
            <div
              class="border-t border-dashed border-stroke w-full h-0.25"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8">1.5k</div>
            <div
              class="border-t border-dashed border-stroke w-full h-0.25"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8">1k</div>
            <div
              class="border-t border-dashed border-stroke w-full h-0.25"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8">500</div>
            <div
              class="border-t border-dashed border-stroke w-full h-0.25"
            ></div>
          </div>

          <div class="flex gap-6 items-center">
            <div class="w-8">0</div>
            <div
              class="border-t border-dashed border-stroke w-full h-0.25"
            ></div>
          </div>
        </div>

        <div
          class="mt-2 ml-11 flex justify-between gap-1 sm:gap-3 text-xs text-tertiary/80 leading-[160%]"
        >
          <div class="w-full flex justify-center">22</div>

          <div class="w-full flex justify-center">23</div>

          <div class="w-full flex justify-center">24</div>

          <div class="w-full flex justify-center">25</div>

          <div class="w-full flex justify-center">26</div>

          <div class="w-full flex justify-center">27</div>

          <div class="w-full flex justify-center">28</div>
        </div>
      </div>

      <div
        class="my-4 flex gap-5 sm:gap-10 sm:items-center flex-col @xs:flex-row"
      >
        <div class="flex gap-1.5 items-center">
          <div
            class="w-3.5 h-3.5 bg-secondary/40 rounded-sm cursor-pointer"
          ></div>
          <div class="text-sm leading-[160%] text-primary/80">Direct</div>
        </div>

        <div class="flex gap-1.5 items-center">
          <div
            class="w-3.5 h-3.5 bg-secondary/40 rounded-sm cursor-pointer"
          ></div>
          <div class="text-sm leading-[160%] text-primary/80">Search</div>
        </div>

        <div class="flex gap-1.5 items-center">
          <div
            class="w-3.5 h-3.5 bg-secondary/40 rounded-sm cursor-pointer"
          ></div>
          <div class="text-sm leading-[160%] text-primary/80">Other</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TrafficChannelBar from "~/components/vue-chart/TrafficChannelBar.vue";
</script>

<style lang="scss" scoped></style>
