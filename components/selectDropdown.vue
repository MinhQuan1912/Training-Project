<template>
    <div class="relative">
        <div class="rounded-full border border-stroke-subtle pl-5 pr-3 flex justify-between items-center text-primary text-sm leading-[150%] cursor-pointer"
            @click="handleOpenCategory" :class="props.additionClass,props.textClass">
            <p>{{ props.selectedOption ? props.selectedOption : '---Select---' }}</p>
            <icons-arrow1 class="text-secondary rotate-0 transition-transform duration-300"
                :class="{ '!-rotate-180': openOption === true }" />
        </div>
        <transition name="collapse">
            <ul v-if="openOption" class="absolute top-full left-0 z-2 flex flex-col w-full">
                <li v-for="(option, optionIdx) in props.data" :key="optionIdx" @click="handleChooseCate(option)"
                    class="h-10 pl-5 flex items-center text-primary cursor-pointer bg-background-02 hover:bg-stroke" :class="props.textClass">
                    {{ option }}
                </li>
            </ul>
        </transition>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    data: string[],
    selectedOption: string,
    additionClass?: string,
    textClass?:string
}>(), {
    data: () => [],
    selectedOption:'',
    additionClass: '',
    textClass: ''
})
const openOption = ref(false)
const emit = defineEmits<{
    (e: 'update:selectedOption', value: string): void
}>()
const handleOpenCategory = () => {
    openOption.value = !openOption.value
}
const handleChooseCate = (cate: string) => {
    emit('update:selectedOption', cate)
    openOption.value = false
}
</script>

<style scoped>

</style>