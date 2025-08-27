<template>
  <div class="container pb-8 px-4">
    <table class="table-auto w-full">
      <thead>
        <tr class="text-left flex">
          <th class="w-10 pl-4 py-4">
            <input
              type="checkbox"
              id="myCheckbox"
              class="original-checkbox"
              v-model="allChecked"
            />
            <label for="myCheckbox" class="custom-checkbox"></label>
          </th>
          <th class="max-lg:w-13/20 text-sm text-tertiary pl-5 py-4 flex-1">
            Comment
          </th>
          <th class="text-sm text-tertiary w-1/4 lg:w-3/10 pr-4 py-4">
            Product
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="bottomHover flex relative group outline-[1.5px] outline-solid outline-transparent hover:outline-primary/7.5 hover:bg-background-pop transition-all duration-500 w-full hover:rounded-2xl border-t-[1.5px] hover:border-transparent border-solid border-stroke-subtle"
          v-for="(comment, index) in comments"
          :key="index"
          @click="toggleContent(index)"
        >
          <td class="w-10 pl-4 py-4 rounded-l-2xl h-12">
            <input
              type="checkbox"
              :id="'checkbox-' + index"
              class="original-checkbox"
              v-model="comment.checked"
            />
            <label :for="'checkbox-' + index" class="custom-checkbox"></label>
          </td>
          <td
            class="w-13/20 max-lg:group-hover:w-full py-4 ml-5 flex-1"
            colspan="2"
          >
            <div class="flex mr-6 flex-col">
              <div class="flex items-center">
                <div class="w-12 h-12 mr-5 rounded-full flex-none">
                  <img
                    :src="comment.imgComment"
                    alt=""
                    class="w-full h-full rounded-full object-contain"
                  />
                </div>
                <div class="flex flex-col gap-4">
                  <div>
                    <div class="flex items-center gap-3">
                      <div class="font-semibold text-primary">
                        {{ comment.titleComment }}
                      </div>
                      <div class="flex gap-2 items-center">
                        <div class="text-secondary text-sm">
                          {{ comment.instaComment }}
                        </div>
                        <icons-status_indicator />
                        <div class="text-secondary text-sm">
                          {{ comment.timeComment }}
                        </div>
                      </div>
                    </div>

                    <div class="text-primary/80">
                      {{ comment.contentComment }}
                    </div>
                  </div>
                </div>
              </div>

              <div
                :class="[
                  'transition-all ml-18 duration-500 ease-in-out',
                  hoveredRowIndex[index]
                    ? 'max-h-100 opacity-100 visible'
                    : 'max-h-0 opacity-0 invisible',
                ]"
              >
                <div class="flex gap-4 mt-4.5">
                  <div class="w-8 h-8 rounded-full flex flex-none">
                    <img
                      :src="comment.imgAnswer"
                      alt=""
                      class="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <div>
                    <div class="flex items-center gap-3">
                      <div class="font-semibold text-primary">
                        {{ comment.titleComment }}
                      </div>
                      <div class="flex gap-2 items-center">
                        <div class="text-secondary text-sm">
                          {{ comment.instaComment }}
                        </div>
                        <icons-status_indicator />
                        <div class="text-secondary text-sm">
                          {{ comment.timeComment }}
                        </div>
                      </div>
                    </div>

                    <div class="text-primary/80">
                      {{ comment.contentAnswer }}
                    </div>

                    <div class="flex gap-5 items-center text-secondary mt-2">
                      <NuxtLink
                        to="#"
                        class="flex items-center gap-1 py-1 pr-1.5"
                      >
                        <icons-edit />
                        <div class="text-sm font-semibold">Reply</div>
                      </NuxtLink>

                      <NuxtLink
                        to="#"
                        class="flex items-center gap-1 py-1 pl-1 pr-1.5"
                      >
                        <icons-heart />
                        <div class="text-sm font-semibold">Like</div>
                      </NuxtLink>

                      <NuxtLink
                        to="#"
                        class="flex items-center gap-1 py-1 pl-1 pr-1.5"
                      >
                        <icons-trash />
                        <div class="text-sm font-semibold">Remove</div>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td
            class="w-1/4 lg:w-3/10 max-lg:group-hover:w-auto py-4 pr-4 rounded-r-2xl flex items-center"
          >
            <div class="flex items-center">
              <div class="grid transition-all">
                <div
                  class="hidden lg:flex gap-5 items-center text-secondary mt-2"
                  v-if="hoveredRowIndex[index]"
                >
                  <NuxtLink to="#" class="flex items-center gap-1 py-1 pr-1.5">
                    <icons-edit />
                    <div class="text-sm font-semibold">Reply</div>
                  </NuxtLink>

                  <NuxtLink
                    to="#"
                    class="flex items-center gap-1 py-1 pl-1 pr-1.5"
                  >
                    <icons-heartRed />
                    <div class="text-sm font-semibold">Like</div>
                  </NuxtLink>

                  <NuxtLink
                    to="#"
                    class="flex items-center gap-1 py-1 pl-1 pr-1.5"
                  >
                    <icons-trash />
                    <div class="text-sm font-semibold">Remove</div>
                  </NuxtLink>
                </div>

                <div
                  class="flex gap-5 items-center"
                  v-if="!hoveredRowIndex[index]"
                >
                  <div class="w-16 h-16 rounded-xl flex-none">
                    <img
                      :src="comment.imgProduct"
                      alt=""
                      class="w-full h-full rounded-xl object-contain"
                    />
                  </div>
                  <div class="relative cursor-pointer">
                    <div class="font-semibold text-primary">
                      {{ comment.titleProduct }}
                    </div>
                    <div class="font-normal text-secondary">
                      <div>UI Design Kit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <div
            class="w-2 h-2 rounded-full flex-none absolute top-4 right-4"
            :class="{ 'bg-primary-02': comment.on === true }"
          ></div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

import CommentsTitle from "~/components/title/products/CommentsTitle.vue";
import { select } from "#build/ui";

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
    checked: false,
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
    checked: false,
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
    checked: false,
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
    checked: false,
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
    checked: false,
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
    checked: false,
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
    checked: false,
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
    checked: false,
  },
]);

const handleFocusEnter = (comment) => {
  comment.activeIndex = !comment.activeIndex;
};

const allChecked = computed({
  // đọc giá trị checked, trả về boolean
  // get được dùng để tính toán và trả về một giá trị dựa trên các dữ liệu phụ thuộc
  // phg thức every kiểm tra xem tất cả các phần tử trong mảng có vượt qua bái kiểm tra đc triển khai bởi hàm đc cung cấp hay k, trả về boolean
  get() {
    return comments.value.every((comment) => comment.checked === true);
  },
  // gán giá trị cho allChecked (chạy khi thay đổi giá trị allChecked)
  // set để gán giá trị dữ liệu phụ thuộc
  set(value) {
    comments.value.forEach((comment) => {
      comment.checked = value;
    });
  },
});

const hoveredRowIndex = ref(false);

const toggleContent = (index) => {
  hoveredRowIndex.value[index] = !hoveredRowIndex.value[index];
};
</script>

<style lang="scss" scoped>
.original-checkbox {
  display: none;
}

.custom-checkbox {
  @extend .original-checkbox;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid #282828;
  background-color: #222222;
  cursor: pointer;
  position: relative;
  border-radius: 4px;
}

.original-checkbox:checked + .custom-checkbox {
  background: white;
  border-color: white;
}

.original-checkbox:checked + .custom-checkbox::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 12px;
  border: solid black;
  border-width: 0 3px 3px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

.bottomHover:hover + .bottomHover {
  border-top: transparent;
}
</style>
