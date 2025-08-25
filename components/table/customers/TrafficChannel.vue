<template>
  <div class="pt-3 pb-4 px-8 flex flex-col gap-10 bg-background-02 rounded-4xl">
    <div class="h-12 mx-5 text-xl font-semibold text-primary flex items-center">
      Traffic channel
    </div>

    <div>
      <div>
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
          class="mt-2 ml-11 flex justify-between gap-3 text-xs text-tertiary/80 leading-[160%]"
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

      <div class="my-4 flex gap-10 items-center">
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

<script setup></script>

<style lang="scss" scoped></style>
