<template>
    <div :class="`${prefix}date-picker`">
        <div ref="$reference" :class="`${prefix}date-picker-rel`"></div>
        <teleport to="body" :disabled="false">
            <DcTransiton>
                <div @click="stopPropagation" ref="$popper" v-show="state.isOpen" :class="`${prefix}date-picker-dropdown`" :style="dropdownStyle">
                    
                </div>
            </DcTransiton>
        </teleport>
    </div>
</template>

<script setup>
import {prefix} from "../../config/index";
import {ref, defineProps, defineEmits, onMounted} from "vue"
const $popper = ref(null);
const $reference = ref (null);
const 
</script>
