<template>
    <dc-date-picker type="daterange" style="width: 400px"  :split-panels="false"  @on-change="change" @on-clear="clear" clearable></dc-date-picker>
</template>

<script setup>
function change(time) {
    console.log(time)
}
function clear(time) {
    // console.log(time,1111)
}
</script>
