<template>
  <div class="px-3 pt-3 pb-6 flex flex-col gap-3 bg-background-02 rounded-4xl">
    <div class="py-2.5 px-3 text-lg font-semibold leading-[145%] text-primary">
      Messages
    </div>

    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <div
          class="flex gap-5 py-5 px-3 rounded-[20px] border-solid border-transparent hover:border-primary/7.5 hover:bg-background-pop border-[1.5px]"
          v-for="(message, index) in messages"
          :key="index"
        >
          <div class="w-11 h-11 rounded-full flex-none">
            <img
              :src="message.img"
              alt=""
              class="w-full h-full object-contain rounded-full"
            />
          </div>

          <div>
            <div class="flex gap-1 font-semibold leading-[150%]">
              <div class="text-primary">{{ message.title }}</div>

              <div class="text-secondary">{{ message.insta }}</div>
            </div>

            <div class="mt-1 mb-3 text-xs text-tertiary leading-[160%]">
              {{ message.time }}
            </div>

            <div class="text-primary text-sm leading-[150%]">
              {{ message.content }}
            </div>
          </div>
        </div>
      </div>

      <div
        class="px-7 py-3.5 mx-3 border-[1.5px] border-solid border-stroke text-sm font-semibold text-secondary rounded-full cursor-pointer flex-none w-fit h-fit"
      >
        View all message
      </div>
    </div>
  </div>
</template>

<script setup>
const messages = ref([
  {
    img: "/images/avatar01.png",
    title: "Joyce",
    insta: "@joyce",
    time: "09:00 AM",
    content:
      "Hello, I would like to request a new product, could you please check...",
  },
  {
    img: "/images/avatar02.png",
    title: "Gladyce",
    insta: "@glady",
    time: "09:00 AM",
    content: "Amazing work! Do you take on custom projects?",
  },
  {
    img: "/images/avatar01.png",
    title: "Joyce",
    insta: "@joyce",
    time: "09:00 AM",
    content:
      "Hello, I would like to request a new product, could you please check...",
  },
]);
</script>

<style lang="scss" scoped></style>
