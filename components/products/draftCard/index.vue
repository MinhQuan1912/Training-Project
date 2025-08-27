<template>
  <div class="overflow-hidden group" :id="`draft-${id}`">
    <div class="h-auto overflow-hidden rounded-4xl">
      <img
        :src="image"
        alt=""
        class="h-[230px] w-full object-cover md:!w-[460px]"
      />
    </div>
    <div class="flex gap-1 mt-3.5 font-semibold">
      <span
        class="flex-1 items-center text-base leading-[1.5] tracking-[0.024px] text-primary line-clamp-1"
        >{{ title }}</span
      >
      <div
        class="border border-solid rounded-[999px] bg-green-500/10 border-green-500/30 leading-[1] tracking-[0.175px] text-primary-02 text-sm py-1.75 px-3"
      >
        ${{ price }}
      </div>
    </div>
    <div class="flex items-center gap-2 mt-2 group-hover:hidden h-4">
      <UIcon name="fa6-regular:clock" class="size-4 text-secondary" />
      <span class="text-secondary text-xs leading-[1.6] tracking-[0.048px]">{{
        formatDate(date)
      }}</span>
    </div>
    <div
      class="mt-2 text-xs text-gray-400 hidden group-hover:flex gap-2 items-center duration-200 cursor-pointer"
    >
      <div class="flex items-center gap-1" @click.stop="$emit('edit')">
        <UIcon name="prime:pen-to-square" class="size-4" />
        <span>Edit</span>
      </div>
      <div
        class="flex items-center gap-1"
        @click.stop.prevent="$emit('delete')"
      >
        <UIcon name="prime:trash" class="size-4" />
        <span>Delete</span>
      </div>
      <div class="flex items-center gap-1" @click.stop>
        <UIcon name="prime:eye-slash" class="size-4" />
        <span>Unpublish</span>
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
});
defineEmits(["edit", "delete", "unpublish"]);
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
</script>
