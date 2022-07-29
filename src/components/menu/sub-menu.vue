<template>
    <div :class="`${prefix}sub-menu`">
        <dc-tooltip v-if="fold" :disabled="false" placement="right">
            <div :class="`${prefix}sub-menu-icon`">
                <slot name="icon"></slot>
            </div>
            <template v-slot:content>
                <slot></slot>
            </template>
        </dc-tooltip>
        <template v-else>
            <div :class="`${prefix}sub-menu-title-wrapper`" @click="changeOpenStatus">
                <slot name="icon"></slot>
                <slot name="title"></slot>
                <div :class="[`${prefix}sub-menu-arrow`, isOpen? `icon-arrow-up${icon}`: `icon-arrow-down${icon}`, 'iconfont']"></div>
            </div>
            <dc-transiton type="height">
                <div v-show="isOpen">
                    <slot></slot>
                </div>
            </dc-transiton>
        </template>
    </div>
</template>

<script setup>
    import { prefix, icon } from "../../config";
    import { ref, reactive, getCurrentInstance, defineProps, inject, computed } from "vue";
    import DcTooltip from "../tooltip/tooltip.vue";
    import DcTransiton from "../transition/transition.vue"
    const current = getCurrentInstance();
    current.name = "DcSubMenu";
    const props = defineProps({
        index: {
            type: String,
            required: true
        }
    })
    const fold = inject("fold");
    const openIndex = inject("openIndex");
    const isOpen = computed(() => openIndex.value.includes(props.index));
    const changeOpenStatus = () => {
        let i = openIndex.value.indexOf(props.index);
        i == -1? openIndex.value.push(props.index): openIndex.value.splice(i, 1);
    }
</script>