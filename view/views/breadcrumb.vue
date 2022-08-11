<template>
    <div class="wrapper">
        <dc-breadcrumb separator="=>">
            <dc-breadcrumb-item to="/input">111</dc-breadcrumb-item>
            <dc-breadcrumb-item>没路径</dc-breadcrumb-item>
            <dc-breadcrumb-item to="/breadcrumb?a=11">当前路由</dc-breadcrumb-item>
        </dc-breadcrumb>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .wrapper {
        
    }
</style>