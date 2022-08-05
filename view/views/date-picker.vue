<template>
    <dc-date-picker @on-change="change" clearable></dc-date-picker>
</template>

<script setup>
function change(time) {
    // console.log(time)
}
function clear(time) {
    console.log(time)
}
</script>
