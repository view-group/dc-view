<template>
    <form :autocomplete="autocomplete" :class="[`${prefix}form`, { [`${prefix}form-inline`]: props.inline }]">
        <slot></slot>
    </form>
</template>

<script setup>
    import { prefix } from "../../config";
    import { oneOf } from "../../tools/index";
    import { defineProps, provide, getCurrentInstance, ref, defineExpose, warn } from "vue";
    const props = defineProps({
        autocomplete: {
            validator(value) {
                return oneOf(value, ['on', 'off']);
            },
            default: 'off'
        },
        labelWidth: Number,
        model: Object,
        rules: Object,
        inline: Boolean
    });
    const fields = ref({});
    const current = getCurrentInstance();
    const addField = item => {
        fields.value = Object.assign({}, fields.value, item);
    };
    provide("formProps", props);
    provide("addField", addField);
    const validate = (callback) => {
        return new Promise(resolve => {
            let valid = true;
            // fields 为空需要返回promise
            // if (JSON.stringify(fields.value) === "{}") {
            //     resolve(valid);
            //     if (typeof callback === 'function') {
            //         callback(valid);
            //     }
            //     return;
            // }
            for(let key in fields.value) {
                fields.value[key].validate("", error => {
                    if (error) {
                        valid = false;
                    }
                })
            }
            resolve(valid);
            if (typeof callback === 'function') {
                callback(valid);
            }
        });
    }
    const validateField = (prop, callback) => {
        if(!fields.value[prop] ) throw new Error(`prop"${prop}"not found at validateField`);
        return new Promise(resolve => {
            let valid = true;
            fields.value[prop].validate("", error => {
                if (error) {
                    valid = false;
                }
            })
            resolve(valid);
            if (typeof callback === 'function') {
                callback(valid);
            }
        })
    }
    const resetFields = () => {
        for(let key in fields.value) {
            fields.value[key].resetField();
        }
    }
    defineExpose({ validateField, validate, resetFields });
</script>
