<template>
    <div :class="[`${prefix}menu`, { [`${prefix}menu-fold`]: fold }]">
        <slot></slot>
    </div>
</template>

<script setup>
    import { prefix } from "../../config";
    import { ref, reactive, getCurrentInstance, provide, defineProps, toRefs, defineEmits } from "vue";
    const current = getCurrentInstance();
    const props = defineProps({
        activeIndex: {
            type: String,
            required: true
        },
        fold: {
            type: Boolean,
            default: false
        },
        openIndex: {
            type: Array,
            default() {
                return []
            }
        }
    });
    const emits = defineEmits(["changeIndex"]);
    const { activeIndex, openIndex, fold } = toRefs(props);
    const changeIndex = index => emits("changeIndex", index);
    const openIndexs = ref(openIndex.value);
    provide("changeIndex", changeIndex);
    provide("activeIndex", activeIndex);
    provide("openIndex", openIndexs);
    provide("fold", fold);
    current.name = "DcMenu";
</script>