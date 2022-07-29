<template>
    <div :class="`${prefix}ellipsis`" ref="$el">
        <template v-if="state.computedReady">
            <DcTooltip v-if="state.beyond && props.tooltip" :content="props.text" :max-width="props.maxWidth" :placement="props.placement">
                <span :class="`${prefix}ellipsis-text`" ref="$text">{{state.computedtext}}</span>
                <span :class="`${prefix}ellipsis-more`" ref="more" v-show="state.beyond"><slot name="more">...</slot></span>
            </DcTooltip>
            <template v-else>
                <span :class="`${prefix}ellipsis-text`" ref="$text">{{state.computedtext}}</span>
                <span :class="`${prefix}ellipsis-more`" ref="more" v-show="state.beyond"><slot name="more">...</slot></span>
            </template>
        </template>
        <div v-else>
            <span :class="`${prefix}ellipsis-text`" ref="$text">{{props.text}}</span>
            <span :class="`${prefix}ellipsis-more`" ref="more" v-show="state.beyond"><slot name="more">...</slot></span>
        </div>
    </div>
</template>

<script setup>
    import { prefix } from "../../config";
    import { oneOf, getStyle } from "../../tools/index";
    import { ref, reactive, defineProps, onMounted, nextTick, useAttrs } from "vue";
    import DcTooltip from "../tooltip/tooltip.vue"
    const $text = ref(null);
    const $el = ref(null);
    const props = defineProps({
        text: String | Number,
        height: Number,
        length: Number,
        line: {
            type: Number,
            default: 1
        },
        maxWidth: String | Number,
        placement: {
            validator (value) {
                return oneOf(value, ['top', 'right', "bottom", "left"]);
            },
            default: 'bottom'
        },
        tooltip: {
            type: Boolean,
            default: true,
        }
    });
    const state = reactive({
        computedReady: false,
        computedtext: "",
        beyond: false,
        useTooltip: false
    })
    const computeText = () => {
        state.computedtext = props.text;
        if(props.length && props.length < props.text.length) {    // 根据长度判断
            state.beyond = true;
            state.computedtext = props.text.slice(0, props.length);
            state.computedReady = true;
            return;
        }
        let height = props.height || props.line * parseInt(getStyle($el.value, "lineHeight"));
        let n = 1000;
        let text = props.text;
        if($el.value.clientHeight > height) {
            state.beyond = true;
            nextTick(() => {
                while($el.value.clientHeight > height && n > 0) {
                    if($el.offsetHeight > height * 3) {
                        $text.value.innerText = text = text.slice(0, Math.floor(text.length / 2));
                    } else {
                        $text.value.innerText = text = text.slice(0, text.length - 1);
                    }
                    n--;
                }
            })
        }
        state.computedtext = text;
        state.computedReady = true;
    }
    onMounted(() => {
        computeText()
    })
</script>