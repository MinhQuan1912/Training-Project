<template>
    <div @click.stop>
        <div v-if="props.isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-100"
            @click.self="closeModal">
            <div class="bg-white w-150 rounded-2xl flex flex-col px-4">
                <div class="py-4 flex justify-between items-center border-b border-gray-200">
                    <p class="text-2xl font-semibold">Edit product</p>
                    <button
                        class="h-8 w-8 text-black rounded-md flex justify-center items-center hover:bg-gray-300 cursor-pointer"
                        @click="closeModal">
                        <icons-close class="h-5 w-5" />
                        </button>
                </div>
                <div class="flex flex-col py-4 text-xl">
                    <form class="flex gap-x-4 gap-y-4 flex-wrap" @submit.prevent="save">
                        <div class="flex flex-col gap-2 w-full">
                            <div class="">Product name</div>
                            <input type="text" class="!border border-black rounded-xl p-2" v-model="editProduct.name">
                        </div>
                        <div class="flex flex-col gap-2 w-full">
                            <div class="">Product type</div>
                            <input type="text" class="!border border-black rounded-xl p-2" v-model="editProduct.type">
                        </div>
                        <div class="flex flex-col gap-2 w-[calc(50%-8px)]">
                            <div class="">Product price</div>
                            <input type="number" class="!border border-black rounded-xl p-2"
                                v-model="editProduct.price">
                        </div>
                        <div class="flex flex-col gap-2 w-[calc(50%-8px)]">
                            <div class="">Product status</div>
                            <div class="flex justify-between items-center gap-5">
                                <label
                                    class="
                                    flex justify-center items-center flex-1 h-12 border-3 rounded-xl cursor-pointer transition-colors duration-200 ease"
                                    :class="editProduct.status === true
                                        ? 'bg-primary-02 text-white border-primary-02'
                                        : 'border-primary-02 text-primary-02 hover:text-white hover:bg-primary-02'">
                                    <input type="radio" class="hidden" :value="true" v-model="editProduct.status" />
                                    Active
                                </label>
                                <label
                                    class="
                                    flex justify-center items-center flex-1 h-12 border-3 rounded-xl cursor-pointer transition-colors duration-200 ease"
                                    :class="editProduct.status === false
                                        ? 'bg-[#ff6a55] text-white border-[#ff6a55]'
                                        : 'border-[#ff6a55] text-[#ff6a55] hover:text-white hover:bg-[#ff6a55]'">
                                    <input type="radio" class="hidden" :value="false" v-model="editProduct.status" />
                                    Offline
                                </label>
                            </div>
                        </div>
                    </form>
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
    </div>

</template>

<script setup lang="ts">
type Product = {
    id: number,
    image: string,
    name: string,
    type: string,
    status: boolean,
    price: number
}
const props = defineProps<{
    isOpen: boolean,
    item: Product
}>()
const emit = defineEmits(['close', 'save'])
const closeModal = () => {
    editProduct.value = { ...props.item }
    emit('close')
}
const save = () => {
    emit('save', { ...editProduct.value, id: props.item.id })
    closeModal()
}
const editProduct = ref<Product>({ ...props.item })
watch(() => props.item,
    (newVal) => {
        editProduct.value = { ...newVal }
    }, { deep: true })
</script>

<style scoped></style>