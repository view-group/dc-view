<template>
    <div :class="`${prefix}tooltip`" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <div :class="`${prefix}tooltip-rel`" ref="dcTooltipRel">
            <slot></slot>
        </div>
        <dc-transition>
            <div v-if="!props.disabled" v-show="state.show" ref="content" :style="style" :class="`${prefix}tooltip-content-wrapper`" :placement="props.placement">
                <div :class="`${prefix}tooltip-content`">
                    <slot name="content">{{props.content}}</slot>
                </div>
            </div>
        </dc-transition>
    </div>
</template>

<script setup>
    import { prefix } from "../../config";
    import { ref, reactive, computed, defineProps, getCurrentInstance } from "vue";
    import DcTransition from "../transition/transition.vue";

    const current = getCurrentInstance();
    current.name = "DcTooltip";
    const state = reactive({
        show: false,
        positionLeft: 0,
        positionTop: 0
    })
    const props = defineProps({
        content: String,
        zIndex: {
            type: Number,
            default: 1
        },
        disabled: Boolean,
        placement: {
            type: String,
            default: "bottom"
        },
        maxWidth: Number | String
    });
    const dcTooltipRel = ref(null);
    const content = ref(null)
    const style = computed(() => {
        return `left: ${state.positionLeft}px; top: ${state.positionTop}px; z-index: ${props.zIndex}; max-width: ${props.maxWidth}px`
    })
    const mouseenter = async () => {
        if(props.disabled) return;
        state.show = true;
        await Promise.resolve();
        let {left, top, height, width} = dcTooltipRel.value.getBoundingClientRect();
        let contentWidth = content.value.clientWidth;
        let contentHeight = content.value.clientHeight;
        if(props.placement == "bottom") {
            state.positionLeft = left + width/2;
            state.positionTop = top + height;
        }
        if(props.placement == "top") {
            state.positionLeft = left + width/2;
            state.positionTop = top - contentHeight;
        }
        if(props.placement == "left") {
            state.positionLeft = left - contentWidth;
            state.positionTop = top + height/2;
        }
        if(props.placement == "right") {
            state.positionLeft = left + width;
            state.positionTop = top + height/2;
        }
    }
    const mouseleave = () => {
        state.show = false;
    }
</script>
