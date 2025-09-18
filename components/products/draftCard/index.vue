<template>
  <div class="md:relative lg:static w-full" :id="`draft-${id}`" :class="class">
    <div class="group relative">
      <div class="h-auto w-full overflow-hidden rounded-4xl">
        <img loading="lazy" :src="image" alt="" class="h-[230px] w-full object-cover md:!w-[460px]" />
      </div>
      <div class="flex gap-1 mt-3.5 font-semibold">
        <span class="flex-1 items-center text-base leading-[1.5] tracking-[0.024px] text-primary line-clamp-1">{{ title
          }}</span>
        <div
          class="w-12 h-7 border-[1.5px] border-solid rounded-lg bg-primary-02/5 border-primary-02/15 leading-[1] tracking-[0.175px] text-primary-02 text-sm flex justify-center items-center">
          ${{ price }}
        </div>
      </div>
      <div class="flex items-center justify-between gap-2 mb-2 md:group-hover:opacity-0 py-1">
        <div class="flex items-center gap-2">
          <icons-clock class=" text-secondary" />
          <span class="text-secondary text-xs leading-[1.6] tracking-[0.048px]">{{
            formatDate(date || "2044-04-09T15:55:00Z")
            }}</span>
        </div>
        <div class="block md:hidden text-secondary relative" @click="toggleOption">
          <icons-option />
          <Transition name="slide-left">
            <div v-if="openOption"
              class="absolute right-[calc(100%+8px)] top-1/2 -translate-y-1/2 flex flex-col z-10 bg-background-02 rounded-xl p-2">
              <div
                class="flex items-center gap-1 hover:text-primary rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
                @click.stop="$emit('edit')">
                <icons-edit-2 />
                <span>Edit</span>
              </div>
              <div
                class="flex items-center gap-1 hover:text-primary rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
                @click.stop.prevent="$emit('delete')">
                <icons-trash-2 />
                <span>Delete</span>
              </div>
              <div
                class="flex items-center gap-1 hover:text-primary rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
                @click.stop>
                <icons-calendar-2 />
                <span>Schedule</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      <div
        class="absolute bottom-1 left-0 text-xs text-secondary hidden md:group-hover:flex gap-2 items-center duration-200 cursor-pointer">
        <div
          class="flex items-center gap-1 hover:text-primary rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop="$emit('edit')">
          <icons-edit-2 />
          <span>Edit</span>
        </div>
        <div
          class="flex items-center gap-1 hover:text-primary rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop.prevent="$emit('delete')">
          <icons-trash-2 />
          <span>Delete</span>
        </div>
        <div
          class="flex items-center gap-1 hover:text-primary rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop>
          <icons-calendar-2 />
          <span>Schedule</span>
        </div>
      </div>
    </div>

    <div v-if="itemBefore"
      class="absolute z-2 top-0 right-full h-full mr-6 w-full groupBefore hidden md:block lg:hidden"
      :id="`draft-${itemBefore.id}`" :class="class">
      <div class="h-auto w-full overflow-hidden rounded-4xl">
        <img loading="lazy" :src="itemBefore.image" alt="" class="h-[230px] w-full object-cover md:!w-[460px]" />
      </div>
      <div class="flex gap-1 mt-3.5 font-semibold">
        <span class="flex-1 items-center text-base leading-[1.5] tracking-[0.024px] text-primary line-clamp-1">{{
          itemBefore.title || itemBefore.name }}</span>
        <div
          class="border border-solid rounded-[999px] bg-green-500/10 border-green-500/30 leading-[1] tracking-[0.175px] text-primary-02 text-sm py-1.75 px-3">
          ${{ itemBefore.price }}
        </div>
      </div>
      <div class="flex time items-center gap-2 py-1">
        <UIcon name="fa6-regular:clock" class="size-4 text-secondary" />
        <span class="text-secondary text-xs leading-[1.6] tracking-[0.048px]">{{
          formatDate(itemBefore.date || "2044-04-09T15:55:00Z")
          }}</span>
      </div>
      <div class="option text-xs text-gray-400 hidden gap-2 items-center duration-200 cursor-pointer">
        <div
          class="flex items-center gap-1 hover:text-white rounded-[6px] hover:outline-solid hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop="$emit('editBefore')">
          <icons-edit-2 />
          <span>Edit</span>
        </div>
        <div
          class="flex items-center gap-1 hover:text-white rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop.prevent="$emit('deleteBefore')">
          <icons-trash-2 />
          <span>Delete</span>
        </div>
        <div
          class="flex items-center gap-1 hover:text-white rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop>
          <icons-calendar-2 />
          <span>Schedule</span>
        </div>
      </div>
    </div>
    <div v-if="itemAfter" class="absolute z-2 top-0 left-full h-full ml-6 w-full groupAfter hidden md:block lg:hidden"
      :id="`draft-${itemAfter.id}`" :class="class">
      <div class="h-auto w-full overflow-hidden rounded-4xl">
        <img loading="lazy" :src="itemAfter.image" alt="" class="h-[230px] w-full object-cover md:!w-[460px]" />
      </div>
      <div class="flex gap-1 mt-3.5 font-semibold">
        <span class="flex-1 items-center text-base leading-[1.5] tracking-[0.024px] text-primary line-clamp-1">{{
          itemAfter.title || itemAfter.name }}</span>
        <div
          class="border border-solid rounded-[999px] bg-green-500/10 border-green-500/30 leading-[1] tracking-[0.175px] text-primary-02 text-sm py-1.75 px-3">
          ${{ itemAfter.price }}
        </div>
      </div>
      <div class="time flex items-center gap-2 p-1">
        <UIcon name="fa6-regular:clock" class="size-4 text-secondary" />
        <span class="text-secondary text-xs leading-[1.6] tracking-[0.048px]">{{
          formatDate(itemAfter.date || "2044-04-09T15:55:00Z")
          }}</span>
      </div>
      <div class="option text-xs text-gray-400 hidden gap-2 items-center duration-200 cursor-pointer">
        <div
          class="flex items-center gap-1 hover:text-white rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop="$emit('editAfter')">
          <icons-edit-2 />
          <span>Edit</span>
        </div>
        <div
          class="flex items-center gap-1 hover:text-white rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop.prevent="$emit('deleteAfter')">
          <icons-trash-2 />
          <span>Delete</span>
        </div>
        <div
          class="flex items-center gap-1 hover:text-white rounded-[6px] hover:outline-[1.5px] hover:outline-stroke p-1"
          @click.stop>
          <icons-calendar-2 />
          <span>Schedule</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    default: "",
  },
  width: {
    type: Number,
    default: 0,
  },
  itemBefore: {
    type: Object || null,
  },
  itemAfter: {
    type: Object || null,
  },
});
defineEmits([
  "edit",
  "delete",
  "unpublish",
  "editBefore",
  "editAfter",
  "deleteBefore",
  "deleteAfter",
  "unpublishBefore",
  "unpublishAfter",
]);
function formatDate(value) {
  const d = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
    .format(d)
    .replace(",", " at");
}
const openOption = ref(false)
const toggleOption = () => {
  openOption.value = !openOption.value
}
</script>
<style scoped>
.groupBefore:hover .option,
.groupAfter:hover .option {
  display: flex;
}

.groupBefore:hover .time,
.groupAfter:hover .time {
  display: none;
}
</style>
