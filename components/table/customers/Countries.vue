<template>
  <div
    class="bg-background-02 pt-3 px-3 pb-3 sm:pb-8 flex flex-col gap-4 rounded-2xl sm:rounded-4xl @container"
  >
    <div
      class="py-2.5 sm:px-3 text-xl font-semibold leading-[145%] text-primary"
    >
      Countries
    </div>

    <div class="sm:px-3 flex flex-col gap-2.5 sm:gap-5 w-full">
      <div
        class="flex gap-1 @3xs:gap-4 flex-col @3xs:flex-row"
        v-for="(country, index) in countries"
        :key="index"
      >
        <div class="w-9 h-9 rounded-full p-0.5 flex-none">
          <img
            :src="country.img"
            alt=""
            class="w-full h-full rounded-full object-cover"
          />
        </div>

        <div class="flex flex-col gap-2 flex-grow">
          <div
            class="flex justify-between font-semibold text-primary leading-[150%] text-xs sm:text-base"
          >
            <div>{{ country.content }}</div>

            <div>{{ country.percent }}</div>
          </div>

          <div class="bg-background-pop rounded-xs h-3 w-full">
            <div
              class="bg-gradient-to-r from-gray-200/[.30] to-gray-500/[.30] h-full rounded-xs"
              :style="{ width: country.percent }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const countries = ref([
  {
    img: "/images/country1.png",
    content: "United States",
    percent: "10.7%",
  },
  {
    img: "/images/country2.png",
    content: "Sweden",
    percent: "50%",
  },
  {
    img: "/images/country3.png",
    content: "Canada",
    percent: "40%",
  },
  {
    img: "/images/country4.png",
    content: "UK",
    percent: "30%",
  },
  {
    img: "/images/country5.png",
    content: "German",
    percent: "25.7%",
  },
]);
</script>

<style lang="scss" scoped></style>
