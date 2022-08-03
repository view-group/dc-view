<template>
    <div class="wrapper" >
        <dc-select v-model="value" placeholder="请选择啊啊啊" clearable filterable >
            <dc-option value="1" label="一">插槽</dc-option>
            <dc-option value="2" label="二"></dc-option>
            <dc-option value="3" label="三"></dc-option>
            <dc-option value="4" label="四"></dc-option>
            <dc-option value="5" label="五"></dc-option>
        </dc-select>
        {{value}}
        <!-- <div style="height: 1000px"></div> -->
    </div>
</template>

<script setup>
    import { ref, inject } from "vue";
    const value = ref("1")
</script>

<style lang="scss" scoped>
    .wrapper {
        height: 200px;
        overflow: auto;
    }
</style>