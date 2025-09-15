<template>
    <div class="flex flex-col m:flex-row gap-3">
        <div class="flex flex-col gap-3 flex-1">
            <div class="create-product-section">
                <h6 class="h-12 flex items-center xs:pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Product details
                </h6>
                <div class="flex flex-col xs:px-5 gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-5.5 flex items-center py-1 gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">
                                Product title
                            </span>
                            <tooltip text="Maximum 100 characters. No HTML or emoji allowed">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <div class="h-12 flex justify-between items-center py-3 px-5 border-[1.5px] rounded-[48px]"
                            :class="error && error.length > 0 ? 'border-primary-03' : 'border-stroke'">
                            <input spellcheck="false" type="text" v-model="title" @input="validateTitle"
                                class="text-primary text-sm leading-[150%] w-95/100 outline-none" />
                            <icons-tick v-if="error && error.length === 0 && title.length > 0"
                                class="text-primary-02" />
                            <icons-close v-if="error && error.length > 0" class="text-primary-03" />
                        </div>
                        <p v-if="error && error.length > 0" v-for="err in error" class="text-primary-03 text-xs pl-3">
                            {{ err }}
                        </p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center py-1 gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Description</span>
                            <tooltip text="Description">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <products-create-product-text-area v-model="descriptionText" />
                    </div>
                </div>
            </div>
            <div class="create-product-section">
                <h6 class="h-12 flex items-center xs:pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Images
                </h6>
                <div class="flex flex-col xs:px-5 gap-4 xs:gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Previews</span>
                            <tooltip text="Previews">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <upload-image v-model:preview="preview" image-id="preview" fit-class="object-cover" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Full previews</span>
                            <tooltip text="Full previews">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <upload-image v-model:preview="previewFull" image-id="previewFull" fit-class="object-contain"
                            additionClass="m:h-270" />
                    </div>
                </div>
            </div>
            <div class="create-product-section">
                <h6 class="h-12 flex items-center xs:pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Category & attributes
                </h6>
                <div class="flex flex-col gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Category</span>
                            <tooltip text="Category">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <select-dropdown v-model:selected-option="selectedCategory" :data="categoryList"
                            addition-class="h-12 !border !border-background-02" />
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Compatibility</span>
                            <tooltip text="Compatibility">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <div class="grid grid-cols-2 sm:grid-cols-3 m:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
                            <button v-for="(item, idx) in compatibilityList" :key="idx"
                                class=" flex p-3 items-center gap-2 border-[1.5px] border-stroke rounded-[48px] cursor-pointer hover:bg-stroke transition-all duration-300 ease"
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
                        <div class="h-4 flex gap-1.5 items-center">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Tags</span>
                            <tooltip text="Tags">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <div class="flex p-2 rounded-[20px] border-[1.5px] border-stroke gap-1.5 flex-wrap">
                            <div v-for="(tag, tagIdx) in tagAfterRemove" :key="tagIdx"
                                class="h-8 px-3 flex items-center justify-between gap-1.5 rounded-4xl bg-background-surface1 cursor-pointer hover:bg-stroke"
                                @click="handleRemoveTag(tagIdx)">
                                <span class="text-primary text-sm leading-[150%]">{{ tag }}</span>
                                <icons-tag-close class="text-tertiary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="create-product-section">
                <h6 class="h-12 flex items-center xs:pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Discussion
                </h6>
                <div class="flex flex-col xs:px-5 gap-8">
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center py-1 gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Message to reviewer</span>
                            <tooltip text="Message to reviewer">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <products-create-product-text-area v-model="messageText" />
                    </div>
                </div>
            </div>
        </div>
        <div class="m:w-92 3xl:w-135 flex sm:grid grid-cols-2 m:flex flex-col gap-3">
            <div class="create-product-section !p-3">
                <div class="h-12 xs:px-3 flex items-center justify-between gap-3 text-secondary">
                    <h6 class="text-xl leading-[145%] font-semibold text-primary">Cover image</h6>
                    <icons-arrow2 class="cursor-pointer" />
                </div>
                <div class="xs:px-3 m:p-3 gap-5 flex flex-col">
                    <div class="h-60 w-full relative rounded-4xl overflow-hidden">
                        <img src="/images/uploadImage03.png" class="w-full h-full object-cover" alt="Cover image">
                        <button
                            class="w-12 h-12 rounded-full bg-background-02 text-secondary absolute top-3 right-3 
                                flex justify-center items-center cursor-pointer hover:text-background-02 hover:bg-white transition-all duration-300 ease">
                            <icons-close />
                        </button>
                    </div>
                    <div class="flex justify-between items-center m:items-start gap-3 m:gap-0">
                        <div class="flex flex-col gap-2">
                            <div class="text-primary font-semibold line-clamp-1">Bento Pro v 2.0 - Illustration Kit
                            </div>
                            <div class="flex gap-2 items-center">
                                <img src="/images/avatar.png" class="w-8 h-8 object-contain">
                                <div class="h-5.25 flex gap-1 text-secondary text-sm leading-[150%]">
                                    by<span class="leading-[100%] text-primary font-semibold">Hortense</span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="h-9 py-1.5 px-3 rounded-xl bg-secondary-04 text-light text-sm leading-[100%] font-semibold flex items-center">
                            $98</div>
                    </div>
                </div>
            </div>
            <div class="create-product-section xs:!pb-6">
                <h6 class="h-12 flex items-center xs:pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Upload product files
                </h6>
                <div class="flex flex-col xs:px-3 gap-4">
                    <upload-image v-model:preview="previewProductFile" image-id="previewProductFile"
                        fit-class="object-cover" addition-class="!h-60 m:!h-57.5" image-class="w-8 h-8"
                        text-class="text-sm leading-[150%]" />
                    <div class="flex m:p-6 gap-6 justify-between items-center border-[1.5px] border-stroke rounded-3xl">
                        <div class="flex flex-col gap-2">
                            <div class="font-semibold text-primary line-clamp-1 tracking-[0.0015em]">Bento Pro v 2.0 -
                                Illustration Kit.zip</div>
                            <div class="flex gap-2">
                                <icons-zip />
                                <div class="text-secondary">128 MB</div>
                            </div>
                        </div>
                        <div class="delete-product-file">
                            <icons-trash class="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="create-product-section !p-3">
                <h6 class="h-12 flex items-center xs:pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Price
                </h6>
                <div class="xs:p-3 flex flex-col m:flex-row gap-3">
                    <div class="flex flex-col gap-4 flex-1">
                        <div class="flex gap-1.5 items-center">
                            <div class="text-primary text-sm leading-[100%] font-semibold">Price (USD)</div>
                            <tooltip text="price"><icons-helping class="text-secondary w-4 h-4" /></tooltip>
                        </div>
                        <div class="flex p-1 border-[1.5px] border-stroke rounded-[48px] gap-2">
                            <icons-dollar />
                            <input type="number"
                                class="opacity-50 text-secondary text-sm leading-[150%] w-full m:w-25 3xl:w-46"
                                v-model="price">
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 flex-1">
                        <div class="flex gap-4 justify-between items-center">
                            <div class="py-1 gap-1.5 flex items-center">
                                <div class="text-primary text-sm leading-[100%] font-semibold">Promo</div>
                                <tooltip text="Promo"><icons-helping class="text-secondary w-4 h-4" /></tooltip>
                            </div>
                            <div class="promo-switch" :class="{ 'promo-switch--on': activePromo }"
                                @click="handletogglePromo">
                                <div class="promo-button"></div>
                            </div>
                        </div>
                        <div class="opacity-0" :class="{ 'opacity-100': activePromo }">
                            <select-dropdown v-if="selectedPromo" :data="promoList.map(i => i.label)"
                                v-model:selected-option="selectedPromo.label" addition-class="h-12"
                                text-class="text-secondary" :class="{ 'block': activePromo }" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="create-product-section !p-3">
                <h6 class="h-12 flex items-center pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Highlights
                </h6>
                <div class="flex flex-col p-3 gap-3">
                    <div v-for="(highlight, hlIdx) in highlightList" :key="hlIdx"
                        class="flex p-3 gap-3 items-center border-[1.5px] border-stroke-highlight rounded-[48px]">
                        <div v-if="highlight.confirm">
                            <icons-confirm />
                        </div>
                        <div v-else>
                            <icons-not-confirm />
                        </div>
                        <input type="text" :value="highlight.label" class="text-sm leading-[150%] flex-1" :class="{
                            'text-primary': highlight.confirm,
                            'text-secondary': !highlight.confirm
                        }" />
                        <icons-highlight-drag-handle />
                    </div>
                </div>
            </div>
            <div class="create-product-section !p-3">
                <h6 class="h-12 flex items-center pl-5 text-xl leading-[145%] font-semibold text-primary">
                    CTA button
                </h6>
                <div class="m:p-3">
                    <select-dropdown :data="ctaList" v-model:selected-option="selectedCTA"
                        addition-class="w-full h-12" />
                </div>
            </div>
            <div class="create-product-section !p-3">
                <h6 class="h-12 flex items-center pl-5 text-xl leading-[145%] font-semibold text-primary">
                    Demos
                </h6>
                <div class="p-3 flex flex-col gap-3">
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center py-1 gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Live demo</span>
                            <tooltip text="Live demo">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <div
                            class="h-12 flex px-5 py-3 gap-3 justify-between items-center border-[1.5px] border-stroke rounded-[48px]">
                            <input type="text" value="https://ui8.net/coredashboard.html"
                                class="text-sm leading-[150%] text-primary flex-1" spellcheck="false" />
                            <icons-tick class="text-primary-02" />
                        </div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="h-4 flex items-center py-1 gap-1.5">
                            <span class="text-primary text-sm leading-[100%] font-semibold">Embed video</span>
                            <tooltip text="Embed video">
                                <icons-helping class="h-4 w-4 text-tertiary hover:text-blue cursor-pointer" />
                            </tooltip>
                        </div>
                        <div class="h-12 flex px-5 py-3 items-center border-[1.5px] border-stroke rounded-[48px]">
                            <input type="text" value="ie. Bento Cards: User Interface"
                                class="text-sm leading-[150%] text-secondary opacity-50 flex-1" spellcheck="false" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showCreateProduct" class="flex m:hidden justify-end gap-3 w-full">
            <button @click="saveDraft"
                class="w-1/2 sm:w-auto h-12 py-3.5 px-7 flex justify-center items-center rounded-full text-[15px] leading-6 text-secondary font-semibold bg-background-02 cursor-pointer">Save
                draft</button>
            <select-dropdown :data="selectList" v-model:selected-option="selectedOpt" addition-class="addition"
                text-class=" font-semibold" over-all-class="w-1/2 sm:w-auto" />
        </div>
    </div>
    <modal-edit :is-open="showSaveModal" @close="showSaveModal = false" title="Information" @save="saveModal">
        <form class="flex gap-x-4 gap-y-4 flex-wrap max-h-85 sm:max-h-140 overflow-y-auto ">
            <div v-if="title" class="flex flex-col gap-1 xs:gap-2 w-full">
                <div class="text-base xl:text-lg">Product name</div>
                <div class="flex items-center rounded-xl p-2 text-sm xs:text-xl h-12 bg-secondary/30">{{ title }}</div>
            </div>
            <div v-if="descriptionText" class="flex flex-col gap-1 xs:gap-2 w-full">
                <div class="text-base xl:text-lg">Product description</div>
                <div class="flex items-center rounded-xl p-2 text-sm xs:text-xl h-12 bg-secondary/30">{{ descriptionText
                }}</div>
            </div>
            <div v-if="preview" class="flex flex-col gap-2 w-full ">
                <div class="text-base xl:text-lg">Product image</div>
                <div class="h-50 xs:h-78 rounded-4xl overflow-hidden">
                    <img v-if="preview" :src="preview" class="w-full h-full object-cover">
                </div>
            </div>
            <div v-if="selectedCategory" class="flex flex-col gap-1 xs:gap-2 w-full">
                <div class="text-base xl:text-lg">Category</div>
                <div class="flex items-center rounded-xl p-2 text-sm xs:text-xl h-12 bg-secondary/30">{{
                    selectedCategory }}</div>
            </div>
            <div v-if="activeCompatibilitys.length > 0" class="flex flex-col gap-1 xs:gap-2 w-full">
                <div class="text-base xl:text-lg">Compatibility</div>
                <div class="grid grid-cols-2 xs:grid-cols-3 gap-2">
                    <div v-for="item in activeCompatibilitys.map(i => compatibilityList[i]?.name)"
                        class="flex items-center justify-center rounded-xl p-2 text-sm xs:text-xl h-12 bg-secondary/30">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div v-if="tagAfterRemove.length > 0" class="flex flex-col gap-1 xs:gap-2 w-full">
                <div class="text-base xl:text-lg">Tags</div>
                <div class="grid grid-cols-2 xs:grid-cols-3 gap-2">
                    <div v-for="item in tagAfterRemove"
                        class="flex items-center justify-center rounded-xl p-2 text-sm xs:text-xl h-12 bg-secondary/30">
                        {{ item }}
                    </div>
                </div>
            </div>
            <div v-if="messageText" class="flex flex-col gap-1 xs:gap-2 w-full">
                <div class="text-base xl:text-lg">Message to reviewer</div>
                <div class="flex items-center rounded-xl p-2 text-sm xs:text-xl h-12 bg-secondary/30">{{ messageText
                }}</div>
            </div>
            <div v-if="price" class="flex flex-col gap-1 xs:gap-2 w-full">
                <div class="text-base xl:text-lg">Product price</div>
                <div class="flex items-center rounded-xl p-2 text-sm xs:text-xl h-12 bg-secondary/30">
                    {{ (activePromo ? price * (1 - (selectedPromoValue?.value ?? 0)) : price).toLocaleString('en-US') }}
                </div>
            </div>
        </form>
    </modal-edit>
