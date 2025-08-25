<template>
  <div class="container pb-8 px-4">
    <ul
      class="text-tertiary grid grid-cols-7 items-center p-4"
      style="grid-template-columns: 24px 2fr 1fr 1fr"
    >
      <li class="w-6 h-6 cursor-pointer">
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
      <li class="pl-5">Products</li>
      <li>Price</li>
      <li>Scheduled for</li>
    </ul>
    <template v-if="filteredSchedule && filteredSchedule.length > 0">
      <ul
        class="grid grid-cols-7 align-middle hover:bg-background-pop border-[1.5px] border-solid border-x-transparent border-b-transparent border-t-stroke-subtle items-center p-4 hover:border-primary/7.5 hover:rounded-2xl"
        style="grid-template-columns: 24px 2fr 1fr 1fr"
        v-for="(schedule, index) in filteredSchedule"
        :key="index"
      >
        <li class="w-6 h-6 cursor-pointer">
          <div class="custom-checkbox-container">
            <input
              type="checkbox"
              :id="'checkbox-' + index"
              class="original-checkbox"
              v-model="schedule.checked"
            />
            <label :for="'checkbox-' + index" class="custom-checkbox"></label>
          </div>
        </li>
        <li class="" @click="handleMouseEnter(schedule)">
          <div class="flex items-center">
            <div class="w-16 h-16 mx-5 rounded-xl">
              <img
                :src="schedule.img"
                alt=""
                class="w-full h-full rounded-xl object-contain"
              />
            </div>
            <div class="relative">
              <div class="font-semibold text-primary">
                {{ schedule.product }}
              </div>
              <div class="font-normal text-secondary">
                <div
                  class="flex gap-2 items-center"
                  v-if="schedule.activeIndex === true"
                >
                  <div class="group">
                    <NuxtLink
                      to=""
                      class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md"
                    >
                      <icons-edit />
                      <div
                        class="text-sm font-semibold group-hover:text-primary/80"
                      >
                        Edit
                      </div>
                    </NuxtLink>
                  </div>

                  <div class="group">
                    <NuxtLink
                      to="#"
                      class="flex items-center gap-1 py-1 pl-1 pr-1.5 border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md"
                    >
                      <icons-trash />
                      <div
                        class="text-sm font-semibold group-hover:text-primary/80"
                      >
                        Delete
                      </div>
                    </NuxtLink>
                  </div>

                  <div class="group">
                    <NuxtLink
                      to="#"
                      class="flex items-center gap-1 py-1 pl-1 pr-1.5 group border-[1.5px] border-solid border-transparent group-hover:border-stroke rounded-md"
                    >
                      <icons-calendar-check />
                      <div
                        class="text-sm font-semibold group-hover:text-primary/80"
                      >
                        Reschedule
                      </div>
                    </NuxtLink>
                  </div>
                </div>
                <div v-else>ui8.net/product-link</div>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div
            class="text-sm font-semibold px-2 py-1.75 border-[1.5px] border-solid rounded-lg inline"
            :class="{
              'text-primary-03 bg-primary-03/5 border-primary-03/15':
                !schedule.priceStatus,
              'text-primary-02  bg-primary-02/5  border-primary-02/15':
                schedule.priceStatus,
            }"
          >
            ${{ schedule.price }}
          </div>
        </li>
        <li class="text-secondary">{{ schedule.scheduleFor }}</li>
      </ul>
    </template>

    <ul v-else class="text-primary text-center">
      Không có dữ liệu
    </ul>
  </div>
</template>

<script setup>
const schedules = ref([
  {
    img: "/images/1.png",
    product: "Bento Pro v.2",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/2.png",
    product: "Fleet – Travel UI Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/3.png",
    product: "Bento Pro - Vol. 2",
    activeIndex: false,
    price: "98.00",
    priceStatus: false,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/4.png",
    product: "Core Dashboard Builder v.1",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    checked: false,
  },
  {
    img: "/images/5.png",
    product: "Paradox - Coded Template",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/6.png",
    product: "Bento UI Design Kit",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/7.png",
    product: "Bloom - 3D Illustrations",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
  {
    img: "/images/8.png",
    product: "Tiny - Avatar Builder",
    activeIndex: false,
    price: "98.00",
    priceStatus: true,
    scheduleFor: "Apr 9, 2044 at 3:55 PM",
    checked: false,
  },
]);

const handleMouseEnter = (schedule) => {
  schedule.activeIndex = !schedule.activeIndex;
};

const allChecked = computed({
  get() {
    return schedules.value.every((schedule) => schedule.checked);
  },

  set(value) {
    schedules.value.forEach((schedule) => {
      schedule.checked = value;
    });
  },
});

const input = ref("");

const searchQuery = ref("");

const handleSearch = () => {
  searchQuery.value = input.value;
};

const filteredSchedule = computed(() => {
  if (!searchQuery.value) {
    return schedules.value;
  }

  const query = searchQuery.value.toLowerCase();

  return schedules.value.filter((schedule) =>
    schedule.product.toLowerCase().includes(query)
  );
});

console.log(filteredSchedule);
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
