<template>
    <div class="wrapper">
        <dc-input 
        style="width: 200px"
            :disabled="false"
            v-model="state.name" 
            placeholder="请输入姓名"
            @on-enter="handleEnter"
            @on-focus="handleFocus"
            @on-blur="handleBlur"
            @on-change="handleChange"
            @on-clear="handleClear"
            clearable
        >
            <template #suffix>
                    <i :class="`iconfont icon-riqi-dc`"></i>
            </template>
        </dc-input>
        {{state.name}}
    </div>
</template>

<script setup>
    import { reactive } from "vue";
    const state = reactive({
        name: "123"
    })
    const handleEnter = () => {
        // console.log("按下了回车")
    }
    const handleFocus = () => {
        // console.log("聚焦")
    }
    const handleBlur = () => {
        // console.log("失去焦点")
    }
    const handleChange = () => {
        // console.log(state.name)
    }
    const handleClear = () => {
        // console.log("点击了清空按钮")
    }
</script>

<style lang="scss" scoped>
    .wrapper {

    }
</style>