</template>

<script setup lang="ts">

import { useCreateProduct } from '~/composable/useCreateProduct'

definePageMeta({
    title: 'New Product'
})

type highlight = {
    label: string,
    confirm: boolean
}
const price = ref()
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
const tagAfterRemove = ref([...tagList.value])
const categoryList = ref<string[]>([
    'Illustrations',
    '1',
    '2',
    '3',
    '4',
])
const promoList = ref([
    {
        label: '10%',
        value: 0.1
    },
    {
        label: '20%',
        value: 0.2
    },
    {
        label: '30%',
        value: 0.3
    },
    {
        label: '40%',
        value: 0.4
    },
    {
        label: '50% (max)',
        value: 0.5
    },
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
const highlightList = ref<highlight[]>([
    {
        label: '400+ components',
        confirm: true
    },
    {
        label: 'ie. Free Google Fonts',
        confirm: true
    },
    {
        label: 'ie. 300+ custom icons',
        confirm: true
    },
    {
        label: 'ie. 800 premade templates',
        confirm: false
    },
    {
        label: 'ie. 256+ illustrations',
        confirm: false
    },
])
const ctaList = ref([
    'Purchase Now',
    'Add to cart',
    'View details',
    'Sign up now',
    'Try for free'
])
const selectList = ref([
    'Publish now',
    '1',
    '2',
    '3'
])
const selectedPromoValue = computed(() => {
    const promo = promoList.value.find(i => i.label === selectedPromo.value?.label)
    return promo
})
const saveModal = () => {
    showSaveModal.value = false
    if (previousRoute.value && previousRoute.value !== '/product') {
        router.push(previousRoute.value)
    }
    else {
        router.push('/product')
        showCreateProduct.value = false
    }
}
const clearInput = () => {
    title.value = ''
    preview.value = null
    descriptionText.value = ''
    selectedCategory.value = ''
    messageText.value = ''
    activeCompatibilitys.value = []
    selectedPromo.value = promoList.value[promoList.value.length - 1]

}
const selectedOpt = ref(selectList.value[0])
const { showCreateProduct, showSaveModal, previousRoute } = useCreateProduct()
const router = useRouter(   )
const descriptionText = ref('')
const messageText = ref('')
const activeCompatibilitys = ref<number[]>([])
const selectedCategory = ref<string>('')
const preview = ref<string | null>(null)
const previewFull = ref<string | null>(null)
const previewProductFile = ref<string | null>(null)
const activePromo = ref(true)
const selectedPromo = ref(promoList.value[promoList.value.length - 1])
const selectedCTA = ref(ctaList.value[0])
const title = ref("");
const error = ref<string[] | null>(null);

const validateTitle = () => {
    const htmlTagRegex = /<\/?[a-z]+>/g;
    error.value = []
    if (title.value.length > 100) {
        error.value.push("Maximum 100 characters allowed");
    }
    if (htmlTagRegex.test(title.value)) {
        error.value.push("HTML tags are not allowed")
    }
};
const handletogglePromo = () => {
    activePromo.value = !activePromo.value
}
const handleClickCompa = (index: number) => {
    if (activeCompatibilitys.value.includes(index)) {
        activeCompatibilitys.value = activeCompatibilitys.value.filter(i => i !== index)
    }
    else {
        activeCompatibilitys.value.push(index)
    }
}
const handleRemoveTag = (index: number) => {
    tagAfterRemove.value.splice(index, 1)
}
const saveDraft = () => {
    showCreateProduct.value = false
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

    @media (width < 480px) {
        padding-bottom: 12px;
    }
}

.delete-product-file {
    min-width: 52px;
    height: 52px;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #FDFDFD 0%, #DEDEDE 100%);
    border: 1.5px solid linear-gradient(158.39deg,
            rgba(255, 255, 255, 0.55) 14.19%,
            rgba(255, 255, 255, 0.0001) 35.83%,
            rgba(255, 255, 255, 0.0001) 64.26%,
            rgba(255, 255, 255, 0.25) 85.81%);
    box-shadow: 2px 0px 8px 2px #18181833 inset;
    cursor: pointer;
}

.promo-switch {
    border-image-source: linear-gradient(158.39deg,
            rgba(255, 255, 255, 0.1) 14.19%,
            rgba(255, 255, 255, 0.000025) 35.83%,
            rgba(255, 255, 255, 0.000025) 64.26%,
            rgba(255, 255, 255, 0.025) 85.81%);
    width: 44px;
    border: 1.5px solid var(--color-secondary);
    border-radius: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px;

}

.promo-switch--on {
    background: linear-gradient(180deg, #2C2C2C 0%, #282828 100%);
    box-shadow: 2px 0px 8px 2px #F8F8F833 inset;
    border-image-source: linear-gradient(158.39deg,
            rgba(255, 255, 255, 0.1) 14.19%,
            rgba(255, 255, 255, 0.000025) 35.83%,
            rgba(255, 255, 255, 0.000025) 64.26%,
            rgba(255, 255, 255, 0.025) 85.81%);
    border: 1.5px solid var(--color-secondary);
}

.promo-button {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background: var(--color-stone-700);
    transition: all 0.3s ease
}

.promo-switch--on .promo-button {
    background: var(--color-neutral-01);
    transform: translateX(18px);
}
</style>