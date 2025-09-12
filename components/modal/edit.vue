<template>
    <div @click.stop>
        <transition name="fade">
            <div v-if="props.isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
            </div>
        </transition>
        <transition name="scale">
            <div v-if="props.isOpen" class="fixed inset-0 flex items-center justify-center z-110"
                @mousedown.self="closeModal">
                <div class="bg-white w-[80dvw] xs:w-110 md:w-150 rounded-2xl flex flex-col px-4">
                    <div class="py-4 flex justify-between items-center border-b border-gray-200">
                        <p class="text-2xl font-semibold">{{ props.title ? props.title : "Edit product" }}</p>
                        <button
                            class="h-8 w-8 text-black rounded-md flex justify-center items-center hover:bg-gray-300 cursor-pointer"
                            @click="closeModal">
                            <icons-close class="h-5 w-5" />
                        </button>
                    </div>
                    <div class="flex flex-col py-4 text-xl">
                        <slot />
                    </div>
                    <div class="border-t border-gray-200">
                        <div class="flex justify-end items-center py-2">
                            <button type="submit" @click="save"
                                class="p-4 py-2 flex justify-center items-center bg-chart-green rounded-xl text-primary text-xl cursor-pointer">
                                Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    isOpen: boolean,
    title?: string
}>();
const emit = defineEmits(["close", "save"]);
const closeModal = () => {
    emit("close");
};
const save = () => {
    emit("save");
    closeModal();
};
</script>

<style lang="scss" scoped></style>
