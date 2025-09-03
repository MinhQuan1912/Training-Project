<template>
    <div class="fixed top-0 bottom-0 right-0 bg-background-surface1 p-5 z-20 w-100 flex lg:hidden flex-col gap-5">
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

    </div>
</template>

<script setup lang="ts">
import { useSideBar } from '~/composable/useSideBar';
const { showSideBar } = useSideBar()
const closeSideBar = () => {
    showSideBar.value = false
}
</script>

<style scoped></style>