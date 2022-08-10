<template>
    <div :class="`${prefix}date-picker`">
        <div ref="$reference" :class="`${prefix}date-picker-rel`" @click="showDrop" v-click-out="hiddenDrop">
            <dc-input @on-clear="clear" :clearable="props.clearable" v-model="state.inputValue" :placeholder="props.placeholder">
                <template #suffix>
                    <i :class="`iconfont icon-riqi${icon}`"></i>
                </template>
            </dc-input>
        </div>
        <teleport to="body" :disabled="!props.transfer">
            <DcTransiton>
                <div @click="stopPropagation" ref="$popper" v-show="state.isOpen" :class="`${prefix}date-picker-dropdown`">
                    <component :splitPanels="props.splitPanels" :dateValue="state.dateValue"  @changeDate="changeDate" :is="showComponent()"></component>
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
    import DateComponent from "./date.vue";
    import moment from "moment";
    moment.suppressDeprecationWarnings = true;
    import Range from "./range.vue";
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
            type: String,
            default: "date"
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
        transfer: Boolean,
        splitPanels: Boolean,
        format: {
            type: Array,
            default() {
                return ["YYYY-MM-DD", "YYYY-MM-DD"]
            }
        }
    })
    let popper;
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
    function showDrop() {
        state.isOpen = true;
        popper.update();
    }
    function hiddenDrop() {
        state.isOpen = false
    }
    function changeDate(date) {
        if(props.type == "date") {
            state.dateValue[0] = date;
            state.inputValue = moment(date).format(props.format[0]);
            date = moment(date).format(props.format[0]);
        }
        if(props.type == "daterange") {
            state.dateValue = date;
            date = sortDate(date);
            state.inputValue = date[0] + " - " + date[1]
        }
        emits("on-change", date);
        hiddenDrop();
    }
    function clear() {
        emits("on-clear", props.type == "daterange"? ["", ""]: "");
        emits("on-change", props.type == "daterange"? ["", ""]: "");
        state.dateValue = ["", ""]
        // state.dateValue[0] = "";
        // state.dateValue[1] = ""
        hiddenDrop();
    }
    function showComponent() {
        if(props.type == "date") return DateComponent;
        if(props.type == "daterange") return Range;
    }
    function sortDate(date) {
        if(new Date(date[0]).getTime() > new Date(date[1]).getTime()) {
            return [moment(date[1]).format(props.format[0]), moment(date[0]).format(props.format[1] || 'YYYY-MM-DD')]
        } else {
            return [moment(date[0]).format(props.format[0]), moment(date[1]).format(props.format[1] || 'YYYY-MM-DD')]
        }
    }
</script>
