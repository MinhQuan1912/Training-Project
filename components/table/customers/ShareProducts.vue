<template>
  <div class="p-3 flex flex-col gap-3 bg-background-02 rounded-4xl">
    <div class="h-12 mx-5 text-xl font-semibold text-primary flex items-center">
      Share products
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex gap-3">
        <div
          class="flex gap-3 p-3 items-center border-[1.5px] border-solid border-transparent hover:border-primary/7.5 hover:bg-background-pop rounded-[20px]"
          v-for="(shareProduct, index) in shareProducts"
          :key="index"
        >
          <div class="w-16 h-16">
            <img
              :src="shareProduct.img"
              alt=""
              class="object-cover w-full h-full rounded-xl"
            />
          </div>

          <div class="flex flex-col gap-1">
            <div class="flex justify-between items-center w-52.5">
              <div class="text-primary font-semibold leading-[150%]">
                {{ shareProduct.title }}
              </div>

              <div
                class="px-3 py-1.75 border-[1.5px] border-solid border-primary-02/15 bg-primary-02/5 rounded-lg text-primary-02 text-sm"
              >
                ${{ shareProduct.price }}
              </div>
            </div>

            <div class="text-secondary/80 text-sm leading-[150%]">
              {{ shareProduct.content }}
            </div>
          </div>
        </div>
      </div>

      <p class="mx-5 text-secondary text-sm leading-[150%]">
        Fifty percent of new customers explore products because the author
        shares their work on social media.<br />
        Start earning now! 🔥
      </p>

      <div class="flex gap-3 justify-between">
        <div
          class="w-1/4 py-3 px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full"
        >
          <icons-x-twitter1 />
        </div>

        <div
          class="w-1/4 py-3 px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full"
        >
          <icons-facebook1 />
        </div>

        <div
          class="w-1/4 py-3 px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full"
        >
          <icons-instalgram1 />
        </div>

        <div
          class="w-1/4 py-3 px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full"
        >
          <icons-threads />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const shareProducts = ref([
  {
    img: "/images/1.png",
    title: "Bento Pro v.2",
    content: "UI Design Kit",
    price: "98",
  },
  {
    img: "/images/2.png",
    title: "Bento Pro v.2",
    content: "UI Design Kit",
    price: "98",
  },
  {
    img: "/images/3.png",
    title: "Bento Pro v.2",
    content: "UI Design Kit",
    price: "98",
  },
]);
</script>

<style lang="scss" scoped></style>
