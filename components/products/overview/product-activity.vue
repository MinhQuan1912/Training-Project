<template>
    <div class="flex items-center justify-between h-12">
        <h6 class="px-5 flex items-center text-xl leading-[145%] font-semibold text-primary">
            Product activity
        </h6>
        <select-dropdown v-model:selected-option="selectedOption" :data="options" addition-class="w-40"
            text-class="text-secondary" />
    </div>
    <div class="px-5 pt-4">
        <table class="w-full text-sm leading-[150%] text-primary border-collapse">
            <thead>
                <tr class="text-xs leading-[160%] text-tertiary">
                    <th class="py-5 text-left">Week</th>
                    <th class="py-5 text-left">Products</th>
                    <th class="py-5 text-left">Views</th>
                    <th class="py-5 text-left">Likes</th>
                    <th class="py-5 text-left hidden 2xl:table-cell">Comments</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in productActivityList" :key="idx" class="h-17 border-t border-stroke-subtle">
                    <!-- Week -->
                    <td class="py-4">{{ item.week }}</td>
                    <!-- Product -->
                    <td class="py-4">
                        <div class="flex items-center gap-2">
                            {{ item.product.value }}
                            <span v-if="item.product.growthRate">
                                <products-overview-trend :growth-rate="item.product.growthRate" />
                            </span>
                        </div>
                    </td>
                    <!-- View -->
                    <td class="py-4">
                        <div class="flex items-center gap-2">
                            {{ item.view.value }}
                            <span v-if="item.view.growthRate">
                                <products-overview-trend :growth-rate="item.view.growthRate" />
                            </span>
                        </div>
                    </td>
                    <!-- Like -->
                    <td class="py-4">
                        <div class="flex items-center gap-2">
                            {{ item.like.value }}
                            <span v-if="item.like.growthRate">
                                <products-overview-trend :growth-rate="item.like.growthRate" />
                            </span>
                        </div>
                    </td>
                    <!-- Comment -->
                    <td class="py-4 hidden 2xl:table-cell">
                        <div class="flex items-center gap-2">
                            {{ item.comment.value }}
                            <span v-if="item.comment.growthRate">
                                <products-overview-trend :growth-rate="item.comment.growthRate" />
                            </span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup lang="ts">
type activityCol = {
    value: string,
    growthRate?: number
}
type activityRow = {
    week: string,
    product: activityCol,
    view: activityCol,
    like: activityCol,
    comment: activityCol
}
const productActivityList = ref<activityRow[]>([
    {
        week: '13 Jan - 20 Jan',
        product: {
            value: '24k',
            growthRate: 31
        },
        view: {
            value: '24k',
            growthRate: -32
        },
        like: {
            value: '48',
            growthRate: 12
        },
        comment: {
            value: '16',
            growthRate: -18
        }
    },
    {
        week: '20 Jan - 27 Jan',
        product: {
            value: '40k',
            growthRate: 21
        },
        view: {
            value: '16k',
            growthRate: -29
        },
        like: {
            value: '64',
            growthRate: 12
        },
        comment: {
            value: '32',
            growthRate: 42
        }
    },
    {
        week: '27 Jan - 03 Feb',
        product: {
            value: '14k',
            growthRate: -13
        },
        view: {
            value: '2k',
            growthRate: -50
        },
        like: {
            value: '134',
            growthRate: 23
        },
        comment: {
            value: '32',
            growthRate: 31
        }
    },
    {
        week: '03 Feb - 10 Feb',
        product: {
            value: '64k',
            growthRate: 12
        },
        view: {
            value: '16k',
            growthRate: -29
        },
        like: {
            value: '64',
            growthRate: -32
        },
        comment: {
            value: '32',
            growthRate: 21
        }
    },

])
const options = ref<string[]>([
    'Last 1 week',
    'Last 2 week',
    'Last 3 week',
    'Last 4 week',
])
const selectedOption = ref<string>(options.value[1] || '')
</script>

<style lang="scss" scoped></style>