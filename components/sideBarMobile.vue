<template>
    <div class="fixed top-0 bottom-0 right-0 bg-background-surface1 p-5 z-50 w-full xs:w-75 flex lg:hidden flex-col gap-5">
        <div class="h-12 flex justify-between items-center ">
            <div class="w-12 h-12">
                <img src="/images/logo.png" class="w-full h-full object-contain" />
            </div>
            <button
                class="w-12 h-12 rounded-full bg-background-02 text-secondary flex justify-center items-center cursor-pointer hover:text-background-02 hover:bg-white transition-all duration-300 ease"
                @click="closeSideBar">
                <icons-close />
            </button>
        </div>
        <div class="flex flex-col ">
            <div v-for="(item, itemIdx) in props.menuList" :key="itemIdx"
                class="flex flex-col transition-all duration-300 ease">
                <div v-if="item.subMenu" class="flex justify-between items-center h-10 cursor-pointer"
                    @click="toggleSubMenu(itemIdx)" :class="{
                        'text-primary': isActive(item),
                        'hover:text-primary': !isActive(item),
                    }">
                    <div class="flex items-center justify-between gap-2">
                        <component :is="item.icon" />
                        <div>{{ item.label }}</div>
                    </div>
                    <icons-arrow1 :class="[
                        'transition-transform duration-300 ease',
                        openIndexs.includes(itemIdx) ? '-rotate-180' : 'rotate-0',
                    ]" />
                </div>
                <nuxt-link :to="item.to" v-else class="flex justify-between items-center h-10 gap-2" :class="{
                    'text-primary': isActive(item),
                    'hover:text-primary': !isActive(item),
                }">
                    <div class="flex items-center justify-between gap-2">
                        <component :is="item.icon" />
                        <div>{{ item.label }}</div>
                    </div>
                </nuxt-link>
                <transition name="collapse">
                    <div v-show="item.subMenu && openIndexs.includes(itemIdx)" class="pl-5">
                        <nuxt-link :to="drop.to" v-for="(drop, dropIdx) in item.subMenu" :key="dropIdx"
                            class="h-10 px-3 flex items-center rounded-xl transition-all duration-300 ease" :class="{
                                'text-primary bg-background-pop': isActive(drop),
                                'hover:text-primary hover:bg-background-pop': !isActive(drop),
                            }">
                            <span>{{ drop.label }}</span>
                        </nuxt-link>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useSideBar } from '~/composable/useSideBar';
const { showSideBar } = useSideBar()
type Menu = {
    label: string;
    icon?: Component;
    to?: string;
    title?: string;
    default?: boolean;
    subMenu?: Menu[];
};
const props = defineProps<{ menuList: Menu[] }>()
const route = useRoute()
const openIndexs = ref<number[]>([])
const closeSideBar = () => {
    showSideBar.value = false
}
const toggleSubMenu = (id: number) => {
    if (openIndexs.value.includes(id)) {
        openIndexs.value = openIndexs.value.filter(i => i !== id)
    }
    else {
        openIndexs.value.push(id)
    }
}
const isActive = (item: Menu) => {
    if (item.to && route.path === item.to) {
        return true;
    }
    if (item.subMenu?.some((sub) => sub.to === route.path)) {
        return true;
    }
    return false;
};
watch(
    () => route.fullPath,
    () => {
        showSideBar.value = false
        const index = props.menuList.findIndex(m =>
            m.subMenu?.some(sub => sub.to === route.path)
        )
        openIndexs.value = [index]
    }
)
</script>

<style scoped></style>