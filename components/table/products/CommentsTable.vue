<template>
  <DataTable
    :items="comments"
    :columns="columns"
    :classTableTr="classTableTr"
    @row-click="handleRowClick"
  >
    <template #cell-comments="{ item, index }">
      <div class="flex items-center">
        <div class="w-12 h-12 mr-5 rounded-full flex-none">
          <img
            :src="item.imgComment"
            alt=""
            class="w-full h-full rounded-full object-contain"
          />
        </div>
        <div class="flex flex-col gap-4">
          <div>
            <div class="flex items-center gap-3">
              <div class="font-semibold text-primary">
                {{ item.titleComment }}
              </div>
              <div class="flex gap-2 items-center">
                <div class="text-secondary text-sm">
                  {{ item.instaComment }}
                </div>
                <icons-status_indicator />
                <div class="text-secondary text-sm">
                  {{ item.timeComment }}
                </div>
              </div>
            </div>

            <div class="text-primary/80">
              {{ item.contentComment }}
            </div>
          </div>
        </div>
      </div>

      <div
        :class="[
          'transition-all ml-18 duration-500 ease-in-out',
          item.activeIndex === true
            ? 'max-h-100 opacity-100 visible'
            : 'max-h-0 opacity-0 invisible',
        ]"
      >
        <div class="flex gap-4 mt-4.5">
          <div class="w-8 h-8 rounded-full flex flex-none">
            <img
              :src="item.imgAnswer"
              alt=""
              class="w-full h-full rounded-full object-cover"
            />
          </div>

          <div>
            <div class="flex items-center gap-3">
              <div class="font-semibold text-primary">
                {{ item.titleComment }}
              </div>
              <div class="flex gap-2 items-center">
                <div class="text-secondary text-sm">
                  {{ item.instaComment }}
                </div>
                <icons-status_indicator />
                <div class="text-secondary text-sm">
                  {{ item.timeComment }}
                </div>
              </div>
            </div>

            <div class="text-primary/80">
              {{ item.contentAnswer }}
            </div>

            <div class="flex gap-5 items-center text-secondary mt-2">
              <NuxtLink
                to="#"
                class="flex items-center gap-1 py-1 pr-1.5 hover:text-primary/80"
              >
                <icons-edit />
                <div class="text-sm font-semibold">Reply</div>
              </NuxtLink>

              <NuxtLink
                to="#"
                class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
              >
                <icons-heart />
                <div class="text-sm font-semibold">Like</div>
              </NuxtLink>

              <NuxtLink
                to="#"
                class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
              >
                <icons-trash />
                <div class="text-sm font-semibold">Remove</div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #cell-product="{ item, index }">
      <div class="flex items-center">
        <div class="grid transition-all">
          <div
            class="hidden lg:flex gap-5 items-center text-secondary mt-2"
            v-if="item.activeIndex === true"
          >
            <NuxtLink
              to="#"
              class="flex items-center gap-1 py-1 pr-1.5 hover:text-primary/80"
            >
              <icons-edit />
              <div class="text-sm font-semibold">Reply</div>
            </NuxtLink>

            <NuxtLink
              to="#"
              class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
            >
              <icons-heartRed />
              <div class="text-sm font-semibold">Like</div>
            </NuxtLink>

            <NuxtLink
              to="#"
              class="flex items-center gap-1 py-1 pl-1 pr-1.5 hover:text-primary/80"
            >
              <icons-trash />
              <div class="text-sm font-semibold">Remove</div>
            </NuxtLink>
          </div>

          <div
            class="flex gap-5 items-center"
            v-if="item.activeIndex === false"
          >
            <div class="w-16 h-16 rounded-xl flex-none">
              <img
                :src="item.imgProduct"
                alt=""
                class="w-full h-full rounded-xl object-contain"
              />
            </div>
            <div class="relative cursor-pointer">
              <div class="font-semibold text-primary">
                {{ item.titleProduct }}
              </div>
              <div class="font-normal text-secondary">
                <div>UI Design Kit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div
      class="w-2 h-2 rounded-full flex-none absolute top-4 right-4"
      :class="{ 'bg-primary-02': item.on === true }"
    ></div>
  </DataTable>
</template>

<script setup>
import { ref, computed } from "vue";
import DataTable from "~/components/DataTable.vue";
import ScheduledTitle from "~/components/title/products/ScheduledTittle.vue";
import { defineProps } from "vue";
const columns = [
  {
    field: "comments",
    label: "Comments",
    headerClass: "max-lg:w-13/20 text-sm text-tertiary pl-5 py-4 flex-1",
    cellClass:
      "w-13/20 max-lg:group-hover:w-full py-4 ml-5 flex-1 flex mr-6 flex-col",
    colspan: 2,
  },
  {
    field: "product",
    label: "Product",
    headerClass: "text-sm text-tertiary w-1/4 lg:w-3/10 pr-4 py-4",
    cellClass:
      "w-1/4 lg:w-3/10 max-lg:group-hover:w-auto py-4 pr-4 rounded-r-2xl flex items-center whitespace-nowrap",
  },
];

const classTableTr = {
  header: "text-left flex",
  body: "bottomHover flex items-center relative group outline-[1.5px] outline-solid outline-transparent hover:outline-primary/7.5 hover:bg-background-pop transition-all duration-500 w-full hover:rounded-2xl border-t-[1.5px] hover:border-transparent border-solid border-stroke-subtle",
};

const comments = ref([
  {
    imgComment: "/images/avatar01.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
    imgProduct: "/images/1.png",
    titleProduct: "123123Bento Pro v.2",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
  {
    imgComment: "/images/avatar02.png",
    titleComment: "Annalece Mark",
    instaComment: "@AnnaleceMark",
    time: "2m",
    imgProduct: "/images/2.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
  {
    imgComment: "/images/avatar03.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/3.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
  {
    imgComment: "/images/avatar04.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/4.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    imgComment: "/images/avatar05.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/5.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    imgComment: "/images/avatar06.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/6.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    imgComment: "/images/avatar07.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/7.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: false,
  },
  {
    imgComment: "/images/avatar08.png",
    titleComment: "Sam Stoof",
    instaComment: "@samstoo",
    timeComment: "1m",
    imgProduct: "/images/8.png",
    contentComment:
      "Can you make a version for automated penetration testing and cybersecurity?",
    titleProduct: "123123",
    imgAnswer: "/images/1.png",
    titleAnswer: "Dash",
    instaAnswer: "@dash",
    timeAnswer: "1s",
    contentAnswer:
      "Hey @samstoo! 😊 We're working on cool stuff in the cybersecurity space. Stay tuned, and thanks for the awesome idea! 🔍✨",
    activeIndex: false,
    on: true,
  },
]);

const hoveredRowIndex = ref(null);

const handleRowClick = (index) => {
  comments.value.forEach((comment, i) => {
    if (i === index) {
      comment.activeIndex = !comment.activeIndex;
    }
  });
};
</script>

<style>
.bottomHover:hover + .bottomHover {
  border-top: transparent;
}
</style>
