<template>
    <div ref="$option" v-show="isShow || !selectProps.filterable" :class="{[`${prefix}select-option`]: true, [`${prefix}select-option-active`]: props.value === selectValue}" @click="handleOption">
        <slot>{{props.label || props.value}}</slot>
    </div>
</template>

<script setup>
    import { prefix } from "../../config";
    import { ref, defineProps, inject, computed, nextTick, useSlots, onMounted } from "vue";
    const props = defineProps({
        value: {
            type: [String, Number],
            required: true
        },
        label: [String, Number],
    })
    const $option = ref(null);
    const slots = useSlots();
    const isShow = computed(() => {
        // console.log(filterLabel.value)
        if(slots.default && $option.value) {
            return $option.value.textContent.includes(filterLabel.value)
        }
        if(props.label) {
            return props.label.includes(filterLabel.value)
        }
    })
    function handleOption() {
        let label;
        if(slots.default && $option.value) {
            label =  $option.value.textContent
        }
        selectOption(props.value, label || props.label || props.value)
    }
    function getOptionDetail() {
        let optionDetail = {
            value: props.value,
            label: slots.default && $option.value.textContent || props.label || props.value
        };
        setOptionList(optionDetail);
    }
    onMounted(() => {
        getOptionDetail();
    });
    const selectOption = inject("selectOption");
    const filterLabel = inject("filterLabel");
    const selectValue = inject("selectValue");
    const setOptionList = inject("setOptionList");
    const selectProps = inject("selectProps")
    console.log(selectProps.filterable)
    

</script>
