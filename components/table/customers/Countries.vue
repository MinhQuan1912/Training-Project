<template>
  <div class="container">
    <div
      class="bg-background-02 pt-3 px-3 pb-8 flex flex-col gap-4 rounded-4xl w-114 items-center"
    >
      <div
        class="py-2.5 px-3 w-86 text-xl font-semibold leading-[145%] text-primary"
      >
        Countries
      </div>

      <div class="px-3 flex flex-col gap-5">
        <div
          class="flex gap-4 items-center"
          v-for="(country, index) in countries"
          :key="index"
        >
          <div class="w-9 h-9 rounded-full p-0.5">
            <img
              :src="country.img"
              alt=""
              class="w-full h-full rounded-full object-cover"
            />
          </div>

          <div class="flex flex-col gap-2">
            <div
              class="flex justify-between font-semibold text-primary leading-[150%]"
            >
              <div>{{ country.content }}</div>

              <div>{{ country.percent }}</div>
            </div>

            <div class="w-94 bg-background-pop rounded-xs h-3">
              <div
                class="bg-gradient-to-r from-stroke-subtle to-secondary opacity-30 h-full rounded-xs"
                :style="{ width: country.percent }"
              ></div>
            </div>
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
    percent: "10.7%",
  },
  {
    img: "/images/country3.png",
    content: "Canada",
    percent: "10.7%",
  },
  {
    img: "/images/country4.png",
    content: "UK",
    percent: "10.7%",
  },
  {
    img: "/images/country5.png",
    content: "German",
    percent: "10.7%",
  },
]);
</script>

<style lang="scss" scoped></style>
