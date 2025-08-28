<template>
    <div class="relative group">
        <div class="cursor-pointer">
            <slot></slot>
        </div>
        <div
            class="hidden group-hover:flex items-center absolute z-3 top-0 left-[calc(100%+10px)] h-5.5 px-2 py-1.5 rounded-md bg-background-dark1 text-light text-xs leading-[160%] whitespace-nowrap">
            {{ text }}
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    text: {
        type: String
    }
})
</script>

