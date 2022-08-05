<template>
    <div :class="`${prefix}date-picker`">
        <div ref="$reference" :class="`${prefix}date-picker-rel`" @click="state.isOpen = true" v-click-out="hiddenDrop">
            <dc-input @on-clear="clear" :clearable="props.clearable" v-model="state.inputValue" :placeholder="props.placeholder">
                <template #suffix>
                    <i :class="`iconfont icon-riqi${icon}`"></i>
                </template>
            </dc-input>
        </div>
        <teleport to="body" :disabled="!props.transfer">
            <DcTransiton>
                <div @click="stopPropagation" ref="$popper" v-show="state.isOpen" :class="`${prefix}date-picker-dropdown`">
                    <component :dateValue="state.dateValue"  @changeDate="changeDate" :is="showComponent"></component>
                </div>
            </DcTransiton>
        </teleport>
    </div>
</template>

<script setup>
    import {prefix, icon} from "../../config/index";
    import {ref, reactive, defineProps, defineEmits, onMounted, computed, nextTick} from "vue";
    import Popper from 'popper.js/dist/umd/popper.js';
    import DcInput from "../input/input.vue";
    import DcTransiton from "../transition/transition.vue";
    import Date from "./date.vue"
    const $popper = ref(null);
    const $reference = ref (null);
    const state = reactive({
        isOpen: false,
        dateValue: ["", ""],
        inputValue: ""
    })
    const emits = defineEmits(["on-change", "on-clear"])
    const props = defineProps({
        type: {
            type: String
        },
        clearable: Boolean,
        placeholder: {
            type: String,
            default: "请选择日期"
        },
        placement: {
            type: String,
            default: "bottom-start"
        },
        modelValue: {
            type: Array
        },
        transfer: Boolean
    })
    let popper, showComponent;
    onMounted(() => {
        popper = new Popper($reference.value, $popper.value, {
            placement: props.placement,
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
    })
    function changeDrop(){
        state.isOpen = !state.isOpen;
    }
    function stopPropagation(e) {
        e.stopPropagation()
    }
    function hiddenDrop() {
        state.isOpen = false
    }
    function changeDate(date) {
        state.dateValue[0] = date;
        state.inputValue = date;
        emits("on-change", date);
        hiddenDrop();
    }
    function clear() {
        emits("on-clear", "");
        state.dateValue[0] = "";
        hiddenDrop();
    }
    showComponent = Date;
</script>
