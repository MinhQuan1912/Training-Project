<template>
    <div class="h-78 w-full rounded-4xl bg-black relative" :class="additionClass">
        <div v-if="!preview" class="flex items-center justify-center text-secondary group h-full">
            <!-- <label for="upload1" class="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                                    <icons-upload
                                        class="w-20 h-20 group-hover:text-primary transition-all duration-300" />
                                    <span class="text-4xl group-hover:text-primary transition-all duration-300">Upload
                                        Image</span>
                                </label> -->
            <div class="flex flex-col gap-2 items-center justify-center w-full h-full">
                <icons-upload :class="imageClass"/>
                <div class="text-2xl text-center" :class="textClass">Drag and drop product file, or
                    <label :for="imageId" class="font-bold text-primary cursor-pointer hover:underline">Browse</label>
                </div>
            </div>
            <input :id="imageId" accept="image/*" type="file" class="hidden" @change="onPreviewChange" />
        </div>
        <div v-else class="w-full h-full">
            <img :src="preview" class="w-full h-full rounded-4xl" :class="fitClass">
            <button
                class="w-12 h-12 rounded-full bg-background-02 text-secondary absolute top-3 right-3 
                                flex justify-center items-center cursor-pointer hover:text-background-02 hover:bg-white transition-all duration-300 ease"
                @click="removePreviewImage">
                <icons-close />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    fitClass: {
        type: String,
        required: true
    },
    imageId: {
        type: String,
        required:true
    },
    additionClass: {
        type: String,
        default: ''
    },
    imageClass: {
        type: String,
        default:''
    },
    textClass: {
        type: String,
        default:''
    },
    
})
const preview = defineModel <string | null > ('preview')
const onPreviewChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
        preview.value = URL.createObjectURL(file)
    }
}
const removePreviewImage = () => {
    preview.value = null
}
</script>

<style scoped></style>