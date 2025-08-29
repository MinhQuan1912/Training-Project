<template>
    <select-dropdown :data="selectList" v-model:selected-option="selectedOpt" addition-class="addition"
        text-class=" font-semibold" />
</template>

<script setup lang="ts">
const selectList = ref([
    'Publish now',
    '1',
    '2',
    '3'
])
const selectedOpt = ref(selectList.value[0])
</script>

<style lang="scss">
.addition {
    height: 48px;
    border-radius: 32px !important;
    padding: 12px;
    padding-left: 28px;
    border-width: 1.5px;
    background: linear-gradient(180deg, #FDFDFD 0%, #DEDEDE 100%) !important;
    border-image-source: linear-gradient(158.39deg,
            rgba(255, 255, 255, 0.55) 14.19%,
            rgba(255, 255, 255, 0.0001) 35.83%,
            rgba(255, 255, 255, 0.0001) 64.26%,
            rgba(255, 255, 255, 0.25) 85.81%);
    box-shadow: 2px 0px 8px 2px #18181833 inset;
    min-width: 155px;
    color: var(--color-light)
}
</style>