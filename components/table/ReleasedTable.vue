<template>
  <div class="container">
    <table class="table-fixed">
      <thead class="text-left">
        <tr class="text-[#727272]">
          <th class="pl-5 py-4">
            <input type="checkbox" class="w-6 h-6" />
          </th>
          <th class="pl-5 pr-6 w-160 py-4">Products</th>
          <th class="w-3/25 py-4">Status</th>
          <th class="w-3/25 py-4">Prices</th>
          <th class="w-3/25 py-4">Sales</th>
          <th class="w-3/25 py-4">Ratings</th>
          <th class="w-3/25 py-4 pr-4">Views</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="align-middle hover:bg-[#222]"
          v-for="(release, index) in releases"
          :key="index"
        >
          <td class="pl-5 py-4 rounded-l-2xl">
            <input type="checkbox" class="w-6 h-6 cursor-pointer" />
          </td>
          <td class="py-4">
            <div class="flex items-center">
              <div class="object-contain w-16 h-16 mx-5 rounded-xl">
                <img
                  :src="release.img"
                  alt=""
                  class="w-full h-full rounded-xl"
                />
              </div>
              <div class="relative cursor-pointer">
                <div class="font-semibold text-[#F1F1F1]">
                  {{ release.product }}
                </div>
                <div class="font-normal text-[#7B7B7B]">
                  <!-- <div class="flex gap-2 items-center">
                    <div class="flex items-center gap-1 py-1 pl-1 pr-1.5">
                      <icons-edit />
                      <div class="text-sm font-semibold">Edit</div>
                    </div>

                    <div class="flex items-center gap-1 py-1 pl-1 pr-1.5">
                      <icons-trash />
                      <div>Delete</div>
                    </div>

                    <div class="flex items-center gap-1 py-1 pl-1 pr-1.5">
                      <icons-eyeoff />
                      <div>Unpublish</div>
                    </div>
                  </div> -->
                  <div>UI Design Kit</div>
                </div>
              </div>
            </div>
          </td>
          <td class="py-4">
            <div
              class="text-[#00A656] py-1.75 px-2 text-sm bg-[#00A6560D] border border-solid border-[#00A65626] rounded-lg inline"
            >
              Active
            </div>
          </td>
          <td class="py-4">
            <div class="text-[#F1F1F1]">${{ release.price }}</div>
          </td>
          <td class="py-4">
            <div class="flex items-center gap-2">
              <div class="text-white text-xs">${{ release.salesPrice }}</div>
              <div
                class="flex gap-1 py-1.5 px-2 items-center bg-[#00A6560D] border border-solid border-[#00A65626] rounded-lg"
              >
                <icons-arrow-top />
                <div class="text-[#00A656] text-xs">
                  {{ release.salesPercent }}%
                </div>
              </div>
            </div>
          </td>
          <td class="py-4">
            <div class="flex items-center">
              <icons-star />

              <div class="flex gap-1">
                <div class="text-[#f1f1f1]">{{ release.ratingNumber }}</div>
                <div class="text-[#7b7b7b]">({{ release.ratingComment }})</div>
              </div>
            </div>
          </td>
          <td class="py-4 pr-4 rounded-r-2xl">
            <div class="flex gap-2 items-center">
              <div class="text-xs text-[#f1f1f1]">
                {{ release.viewsPeople }}m
              </div>
              <div class="w-9 bg-gray-200 rounded-xs h-1.5">
                <div
                  class="bg-[#00B512] h-full rounded-xs"
                  :style="{ width: release.viewsPercent + '%' }"
                ></div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const releases = ref([
  {
    img: "images/1.png",
    product: "Bento Pro v.2",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 50,
  },
  {
    img: "images/2.png",
    product: "Fleet – Travel UI Kit",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 30,
  },
  {
    img: "images/3.png",
    product: "Bento Pro - Vol. 2",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 50,
  },
  {
    img: "images/4.png",
    product: "Core Dashboard Builder v.1",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 50,
  },
  {
    img: "images/5.png",
    product: "Paradox - Coded Template",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 50,
  },
  {
    img: "images/6.png",
    product: "Bento UI Design Kit",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 50,
  },
  {
    img: "images/7.png",
    product: "Bloom - 3D Illustrations",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 50,
  },
  {
    img: "images/8.png",
    product: "Tiny - Avatar Builder",
    status: true,
    price: "98",
    salesPrice: "3,200",
    salesPercent: "36.8",
    ratingsLike: true,
    ratingNumber: "4.8",
    ratingComment: "88",
    viewsPeople: "88",
    viewsPercent: 50,
  },
]);
</script>

<style lang="scss" scoped></style>
