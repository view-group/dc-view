<template>
    <div :class="`${prefix}date-picker-date`">
        <div :class="`${prefix}date-picker-date-header`">
            <i @click="state.year--" :class="[`icon-zuoshuangjiantou${icon}`, 'iconfont']"></i>
            <i @click="prevMonth" :class="[`icon-jiantouzuo${icon}-copy`, 'iconfont']"></i>
            <span :class="`${prefix}date-time`">{{`${state.year}年${state.month}月`}}</span>
            <i @click="nextMonth" :class="[`icon-jiantouyou${icon}`, 'iconfont']"></i>
            <i @click="state.year++" :class="[`icon-youshuangjiantou${icon}`, 'iconfont']"></i>
        </div>
        <div :class="`${prefix}date-picker-date-content`">
            <div :class="`${prefix}date-picker-date-content-week`">
                <span :class="`${prefix}date-picker-cell`" v-for="item in state.week" :key="item">{{item}}</span>
            </div>
            <div :class="`${prefix}date-picker-date-content-day`">
                <span :date="item.date" 
                @click="emits('changeDate', item.date)"
                :class="[
                    `${prefix}date-picker-cell`, 
                    {
                        [`${prefix}date-picker-cell-active`]: item.date == props.dateValue[0],
                        [`${prefix}date-picker-cell-prev`]: item.flag == 'prev',
                        [`${prefix}date-picker-cell-current`]: item.flag == 'current',
                        [`${prefix}date-picker-cell-next`]: item.flag == 'next'
                    }
                ]" v-for="item in day" :key="item">
                    <template v-if="item.flag == 'current'">
                        <em>{{item.value}}</em>
                    </template>
                    <template v-else>
                        {{item.value}}
                    </template>
                </span>
            </div>
        </div>
        <div :class="`${prefix}date-picker-date-bottom`"></div>
    </div>

</template>

<script setup>
    import { prefix, icon } from "../../config/index";
    import { reactive, computed, defineEmits, defineProps, watch } from "vue";
    const state = reactive({
        year: "",
        month: "",
        week: ["日", "一", "二", "三", "四", "五", "六"]
    })
    const props = defineProps({
        dateValue: Array
    })
    function prevMonth() {
        if(state.month == 1) {
            state.year--;
            state.month = 12;
        } else {
            state.month--
        }
    }
    function nextMonth() {
        if(state.month == 12) {
            state.year++;
            state.month = 1;
        } else {
            state.month++
        }
    }
    watch(() => props.dateValue[0], () => {
        const date = props.dateValue[0]? new Date(props.dateValue[0]): new Date();
        state.year = date.getFullYear();
        state.month = date.getMonth() + 1;
    })
    const emits =  defineEmits(["changeDate"])
    const date = new Date();
    state.year = date.getFullYear();
    state.month = date.getMonth() + 1;
    const day = computed(() => {
        let weekday = new Date(`${state.year}-${state.month}-1`).getDay();  // 当前月的第一天是周几
        let days = new Date(state.year, state.month, 0).getDate() // 当月一共多少天
        let lastMonthDays = new Date(state.year, state.month > 1? state.month - 1: 12, 0).getDate() // 上个月有多少天
        let arr = [];
        for(let i = 0; i < days; i++) {
            arr[i] = {
                date: `${state.year}-${state.month}-${i + 1}`,
                value: i + 1,
                flag: "current"    // 当前月
            }
        }
        if(weekday) {   // 当月第一天不是周天
            for(let i = 0; i < weekday; i++) {
                arr.unshift({
                    date: `${state.year}-${state.month == 1? 12: state.month - 1}-${lastMonthDays - i}`,
                    value: lastMonthDays - i,
                    flag: "prev"  // 上个月
                })
            }
        }
        if(arr.length < 42) {
            let k = 1;
            for(let i = arr.length; i < 42; i++) {
                arr.push({
                    date: `${state.year}-${state.month == 12? 1: state.month + 1}-${k}`,
                    value: k,
                    flag: "next" // 下个月
                })
                k++;
            }
        }
        return arr
    })
    // console.log(day.value)
</script>
