<template>
    <div :class="`${prefix}breadcrumb`">
        <slot></slot>
    </div>
</template>

<script setup>
    import { prefix } from "../../config/index"
    import { defineProps, provide } from "vue";
    const props = defineProps({
        separator: {
            type: String,
            default: "/"
        }
    });
    provide("separator", props.separator);
</script>
