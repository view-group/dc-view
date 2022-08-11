<template>
    <span :class="`${prefix}breadcrumb-item`">
        <span :class="`${prefix}breadcrumb-item-text`" @click="props.to && router.push(props.to)">
            <slot></slot>
        </span>
        <span :class="`${prefix}breadcrumb-item-separator`">{{separator}}</span>
    </span>
</template>

<script setup>
    import {prefix} from "../../config/index";
    import { inject, defineProps } from "vue";
    import { useRouter } from "vue-router";
    const router = useRouter();
    const separator = inject("separator");
    const props = defineProps({
        to: String
    })
</script>