<template>
  <div class="container pb-8 px-4">
    <ul
      class="text-tertiary border-b-[1.5px] border-solid border-stroke-subtle grid grid-cols-7 items-center p-4"
      style="grid-template-columns: 24px 640px 1fr"
    >
      <li class="w-6 h-6 cursor-pointer">
        <icons-select-box />
      </li>
      <li class="pl-5">Products</li>
      <li>Price</li>
      <li>Scheduled for</li>
    </ul>
    <ul
      class="align-middle hover:bg-background-pop border-solid border-stroke-subtle grid grid-cols-7 items-center p-4 hover:border-[1.5px] hover:border-[#313131] hover:rounded-2xl"
      style="grid-template-columns: 24px 640px 1fr"
      :class="{
        'border-b-[1.5px]': index !== releases.length - 1,
        '': true,
      }"
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
      <li class="text-sm font-semibold px-2 py-1.75 text-primary-02">$98.00</li>
      <li></li>
    </ul>
  </div>
</template>

<script setup>
const releases = ref([
  {
    img: "images/1.png",
    product: "Bento Pro v.2",
    activeIndex: false,
  },
  {
    img: "images/2.png",
    product: "Fleet – Travel UI Kit",
    activeIndex: false,
  },
  {
    img: "images/3.png",
    product: "Bento Pro - Vol. 2",
    activeIndex: false,
  },
  {
    img: "images/4.png",
    product: "Core Dashboard Builder v.1",
    activeIndex: false,
  },
  {
    img: "images/5.png",
    product: "Paradox - Coded Template",
    activeIndex: false,
  },
  {
    img: "images/6.png",
    product: "Bento UI Design Kit",
    activeIndex: false,
  },
  {
    img: "images/7.png",
    product: "Bloom - 3D Illustrations",
    activeIndex: false,
  },
  {
    img: "images/8.png",
    product: "Tiny - Avatar Builder",
    activeIndex: false,
  },
]);

const handleMouseEnter = (release) => {
  release.activeIndex = !release.activeIndex;
};
</script>

<style lang="scss" scoped></style>
