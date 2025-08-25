<template>
    <div class="flex gap-3">
        <div class="flex flex-col gap-3 flex-1">
            <div class="create-product-section">
                <h6 class="h-12 flex items-center pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Product details
                </h6>
                <div class="flex flex-col px-5 gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-5.5 flex items-center py-1 ">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Product title</span>
                            <u-tooltip class="ml-1.5" text="Maximum 100 characters. No HTML or emoji allowed"
                                :delay-duration="0" :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div
                            class="h-12 flex justify-between items-center py-3 px-5 border-[1.5px] border-stroke rounded-[48px]">
                            <input type="text" class="text-primary text-sm leading-[150%] w-95/100">
                            <icons-tick class="text-primary-02" />
                        </div>
                    </div>
                    <products-create-product-description />
                </div>
            </div>
            <div class="create-product-section">
                <h6 class="h-12 flex items-center pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Images
                </h6>
                <div class="flex flex-col px-5 gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Previews</span>
                            <u-tooltip class="ml-1.5" text="Previews" :delay-duration="0" :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div class="h-78 w-full rounded-4xl bg-black  relative">
                            <div v-if="!preview"
                                class="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col gap-2 items-center text-secondary group">
                                <label for="upload1" class="flex flex-col items-center cursor-pointer ">
                                    <icons-upload
                                        class="w-20 h-20 group-hover:text-primary transition-all duration-300" />
                                    <span class="text-4xl group-hover:text-primary transition-all duration-300">Upload
                                        Image</span>
                                </label>
                                <input id="upload1" accept="image/*" type="file" class="hidden"
                                    @change="onPreviewChange" />
                            </div>
                            <div v-else class="w-full h-full">
                                <img :src="preview" class="w-full h-full object-cover rounded-4xl">
                                <button
                                    class="w-12 h-12 rounded-full bg-background-02 text-secondary absolute top-3 right-3 
                                flex justify-center items-center cursor-pointer hover:text-background-02 hover:bg-white transition-all duration-300 ease"
                                    @click="removePreviewImage">
                                    <icons-close />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Full previews</span>
                            <u-tooltip class="ml-1.5" text="Full previews" :delay-duration="0"
                                :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div class="h-270 w-full rounded-4xl bg-black  relative">
                            <div v-if="!previewFull"
                                class="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col gap-2 items-center text-secondary group">
                                <label for="upload2" class="flex flex-col items-center cursor-pointer ">
                                    <icons-upload
                                        class="w-20 h-20 group-hover:text-primary transition-all duration-300" />
                                    <span class="text-4xl group-hover:text-primary transition-all duration-300">Upload
                                        Image</span>
                                </label>
                                <input id="upload2" accept="image/*" type="file" class="hidden"
                                    @change="onPreviewFullChange" />
                            </div>
                            <div v-else class="w-full h-full">
                                <img :src="previewFull" class="w-full h-full rounded-4xl">
                                <button
                                    class="w-12 h-12 rounded-full bg-background-02 text-secondary absolute top-3 right-3 
                                flex justify-center items-center cursor-pointer hover:text-background-02 hover:bg-white transition-all duration-300 ease"
                                    @click="removePreviewFullImage">
                                    <icons-close />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="create-product-section">
                <h6 class="h-12 flex items-center pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Category & attributes
                </h6>
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Category</span>
                            <u-tooltip class="ml-1.5" text="Category" :delay-duration="0" :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div class="relative">
                            <div class="h-12 rounded-full border border-stroke-subtle pl-5 pr-3 flex justify-between items-center text-primary text-sm leading-[150%] cursor-pointer"
                                @click="handleOpenCategory">
                                <p>{{ selectedCategory ? selectedCategory : 'Select category' }}</p>
                                <icons-arrow1 class="text-secondary rotate-0 transition-transform duration-300"
                                    :class="{ '!-rotate-180': openCate === true }" />
                            </div>
                            <transition name="collapse">
                                <ul v-if="openCate" class="absolute top-full left-0 z-2 flex flex-col w-full">
                                    <li v-for="(cate, cateIdx) in categoryList" :key="cateIdx"
                                        @click="handleChooseCate(cate)"
                                        class="h-10 pl-5 flex items-center text-primary cursor-pointer bg-background-02 hover:bg-stroke">
                                        {{ cate }}
                                    </li>
                                </ul>
                            </transition>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Compatibility</span>
                            <u-tooltip class="ml-1.5" text="Compatibility" :delay-duration="0"
                                :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div class="grid grid-cols-4 gap-3">
                            <button v-for="(item, idx) in compatibilityList" :key="idx"
                                class="min-w-52.5 flex p-3 items-center gap-2 border-[1.5px] border-stroke rounded-[48px] cursor-pointer hover:bg-stroke transition-all duration-300 ease"
                                @click="handleClickCompa(idx)"
                                :class="{ 'border-stroke-focus border-2': activeCompatibilitys.includes(idx) }">
                                <div class="w-6 h-6">
                                    <img :src="item.icon" class="w-full h-full object-contain">
                                </div>
                                <div class="text-primary text-sm leading-[100%]">{{ item.name }}</div>
                            </button>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Tags</span>
                            <u-tooltip class="ml-1.5" text="Tag" :delay-duration="0" :content="{ side: 'right' }">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </u-tooltip>
                        </div>
                        <div class="flex p-2 rounded-[20px] border-[1.5px] border-stroke gap-1.5 flex-wrap">
                            <div v-for="(tag, tagIdx) in tagList" :key="tagIdx"
                                class="h-8 px-3 flex items-center justify-between gap-1.5 rounded-4xl bg-background-surface1 cursor-pointer">
                                <span class="text-primary text-sm leading-[150%]">{{ tag }}</span>
                                <icons-tag-close class="text-tertiary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-135"></div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'New Product'
})
const activeCompatibilitys = ref<number[]>([])
const selectedCategory = ref('')
const tagList = ref([
    'Dashboard',
    'Light',
    'Responsive',
    'App',
    'Mobile',
    'SaaS',
    'UI Kit',
    'Illustration',
    'Menu'
])
const categoryList = ref([
    'Illustrations',
    '1',
    '2',
    '3',
    '4',
])
const compatibilityList = ref([
    { icon: '/images/compatibility/Notion.png', name: 'Notion' },
    { icon: '/images/compatibility/AfterEffects.png', name: 'After Effects' },
    { icon: '/images/compatibility/Bootstrap.png', name: 'Bootstrap' },
    { icon: '/images/compatibility/Sketch.png', name: 'Sketch' },
    { icon: '/images/compatibility/Figma.png', name: 'Figma' },
    { icon: '/images/compatibility/Wordpress.png', name: 'Wordpress' },
    { icon: '/images/compatibility/Swift.png', name: 'Swift' },
    { icon: '/images/compatibility/Photoshop.png', name: 'Photoshop' },
    { icon: '/images/compatibility/Blender.png', name: 'Blender' },
    { icon: '/images/compatibility/Cinema4D.png', name: 'Cinema 4D' },
    { icon: '/images/compatibility/Spline.png', name: 'Spline' },
    { icon: '/images/compatibility/HTML.png', name: 'HTML' },
])
const openCate = ref(false)
const preview = ref<string | null>(null)
const previewFull = ref<string | null>(null)
const onPreviewChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
        preview.value = URL.createObjectURL(file)
    }
}
const onPreviewFullChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
        previewFull.value = URL.createObjectURL(file)
    }
}
const removePreviewImage = () => {
    preview.value = null
}
const removePreviewFullImage = () => {
    previewFull.value = null
}
const handleOpenCategory = () => {
    openCate.value = !openCate.value
}
const handleChooseCate = (cate: string) => {
    selectedCategory.value = cate
    openCate.value = false
}
const handleClickCompa = (index: number) => {
    if (activeCompatibilitys.value.includes(index)) {
        activeCompatibilitys.value = activeCompatibilitys.value.filter(i => i !== index)
    }
    else {
        activeCompatibilitys.value.push(index)
    }
}
</script>

<style lang="scss" scoped>
.create-product-section {
    padding: 12px;
    padding-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: var(--color-background-02);
    border-radius: 32px;
}
</style>