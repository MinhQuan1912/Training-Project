<template>
    <div class="relative" ref="dropdown">
        <div class="flex rounded-full pl-5 pr-3 justify-between items-center text-primary text-sm leading-[150%] cursor-pointer border-[1.5px] border-stroke    "
            @click="handleOpenOption" :class="[additionClass, textClass]">
            <p>{{ selectedOpt ? selectedOpt : '---Select---' }}</p>
            <icons-arrow1 class="text-secondary rotate-0 transition-transform duration-300"
                :class="{ '!-rotate-180': openOption === true }" />
        </div>
        <transition name="collapse">
            <ul v-if="openOption"
                class="absolute top-[calc(100%+8px)] left-0 z-2 flex flex-col w-full border-[1.5px] border-stroke rounded-xl overflow-hidden">
                <li v-for="(option, optionIdx) in data" :key="optionIdx" @click="handleChooseOpt(option)"
                    class="h-10 pl-5 flex items-center text-primary cursor-pointer bg-background-02 hover:bg-stroke active:bg-stroke whitespace-nowrap"
                    :class="textClass">
                    {{ option }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    data: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    selectedOption: {
        type: String,
        default: ''
    },
    additionClass: {
        type: String,
        default: ''
    },
    textClass: {
        type: String,
        default: ''
    },
})
const openOption = ref(false)
let selectedOpt = defineModel<string>('selectedOption')
const dropdown = ref(null)
const handleOpenOption = () => {
    openOption.value = !openOption.value
}
const handleChooseOpt = (opt: string) => {
    selectedOpt.value = opt
    openOption.value = false
}
onClickOutside(dropdown, () => {
    openOption.value = false
})
</script>

<style scoped></style>