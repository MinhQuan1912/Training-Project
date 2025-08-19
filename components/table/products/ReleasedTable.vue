<template>
  <div class="container pb-8 px-4">
    <ul
      class="text-tertiary grid grid-cols-7 items-center p-4"
      style="grid-template-columns: 24px 640px 144px 112px 144px 100px 96px"
    >
      <li class="w-6 h-6 cursor-pointer">
        <icons-select-box />
      </li>
      <li class="pl-5">Products</li>
      <li class="">Status</li>
      <li class="">Prices</li>
      <li class="">Sales</li>
      <li class="">Ratings</li>
      <li class="">Views</li>
    </ul>
    <ul
      class="align-middle hover:bg-background-pop border-t-[1.5px] border-solid border-stroke-subtle grid grid-cols-7 items-center p-4 hover:border-[1.5px] hover:border-[#313131] hover:rounded-2xl"
      style="grid-template-columns: 24px 640px 144px 112px 144px 100px 96px"
      v-for="(release, index) in releases"
      :key="index"
      @click="handleMouseEnter(release)"
    >
      <li class="w-6 h-6 cursor-pointer">
        <icons-select-box />
      </li>
      <li class="">
        <div class="flex items-center">
          <div class="object-contain w-16 h-16 mx-5 rounded-xl">
            <img :src="release.img" alt="" class="w-full h-full rounded-xl" />
          </div>
          <div class="relative">
            <div class="font-semibold text-primary">
              {{ release.product }}
            </div>
            <div class="font-normal text-secondary">
              <div
                class="flex gap-2 items-center"
                v-if="release.activeIndex === true"
              >
                <NuxtLink to="#" class="flex items-center gap-1 py-1 pr-1.5">
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
                  class="flex items-center gap-1 py-1 pl-1 pr-1.5"
                >
                  <icons-eyeoff />
                  <div class="text-sm font-semibold">Unpublish</div>
                </NuxtLink>
              </div>
              <div v-else>UI Design Kit</div>
            </div>
          </div>
        </div>
      </li>
      <li class="">
        <div
          class="py-1.75 px-2 text-sm border border-solid rounded-lg inline"
          :class="{
            'text-primary-03 bg-primary-03/5 border-primary-03/15':
              !release.status,
            'text-primary-02  bg-primary-02/5  border-primary-02/15':
              release.status,
          }"
        >
          {{ release.status ? "Status" : "Offline" }}
        </div>
      </li>
      <li class="">
        <div class="text-primary">${{ release.price }}</div>
      </li>
      <li class="">
        <div class="flex items-center gap-2">
          <div class="text-primary text-xs">${{ release.salesPrice }}</div>
          <div
            class="flex justify-between gap-1 py-1.5 px-2 items-center border border-solid rounded-lg"
            :class="{
              'bg-primary-02/5 border-primary-02/15': release.salesChange,
              'bg-primary-04/5 border-primary-04/15': !release.salesChange,
            }"
          >
            <div>
              <icons-arrow-top v-if="release.salesChange" />
              <icons-arrow-bottom v-else />
            </div>

            <div
              class="text-xs"
              :class="{
                'text-primary-04': !release.salesChange,
                'text-primary-02': release.salesChange,
              }"
            >
              {{ release.salesPercent }}%
            </div>
          </div>
        </div>
      </li>
      <li class="">
        <div class="flex items-center gap-2">
          <div>
            <icons-star v-if="!release.ratingsLike" />
            <icons-star-like v-else />
          </div>

          <div class="flex gap-1">
            <div class="text-primary">{{ release.ratingNumber }}</div>
            <div class="text-secondary">({{ release.ratingComment }})</div>
          </div>
        </div>
      </li>
      <li class="">
        <div class="flex gap-2 items-center">
          <div class="text-xs text-primary">{{ release.viewsPeople }}m</div>
          <div class="w-9 bg-gray-200 rounded-xs h-1.5">
            <div
              class="bg-chart-green h-full rounded-xs"
              :style="{ width: release.viewsPercent + '%' }"
            ></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
const releases = ref([
  {
    img: "/images/1.png",
    product: "Bento Pro v.2",
    status: true,
    price: 98,
    salesPrice: 3200,
    salesChange: true,
    salesPercent: 36.8,
    ratingsLike: false,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 50,
    activeIndex: false,
  },
  {
    img: "/images/2.png",
    product: "Fleet – Travel UI Kit",
    status: true,
    price: 98,
    salesPrice: 3200,
    salesChange: true,
    salesPercent: 36.8,
    ratingsLike: true,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 30,
    activeIndex: false,
  },
  {
    img: "/images/3.png",
    product: "Bento Pro - Vol. 2",
    status: false,
    price: 98,
    salesPrice: 3200,
    salesChange: true,
    salesPercent: 36.8,
    ratingsLike: true,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 50,
    activeIndex: false,
  },
  {
    img: "/images/4.png",
    product: "Core Dashboard Builder v.1",
    status: true,
    price: 98,
    salesPrice: 3200,
    salesChange: false,
    salesPercent: 36.8,
    ratingsLike: true,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 50,
    activeIndex: false,
  },
  {
    img: "/images/5.png",
    product: "Paradox - Coded Template",
    status: false,
    price: 98,
    salesPrice: 3200,
    salesChange: true,
    salesPercent: 36.8,
    ratingsLike: true,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 50,
    activeIndex: false,
  },
  {
    img: "/images/6.png",
    product: "Bento UI Design Kit",
    status: true,
    price: 98,
    salesPrice: 3200,
    salesChange: true,
    salesPercent: 36.8,
    ratingsLike: true,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 50,
    activeIndex: false,
  },
  {
    img: "/images/7.png",
    product: "Bloom - 3D Illustrations",
    status: true,
    price: 98,
    salesPrice: 3200,
    salesChange: false,
    salesPercent: 36.8,
    ratingsLike: true,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 50,
    activeIndex: false,
  },
  {
    img: "/images/8.png",
    product: "Tiny - Avatar Builder",
    status: true,
    price: 98,
    salesPrice: 3200,
    salesChange: true,
    salesPercent: 36.8,
    ratingsLike: true,
    ratingNumber: 4.8,
    ratingComment: 88,
    viewsPeople: 88,
    viewsPercent: 50,
    activeIndex: false,
  },
]);

const handleMouseEnter = (release) => {
  release.activeIndex = !release.activeIndex;
};
</script>

<style scoped>
/* .item + .item {
  border: transparent;
} */
</style>
