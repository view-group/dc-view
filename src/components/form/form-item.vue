<template>
    <div
        :class="[
            `${prefix}form-item`,
            {
                [`${prefix}form-item-label-width`]: props.labelWidth || formProps.labelWidth,
                [`${prefix}form-item-required`]: state.required,
                [`${prefix}form-item-error`]: state.message
            }
        ]"
    >
        <label :class="`${prefix}form-item-label`" v-if="props.label || slots.label" :style="`width: ${props.labelWidth || formProps.labelWidth}px`">
            <slot name="label">{{props.label}}</slot>
        </label>
        <div :class="`${prefix}form-item-content`" ref="contentDom">
            <slot></slot>
            <DcTransition>
                <div v-if="state.message" :class="`${prefix}form-item-error-tip`">{{state.message}}</div>
            </DcTransition>
        </div>
    </div>
</template>

<script setup>
    import { prefix } from "../../config";
    import AsyncValidator from 'async-validator';
    import { defineProps, getCurrentInstance, inject, reactive, ref, onMounted, watch } from "vue";
    import DcTransition from "../transition/transition.vue"
    import { oneOf } from "../../tools/index";
    const current = getCurrentInstance();
    const props = defineProps({
        label: String,
        required: Boolean,
        labelWidth: Number,
        prop: String
    })
    const formProps = inject("formProps");
    const addField = inject("addField");
    const state = reactive({
        required: false,
        message: "",
        showTip: false
    })
    const contentDom = ref();
    const judgeRequired = () => {
        let required = formProps.rules[props.prop]?.find(item => item.required);
        state.required = required || props.required;
    }
    const bindEvent = dom => {
        Array.from(dom.children).forEach(item => {
            if(["INPUT"].includes(item.tagName)) {
                item.addEventListener("blur", verifyBlur);
                return;
            }
            item.children.length && bindEvent(item);
        })
    }
    onMounted(() => {
        judgeRequired();
        bindEvent(contentDom.value);
        watch(() => formProps.model[props.prop], verfiyChange);
        let obj = {};
        obj[props.prop] = { validate, resetField }
        addField(obj);
    })
    const verifyBlur = () => {
        validate("blur")
    };
    const verfiyChange = () => {
        validate("change")
    }
    const validate = (trigger, callback = function () {}) => {
        let rule = getFilteredRule(trigger);
        if(!rule || rule.length == 0) return;
        let descriptor = {};
        descriptor[props.prop] = rule;
        const validator = new AsyncValidator(descriptor);
        let model = {};
        model[props.prop] = formProps.model[props.prop];
        validator.validate(model, { firstFields: true }, errors => {
            state.message = errors?errors[0].message: "";
            callback(state.message);
        });
    }
    const resetField = () => {
        formProps.model[props.prop] = "";
        state.message = "";
    }
    const getFilteredRule = (trigger) => {
        let rules = formProps.rules[props.prop];
        return rules?.filter(rule => !trigger || !rule.trigger || rule.trigger == trigger)
    }
</script>