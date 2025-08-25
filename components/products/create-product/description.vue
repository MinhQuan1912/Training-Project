<template>
    <div class="flex flex-col gap-4">
        <div class="h-4 flex items-center py-1 ">
            <span class="text-primary text-sm leading-[100%] font-semibold">Description</span>
            <u-tooltip class="ml-1.5" text="Description" :delay-duration="0" :content="{ side: 'right' }">
                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
            </u-tooltip>
        </div>
        <div class="h-60 flex flex-col rounded-2xl border-[1.5px] border-stroke">
            <div class="flex items-center bg-[#10101080] border-b-[1.5px] border-stroke-subtle">
                <div class="flex flex-1 p-1 gap-1">
                    <button v-for="(icon, id) in settings" :key="id" class="setting-button"
                        @click="handleClickSetting(id)"
                        :class="{ 'text-primary bg-[#4C4C4C80]': activeIndexs.includes(id) }">
                        <component :is="icon.icon" />
                    </button>
                </div>
                <div class="flex p-1 gap-1">
                    <button class="setting-button">
                        <icons-arrow2 class="-rotate-135" />
                    </button>
                    <button class="setting-button">
                        <icons-arrow2 class="rotate-45" />
                    </button>
                </div>
            </div>
            <textarea class="p-4 h-24 resize-none text-primary text-sm leading-[150%] ">Introducing the next evolution of our premium UI system. Bento Pro Vol.2 builds upon our foundation of minimal design principles while introducing advanced compositions for modern digital experiences. This expanded collection maintains our signature clean aesthetic with seamless light and dark mode support, elevated by new, thoughtfully crafted components.
            </textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    IconsTextSettingAlignCenter,
    IconsTextSettingBold,
    IconsTextSettingBulletList,
    IconsTextSettingEmoji,
    IconsTextSettingItalic,
    IconsTextSettingLink,
    IconsTextSettingUnderline
} from '#components';

const settings = [
    { icon: IconsTextSettingBold },
    { icon: IconsTextSettingItalic },
    { icon: IconsTextSettingUnderline },
    { icon: IconsTextSettingEmoji },
    { icon: IconsTextSettingLink },
    { icon: IconsTextSettingBulletList },
    { icon: IconsTextSettingAlignCenter },
]
const activeIndexs = ref<number[]>([])
const handleClickSetting = (index: number) => {
    if (activeIndexs.value.includes(index)) {
        activeIndexs.value = activeIndexs.value.filter(i => i !== index)
    }
    else {
        activeIndexs.value.push(index);
    }
}
</script>

<style lang="scss" scoped>
.setting-button {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    color: var(--color-secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer
}
</style>