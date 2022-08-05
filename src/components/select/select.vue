<template>
    <div :class="[`${prefix}select`, { [`${prefix}select-clearable`]: props.clearable && props.modelValue }]" v-click-out="hiddenDrop">
        <div ref="$reference" :class="[`${prefix}select-selection`, { [`${prefix}select-visible`]: state.isOpen }]" @click="changeDrop">
            <template v-if="props.multiple">
                <template v-if="props.filterable">多选搜索</template>
                <template v-else>多选不能搜索</template>
            </template>
            <template v-else>
                <template v-if="props.filterable">
                    <!-- 单选能搜索 -->
                    <input v-model="state.filterLabel" :placeholder="props.modelValue? '': props.placeholder" type="text" ref="$input" :class="`${prefix}select-selected-value-input`">
                </template>
                <template v-else>
                    <!-- 单选不能搜索 -->
                    <span v-show="props.modelValue" :class="`${prefix}select-selected-value`">{{label}}</span>
                    <span v-show="!props.modelValue" :class="`${prefix}select-placeholder`">{{props.placeholder}}</span>
                </template>
            </template>
            <!-- <span v-show="props.modelValue" v-if="!props.filterable" :class="`${prefix}select-selected-value`">{{label}}</span>
            <input v-show="state.isFilter || !props.modelValue" :disabled="!props.filterable" v-model="state.filterLabel" :placeholder="props.modelValue? '': props.placeholder" :class="`${prefix}select-selected-value-input`" v-if="props.filterable" ref="$input"> -->
            <!-- <span v-show="props.modelValue" v-if="!props.filterable" :class="`${prefix}select-selected-value`">{{label}}</span>
            <span v-show="!props.modelValue" v-if="!props.filterable" :class="`${prefix}select-placeholder`">{{props.placeholder || "请选择..."}}</span>
            <input :disabled="!props.filterable" v-model="state.filterLabel" :placeholder="props.modelValue? '': props.placeholder" :class="`${prefix}select-selected-value-input`" v-if="props.filterable" ref="$input"> -->
            <i :class="[`${prefix}select-arrow`, state.isOpen? `icon-arrow-up${icon}`: `icon-arrow-down${icon}`, 'iconfont']"></i>
            <i v-if="props.clearable" @click.stop="clear" :class="[`${prefix}select-clear`, `icon-remove${icon}`, 'iconfont']"></i>
        </div>
        <teleport to="body" :disabled="false">
            <DcTransiton>
                <div @click="stopPropagation" ref="$popper" v-show="state.isOpen" :class="`${prefix}select-dropdown`" :style="dropdownStyle">
                    <div v-if="props.loading" :class="`${prefix}select-loading`">
                        加载中
                    </div>
                    <slot v-else>
                        <div :class="`${prefix}select-nodata`">
                            暂无数据
                        </div>
                    </slot>
                    <div v-if="props.filterable" v-show="!state.optionList.find(item => item.label.includes(state.filterLabel))" :class="`${prefix}select-nodata`">
                            暂无数据
                    </div>
                </div>
            </DcTransiton>
        </teleport>
    </div>
</template>

<script setup>
    import { prefix, icon } from "../../config";
    import { oneOf, getStyle } from "../../tools/index";
    import Popper from 'popper.js/dist/umd/popper.js';
    import { reactive, defineProps, ref, onMounted, nextTick, computed, defineEmits, provide, watch } from "vue";
    import DcTransiton from "../transition/transition.vue";
    const props = defineProps({
        placeholder: {
            type: String,
            default: "请选择..."
        },
        loading: Boolean,
        eventsEnabled: Boolean,
        clearable: Boolean,
        filterable: Boolean,
        multiple: Boolean,
        modelValue: {
            type: [Number, String, Array],
            required: true
        }
    })
    const emits = defineEmits(["update:modelValue"])
    const state = reactive({
        isOpen: false,
        dropdownWidth: "",
        filterLabel: "",
        isFilter: false,
        optionList: []
    })
    const $input = ref(null)
    const $popper = ref(null);
    const $reference = ref (null);
    const dropdownStyle = computed(() => {
        return `min-width: ${state.dropdownWidth}`
    })
    const label = computed(() => {
        return state.optionList.find(item => item.value == props.modelValue)?.label
    })
    let popper;
    onMounted(() => {
        popper = new Popper($reference.value, $popper.value, {
            placement: "bottom",
            eventsEnabled: props.eventsEnabled,
            modifiers: {
                computeStyle:{
                    gpuAcceleration: false
                },
                preventOverflow :{
                    boundariesElement: "window",
                    enabled: true
                }
            },
        })
        state.filterLabel = state.optionList.find(item => item.value == props.modelValue)?.label;
    })
    function changeDrop(){
        state.isOpen = !state.isOpen;
        state.isFilter = true;
        nextTick(() => {
            $input.value?.focus();
        })
        if(state.isOpen) {
            state.dropdownWidth = getStyle($reference.value, "width");
            popper.update();
        }
    }
    function showDrop() {
        state.isOpen = true;
        state.dropdownWidth = getStyle($reference.value, "width");
        popper.update();
    }
    function hiddenDrop() {
        state.isOpen = false;
        state.isFilter = false;
        props.filterable && (state.filterLabel = state.optionList.find(item => item.value == props.modelValue)?.label || ""); // youwenti
    }
    function stopPropagation(e) {
        props.multiple && e.stopPropagation()
    }
    function selectOption(value, label) {
        console.log(value,label)
        setTimeout(() => {
            props.filterable && (state.filterLabel =  label);
        }, 0);
        emits("update:modelValue", value);
    }
    function clear() {
        $input.value?.focus();
        state.isOpen = false;
        state.filterLabel = "";
        emits('update:modelValue', '');
    }
    function setOptionList(item) {
        state.optionList.push(item)
    };
    provide("selectOption", selectOption);
    provide("filterLabel", computed(() => state.filterLabel));
    provide("selectValue", computed(() => props.modelValue));
    provide("setOptionList", setOptionList);
    provide("multiple", props.multiple);
    provide("selectProps", props);
</script>