<template>
  <div class="container pb-8 px-4">
    <ul
      class="text-tertiary grid grid-cols-7 items-center p-4"
      style="grid-template-columns: 24px 620px 200px 200px"
    >
      <li class="w-6 h-6 cursor-pointer">
        <icons-select-box />
      </li>
      <li class="pl-5">Products</li>
      <li>Price</li>
      <li>Scheduled for</li>
    </ul>
    <ul
      class="grid grid-cols-7 align-middle hover:bg-background-pop border-[1.5px] border-solid border-x-transparent border-b-transparent border-t-stroke-subtle items-center p-4 hover:border-primary/7.5 hover:rounded-2xl"
      style="grid-template-columns: 24px 620px 200px 200px"
      v-for="(schedule, index) in schedules"
      :key="index"
    >
      <li class="w-6 h-6 cursor-pointer">
        <icons-select-box />
      </li>
      <li class="" @click="handleMouseEnter(schedule)">
        <div class="flex items-center">
          <div class="w-16 h-16 mx-5 rounded-xl">
            <img
              :src="schedule.img"
              alt=""
              class="w-full h-full rounded-xl object-contain"
            />
          </div>
          <div class="relative">
            <div class="font-semibold text-primary">
              {{ schedule.product }}
            </div>
            <div class="font-normal text-secondary">
              <div
                class="flex gap-2 items-center"
                v-if="schedule.activeIndex === true"
              >
                <NuxtLink to="" class="flex items-center gap-1 py-1 pr-1.5">
                  <icons-edit />
                  <div class="text-sm font-semibold">Edit</div>
                </NuxtLink>

                <NuxtLink
                  to="#"
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5"
                >
                  <icons-trash />
                  <div class="text-sm font-semibold">Delete</div>
                </NuxtLink>

                <NuxtLink
                  to="#"
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-stroke-stroke2 rounded-md"
                >
                  <icons-calendar-check />
                  <div class="text-sm font-semibold text-primary/80">
                    Reschedule
                  </div>
                </NuxtLink>
              </div>
              <div v-else>ui8.net/product-link</div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div
          class="text-sm font-semibold px-2 py-1.75 border-[1.5px] border-solid rounded-lg inline"
          :class="{
            'text-primary-03 bg-primary-03/5 border-primary-03/15':
              !schedule.priceStatus,
            'text-primary-02  bg-primary-02/5  border-primary-02/15':
              schedule.priceStatus,
          }"
        >
          ${{ schedule.price }}
        </div>
      </li>
      <li class="text-secondary">{{ schedule.scheduleFor }}</li>
    </ul>
  </div>
</template>

<script setup>
const schedules = ref([
  {
    img: "/images/1.png",
    product: "Bento Pro v.2",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/2.png",
    product: "Fleet – Travel UI Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/3.png",
    product: "Bento Pro - Vol. 2",
    activeIndex: false,
    price: "98.00",
    priceStatus: false,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/4.png",
    product: "Core Dashboard Builder v.1",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
  },
  {
    img: "/images/5.png",
    product: "Paradox - Coded Template",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/6.png",
    product: "Bento UI Design Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/7.png",
    product: "Bloom - 3D Illustrations",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
  {
    img: "/images/8.png",
    product: "Tiny - Avatar Builder",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
  },
]);

const handleMouseEnter = (schedule) => {
  schedule.activeIndex = !schedule.activeIndex;
};
</script>

<style lang="scss" scoped></style>
