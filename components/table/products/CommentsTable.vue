<template>
  <div class="container pb-8 px-4">
    <ul
      class="p-4 grid grid-cols-3 items-center"
      style="grid-template-columns: 24px 2fr 1fr"
    >
      <li>
        <div class="custom-checkbox-container">
          <input
            type="checkbox"
            id="myCheckbox"
            class="original-checkbox"
            v-model="allChecked"
          />
          <label for="myCheckbox" class="custom-checkbox"></label>
        </div>
      </li>
      <li class="text-sm text-tertiary ml-5">Comment</li>
      <li class="text-sm text-tertiary">Product</li>
    </ul>

    <ul
      class="p-4 grid grid-cols-3 items-center relative border-[1.5px] border-solid border-x-transparent border-b-transparent border-t-stroke-subtle hover:rounded-2xl hover:bg-background-pop hover:border-solid hover:border-primary/7.5"
      style="grid-template-columns: 24px 2fr 1fr"
      v-for="(comment, index) in comments"
      :key="index"
    >
      <li>
        <div class="custom-checkbox-container">
          <input
            type="checkbox"
            :id="'checkbox-' + index"
            class="original-checkbox"
            v-model="comment.checked"
          />
          <label :for="'checkbox-' + index" class="custom-checkbox"></label>
        </div>
      </li>
      <li class="flex mr-6" @click="handleFocusEnter(comment)">
        <div class="w-12 h-12 mx-5 rounded-full flex-none">
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

          <div class="flex gap-4" v-if="comment.activeIndex === true">
            <div class="w-8 h-8 rounded-full flex flex-none">
              <img
                src="https://media1.thrillophilia.com/filestore/n2ib9inwzcilxpg3aumbigvq4jus_IMG_World_Dubai_Fun_38a0986c1a.jpg?w=400&dpr=2"
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
                <NuxtLink to="#" class="flex items-center gap-1 py-1 pr-1.5">
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
      </li>
      <li class="flex items-center" @click="handleFocusEnter(comment)">
        <div
          class="flex gap-5 items-center text-secondary mt-2"
          v-if="comment.activeIndex === true"
        >
          <NuxtLink to="#" class="flex items-center gap-1 py-1 pr-1.5">
            <icons-edit />
            <div class="text-sm font-semibold">Reply</div>
          </NuxtLink>

          <NuxtLink to="#" class="flex items-center gap-1 py-1 pl-1 pr-1.5">
            <icons-heartRed />
            <div class="text-sm font-semibold">Like</div>
          </NuxtLink>

          <NuxtLink to="#" class="flex items-center gap-1 py-1 pl-1 pr-1.5">
            <icons-trash />
            <div class="text-sm font-semibold">Remove</div>
          </NuxtLink>
        </div>

        <div class="flex gap-5 items-center" v-else>
          <div class="w-16 h-16 rounded-xl">
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
      </li>
      <div
        class="w-2 h-2 bg-primary-02 rounded-full flex-none absolute top-4 right-4"
        v-if="comment.on === true"
      ></div>
    </ul>
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
      "Can you make a version for automated penetration testing and cybersecurity?",
    imgProduct: "/images/1.png",
    titleProduct: "123123Bento Pro v.2",
    imgAnswer: "",
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
    imgAnswer: "",
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
    imgAnswer: "",
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
    imgAnswer: "",
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
    imgAnswer: "",
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
    imgAnswer: "",
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
    imgAnswer: "",
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
    imgAnswer: "",
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
    return comments.value.every((comment) => comment.checked);
  },
  // hàm này đổi giá trị khi nó chuyển thành true, nếu tất cả chuyển thành true, allChecked cũng là true, ngc lai
  // set để gán giá trị dữ liệu phụ thuộc
  set(value) {
    comments.value.forEach((comment) => {
      comment.checked = value;
    });
  },
});
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
</style>
