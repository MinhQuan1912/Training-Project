<template>
    <div class="flex justify-between">
        <h4 class="text-[32px] font-semibold text-primary leading-[145%]">
            {{ pageTitle }}
        </h4>
        <div class="flex justify-evenly items-center h-12 gap-3">
            <div class="w-78.75 rounded-full bg-background-02 flex items-center text-secondary">
                <div class="p-3 pr-2">
                    <icons-search />
                </div>
                <input type="text" placeholder="Search anything... ">
            </div>
            <nuxt-link to="/product/create-product" class="create-button">
                <p class="text-sm font-semibold leading-[100%]">Create</p>
            </nuxt-link>
            <div class="header-button">
                <icons-bell/>
            </div>
            <div class="header-button">
                <icons-bell/>
            </div>
            <div class="header-button">
                <div class="w-10 h-10">
                    <img src="/images/avatar.png" class="w-full h-full object-contain" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const pageTitle = computed(() => {
    return route.meta.title
})
</script>

<style lang="scss" scoped>
.create-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    border-radius: 32px;
    background: linear-gradient(#fdfdfd, #dedede);
    height: 48px;
    cursor: pointer;
}
.header-button {
    background: linear-gradient(#2a2a2a,#202020);
    width:48px;
    height:48px;
    color: var(--color-secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 90px;
}
</style>