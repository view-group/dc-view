<template>
<!-- :class="{ 'dc-menu-item-active': props.index === activeIndex, 'dc-menu-item-fold': fold, 'parent-sub-menu': parent == 'DcSubMenu'}" -->
    <div @click="changeIndex(props.index)"
        :class="[
            `${prefix}menu-item`,
            {
                [`${prefix}menu-item-active`]: props.index === activeIndex,
                [`${prefix}menu-item-fold`]: fold,
                'parent-sub-menu': parent == 'DcSubMenu'
            }
        ]"
    >
        <template v-if="fold && parent == 'DcMenu'">
            <dc-tooltip :disabled="false" placement="right" content="789">
                <div class="dc-menu-item-icon">
                    <slot name="icon"></slot>
                </div>
                <template #content>
                    <slot></slot>
                </template>
            </dc-tooltip>
        </template>
        <template v-else-if="fold && parent == 'DcSubMenu'">
            <slot></slot>
        </template>
        <template v-else>
            <slot name="icon"></slot>
            <slot></slot>
        </template>
    </div>
</template>

<script setup>
    import { prefix } from "../../config";
    import { ref, reactive, getCurrentInstance, inject, defineProps } from "vue";
    import DcTooltip from "../tooltip/tooltip.vue";
    const current = getCurrentInstance();
    const props = defineProps({
        index: {
            type: String,
            required: true
        }
    })
    const activeIndex = inject("activeIndex");
    const fold = inject("fold");
    const changeIndex = inject("changeIndex");
    const parent = ref("");
    const getParent = component => {
        if(component.name == "DcMenu" || component.name == "DcSubMenu") {
            return component.name;
        } else {
            return getParent(component.parent);
        }
    }
    parent.value = getParent(current);
</script>