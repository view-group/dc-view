<template>
    <div :class="`${prefix}input-wrapper`">
        <input
            :disabled="props.disabled"
            :class="[`${prefix}input`, { [`${prefix}input-with-suffix`]: slots.suffix }]"
            ref="$input"
            :type="props.type"
            :placeholder="props.placeholder"
            @input="handleInput"
            @keyup.enter="() => emit('on-enter')"
            @focus="() => emit('on-focus')"
            @blur="() => emit('on-blur')"
        />
        <span @click="handleClear" v-if="props.clearable && !props.disabled" v-show="props.modelValue" :class="`${prefix}input-icon-clear iconfont icon-remove${icon}`"></span>
        <span v-if="slots.suffix" :class="`${prefix}input-suffix`" :style="!props.clearable || !props.modelValue? `display: initial`: ``">
            <slot name="suffix"></slot>
        </span>
    </div>
</template>

<script setup>
    import { prefix, icon } from "../../config";
    import { oneOf } from "../../tools/index";
    import { defineProps, reactive, ref, onMounted, defineEmits, useSlots, watch } from "vue";
    const props = defineProps({
        type: {
            type: String,
            validator(value) {
                return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'number', 'tel']);
            },
            default: "text"
        },
        modelValue: {
            default: ""
        },
        placeholder: String,
        clearable: Boolean,
        disabled: Boolean
    })
    const emit = defineEmits(["update:modelValue", "on-change", "on-blur", "on-focus", "on-clear", "on-enter"])
    const slots = useSlots();
    console.dir(slots.suffix)
    const $input = ref(null);
    const handleInput = e => {
        let value = e.target.value;
        emit('update:modelValue', value);
        emit('on-change', e);
    }
    const handleClear = (e) => {
        e.stopPropagation();
        emit('update:modelValue', '');
        $input.value.value = "";
        emit('on-clear');
    }
    watch(() => props.modelValue, () => {
        $input.value.value = props.modelValue;
    })
    onMounted(() => {
        $input.value.value = props.modelValue;
    })
</script>