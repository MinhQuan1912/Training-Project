<template>
    <div @click.stop>
        <div v-if="props.isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
            <div class="bg-white w-150 rounded-2xl flex flex-col px-4">
                <div class="py-4 flex justify-between items-center border-b border-gray-200">
                    <p class="text-2xl font-semibold">Are you sure you want to delete this product ?</p>
                </div>
                <div class="p-4 py-2 flex justify-end items-center gap-4">
                    <button @click="closeModal"
                        class="p-3 h-12 flex justify-center items-center border-3 border-[#ff6a55] text-[#ff6a55] rounded-xl 
                        cursor-pointer text-xl font-semibold hover:text-primary hover:bg-[#ff6a55] transition-colors duration-200 ease">
                        Cancel
                    </button>
                    <button @click="deleteModal"
                        class="p-3 h-12 flex justify-center items-center border-3 border-primary-02 text-primary-02 rounded-xl 
                        cursor-pointer text-xl font-semibold hover:text-primary hover:bg-primary-02 transition-colors duration-200 ease">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type Product = {
    id: number
    image: string
    name: string
    type: string
    status: boolean
    price: number
}
const props = defineProps<{
    isOpen: boolean,
    item: Product
}>()
const emit = defineEmits(['close', 'delete'])
const closeModal = () => {
    emit('close')
}
const deleteModal = () => {
    emit('delete', props.item.id)
    closeModal()
}
</script>

<style scoped></style>