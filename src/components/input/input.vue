<template>
    <div :class="`${prefix}input-wrapper`">
        <input
            :class="`${prefix}input`"
            ref="$input"
            :type="props.type"
            :placeholder="props.placeholder"
            @input="handleInput"
            @keyup.enter="() => emit('on-enter')"
            @focus="() => emit('on-focus')"
            @blur="() => emit('on-blur')"
        />
        <span @click="handleClear" v-if="props.clearable" v-show="props.modelValue" :class="`${prefix}input-icon-clear iconfont icon-remove${icon}`"></span>
    </div>
</template>

<script setup>
    import { prefix, icon } from "../../config";
    import { oneOf } from "../../tools/index";
    import { defineProps, reactive, ref, onMounted, defineEmits } from "vue";
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
        clearable: Boolean
    })
    const emit = defineEmits(["update:modelValue", "on-change", "on-blur", "on-focus", "on-clear", "on-enter"])
    const state = reactive({

    })
    const $input = ref(null);
    const handleInput = e => {
        let value = e.target.value;
        emit('update:modelValue', value);
        emit('on-change', e);
    }
    const handleClear = () => {
        emit('update:modelValue', '');
        $input.value.value = "";
        emit('on-clear');
    }
    onMounted(() => {
        $input.value.value = props.modelValue
    })
</script>