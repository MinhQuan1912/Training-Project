<template>
    <div class="relative" ref="dropdownRef" :class="props.overAllClass">
        <div class="flex rounded-full pl-5 pr-3 justify-between items-center text-primary text-sm leading-[150%] cursor-pointer border-[1.5px] border-stroke    "
            @click="handleOpenOption" :class="[props.additionClass, props.textClass]">
            <p>{{ props.selectedOption ? props.selectedOption : '---Select---' }}</p>
            <icons-arrow1 class="text-secondary rotate-0 transition-transform duration-300"
                :class="{ '!-rotate-180': openOption === true }" />
        </div>
        <transition name="collapse" mode="out-in">
            <ul v-if="openOption"
                class="absolute left-0 z-2 flex flex-col w-full border-[1.5px] border-stroke rounded-xl overflow-hidden"
                :class="{
                    '!bottom-[calc(100%+8px)]': isdropUp,
                    'top-[calc(100%+8px)]': !isdropUp
                }">
                <li v-for="(option, optionIdx) in props.data" :key="optionIdx" @click="handleChooseOpt(option)"
                    class="h-10 pl-5 flex items-center text-primary cursor-pointer bg-background-02 hover:bg-stroke active:bg-stroke whitespace-nowrap"
                    :class="props.textClass">
                    {{ option }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
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
    overAllClass: {
        type: String,
        default: ''
    }
})
const openOption = ref(false)
let selectedOpt = defineModel<string>('selectedOption')
const dropdownRef = ref(null)
const isdropUp = ref(false)
const { height } = useWindowSize()
const handleOpenOption = () => {
    openOption.value = !openOption.value
    if (openOption.value && dropdownRef.value) {
        const rect = (dropdownRef.value as HTMLElement).getBoundingClientRect()
        const spaceBottom = height.value - rect.bottom
        const optionHeight = 40 * (props.data.length)
        isdropUp.value = spaceBottom < optionHeight
    }
}

const handleChooseOpt = (opt: string) => {
    selectedOpt.value = opt
    openOption.value = false
}
onClickOutside(dropdownRef, () => {
    openOption.value = false
})
</script>

<style scoped></style>