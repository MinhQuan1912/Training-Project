<template>
  <div
    class="p-3 flex flex-col gap-3 bg-background-02 rounded-2xl sm:rounded-4xl @container"
  >
    <div
      class="h-12 mx-3 sm:mx-5 text-xl font-semibold text-primary flex items-center"
    >
      Share products
    </div>

    <div class="flex flex-col gap-6">
      <div class="overflow-hidden">
        <div class="flex gap-3 overflow-x-auto">
          <div
            class="flex w-1/3 min-w-77.5 gap-3 p-3 @sm:items-center border-[1.5px] border-solid border-transparent hover:border-primary/7.5 hover:bg-background-pop rounded-[20px] cursor-pointer"
            v-for="shareProduct in shareProducts"
            :key="shareProduct.id"
          >
            <div class="w-16 h-16 flex-none">
              <img
                :src="shareProduct.img"
                alt=""
                class="object-cover w-full h-full rounded-xl"
              />
            </div>

            <div class="flex justify-between w-full max-sm:items-center gap-4">
              <div class="flex flex-col gap-1.5">
                <div
                  class="text-primary font-semibold leading-[150%] whitespace-nowrap"
                >
                  {{ shareProduct.title }}
                </div>

                <div class="text-secondary/80 text-sm leading-[150%]">
                  {{ shareProduct.content }}
                </div>
              </div>

              <div
                class="px-3 py-1.75 border-[1.5px] border-solid border-primary-02/15 bg-primary-02/5 rounded-lg text-primary-02 text-sm w-fit h-fit"
              >
                ${{ shareProduct.price }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="mx-5 text-secondary text-sm leading-[150%]">
        Fifty percent of new customers explore products because the author
        shares their work on social media.<br />
        Start earning now! 🔥
      </p>

      <div class="grid gap-3 grid-cols-2 @xs:grid-cols-4">
        <div
          class="px-1 py-1 sm:py-3 sm:px-3 lg:px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full cursor-pointer group hover:border-primary/80"
        >
          <icons-x-twitter1 />
        </div>

        <div
          class="px-1 py-1 sm:py-3 sm:px-3 lg:px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full cursor-pointer group hover:border-primary/80"
        >
          <icons-facebook1 />
        </div>

        <div
          class="px-1 py-1 sm:py-3 sm:px-3 lg:px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full cursor-pointer group hover:border-primary/80"
        >
          <icons-instalgram1 />
        </div>

        <div
          class="px-1 py-1 sm:py-3 sm:px-3 lg:px-7 flex justify-center border-[1.5px] border-solid border-stroke rounded-full cursor-pointer group hover:border-primary/80"
        >
          <icons-threads />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TransitionGroup } from "vue";

const shareProducts = ref([
  {
    id: 1,
    img: "/images/1.png",
    title: "Bento Pro v.2",
    content: "UI Design Kit",
    price: "98",
  },
  {
    id: 2,
    img: "/images/2.png",
    title: "Bento Pro v.2",
    content: "UI Design Kit",
    price: "98",
  },
  {
    id: 3,
    img: "/images/3.png",
    title: "Bento Pro v.2",
    content: "UI Design Kit",
    price: "98",
  },
]);

// const moveProduct = () => {
//   // xóa phần tử cuối cùng của mảng
//   const itemsProduct = shareProducts.value.splice(-1, 1)[0];

//   // đưa nó lên đầu mảng
//   shareProducts.value.unshift(itemsProduct);
// };

// onMounted(() => {
//   setInterval(moveProduct, 5000);
// });
</script>

<style lang="scss" scoped>
// .list-move,
// .list-enter-active,
// .list-leave-active {
//   transition: all 5s cubic-bezier(0.55, 0, 0.1, 1);
// }

// .list-enter-from,
// .list-leave-to {
//   opacity: 0;
//   transform: scaleY(0.01) translate(30px, 0);
// }

// .list-leave-active {
//   position: absolute;
// }
</style>
