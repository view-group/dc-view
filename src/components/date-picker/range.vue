<template>
    <div :class="`${prefix}date-picker-range`">
        <div :class="`${prefix}date-picker-range-content`">
            <div :class="`${prefix}date-picker-range-content-left`">
                <div :class="`${prefix}date-picker-range-header`">
                    <i @click="changeYear('left', 'prev')" :class="[`icon-zuoshuangjiantou${icon}`, 'iconfont']"></i>
                    <i @click="changeMonth('left', 'prev')" :class="[`icon-jiantouzuo${icon}-copy`, 'iconfont']"></i>
                    <span :class="`${prefix}date-time`">{{`${state.leftYear}年${state.leftMonth}月`}}</span>
                    <i v-if="props.splitPanels" @click="changeMonth('left', 'next')" :class="[`icon-jiantouyou${icon}`, 'iconfont']"></i>
                    <i v-if="props.splitPanels" @click="changeYear('left', 'next')" :class="[`icon-youshuangjiantou${icon}`, 'iconfont']"></i>
                </div>
                <div :class="`${prefix}date-picker-range-cells`">
                    <span :class="`${prefix}date-picker-range-cell`" v-for="item in state.week" :key="item">{{item}}</span>
                    <span 
                        @click="selectDate(item.date)"
                        :date="item.timeStamp"
                        @mouseenter="mouseover(item.date)"
                        :class="[
                            `${prefix}date-picker-range-cell`,
                            {
                                [`${prefix}date-picker-range-cell-current`]: item.flag == 'current',
                                [`${prefix}date-picker-range-cell-active`]: state.selectDate.includes(item.date),
                                [`${prefix}date-picker-range-cell-range`]: item.timeStamp && timeStampArr[0] <= item.timeStamp && timeStampArr[1] >= item.timeStamp,
                            }
                        ]" 
                        v-for="item in leftDays" :key="item.date">
                            <template v-if="item.flag == 'current'">
                                <em>{{item.value}}</em>
                            </template>
                            <template v-else>
                                {{item.value}}
                            </template>
                        </span>
                </div>
            </div>
            <div :class="`${prefix}date-picker-range-content-right`">
                <div :class="`${prefix}date-picker-range-header`">
                    <i v-if="props.splitPanels" @click="changeYear('right', 'prev')" :class="[`icon-zuoshuangjiantou${icon}`, 'iconfont']"></i>
                    <i v-if="props.splitPanels" @click="changeMonth('right', 'prev')" :class="[`icon-jiantouzuo${icon}-copy`, 'iconfont']"></i>
                    <span :class="`${prefix}date-time`">{{`${state.rightYear}年${state.rightMonth}月`}}</span>
                    <i @click="changeMonth('right', 'next')" :class="[`icon-jiantouyou${icon}`, 'iconfont']"></i>
                    <i @click="changeYear('right', 'next')" :class="[`icon-youshuangjiantou${icon}`, 'iconfont']"></i>
                </div>
                <div :class="`${prefix}date-picker-range-cells`">
                    <span :class="`${prefix}date-picker-range-cell`" v-for="item in state.week" :key="item">{{item}}</span>
                    <span 
                        @mouseenter="mouseover(item.date)"
                        @click="selectDate(item.date)"
                        :date="item.timeStamp"
                        :class="[
                            `${prefix}date-picker-range-cell`,
                            {
                                [`${prefix}date-picker-range-cell-current`]: item.flag == 'current',
                                [`${prefix}date-picker-range-cell-active`]: state.selectDate.includes(item.date),
                                [`${prefix}date-picker-range-cell-range`]: item.timeStamp && timeStampArr[0] <= item.timeStamp && timeStampArr[1] >= item.timeStamp,
                            }
                        ]" 
                        v-for="item in rightDays" :key="item.date">
                            <template v-if="item.flag == 'current'">
                                <em>{{item.value}}</em>
                            </template>
                            <template v-else>
                                {{item.value}}
                            </template>
                        </span>
                </div>
            </div>
        </div>
        <div :class="`${prefix}-date-picker-range-bottom`">

        </div>
    </div>
</template>

<script setup>
    import {prefix, icon} from "../../config/index";
    import { reactive, computed, defineProps, defineEmits, watch, toRef } from "vue";
    const state = reactive({
        leftYear: 2022,
        leftMonth: 8,
        rightYear: 2022,
        rightMonth: 9,
        week: ["日", "一", "二", "三", "四", "五", "六"],
        leftDays: [],
        rightDays: [],
        selectDate: ["", "占位置"],
        firstClick: true,
        timeStamp: "",
        startTimeStamp: "",
    })
    const props = defineProps({
        splitPanels: Boolean,
        dateValue: Array
    })
    const emits = defineEmits(["changeDate"])
    watch(() => props.dateValue, (nval) => {
        state.selectDate = props.dateValue;
        if(!nval[0]) {
            state.startTimeStamp = "";
            state.timeStamp = ""
        }
    })
    const leftDays = computed(() => {
        let weekday = new Date(`${state.leftYear}-${state.leftMonth}-1`).getDay();  // 当前月的第一天是周几
        let days = new Date(state.leftYear, state.leftMonth, 0).getDate() // 当月一共多少天
        let lastMonthDays = new Date(state.leftYear, state.leftMonth > 1? state.leftMonth - 1: 12, 0).getDate() // 上个月有多少天
        // console.log(weekday, days, lastMonthDays)
        let arr = [];
        for(let i = 0; i < days; i++) {
            arr[i] = {
                date: `${state.leftYear}-${state.leftMonth}-${i + 1}`,
                timeStamp: new Date(`${state.leftYear}-${state.leftMonth}-${i + 1}`).getTime(),
                value: i + 1,
                flag: "current"    // 当前月
            }
        }
        if(weekday) {   // 当月第一天不是周天
            for(let i = 0; i < weekday; i++) {
                arr.unshift({
                    date: `${state.leftYear}-${state.leftMonth == 1? 12: state.leftMonth - 1}-${lastMonthDays - i}`,
                    value: lastMonthDays - i,
                    flag: "prev"  // 上个月
                })
            }
        }
        if(arr.length < 42) {
            let k = 1;
            for(let i = arr.length; i < 42; i++) {
                arr.push({
                    date: `${state.leftYear}-${state.leftMonth == 12? 1: state.leftMonth + 1}-${k}`,
                    value: k,
                    flag: "next" // 下个月
                })
                k++;
            }
        }
        return arr
    })
    const rightDays = computed(() => {
        let weekday = new Date(`${state.rightYear}-${state.rightMonth}-1`).getDay();  // 当前月的第一天是周几
        let days = new Date(state.rightYear, state.rightMonth, 0).getDate() // 当月一共多少天
        let lastMonthDays = new Date(state.rightYear, state.rightMonth > 1? state.rightMonth - 1: 12, 0).getDate() // 上个月有多少天
        // console.log(weekday, days, lastMonthDays)
        let arr = [];
        for(let i = 0; i < days; i++) {
            arr[i] = {
                date: `${state.rightYear}-${state.rightMonth}-${i + 1}`,
                timeStamp: new Date(`${state.rightYear}-${state.rightMonth}-${i + 1}`).getTime(),
                value: i + 1,
                flag: "current"    // 当前月
            }
        }
        if(weekday) {   // 当月第一天不是周天
            for(let i = 0; i < weekday; i++) {
                arr.unshift({
                    date: `${state.rightYear}-${state.rightMonth == 1? 12: state.rightMonth - 1}-${lastMonthDays - i}`,
                    value: lastMonthDays - i,
                    flag: "prev"  // 上个月
                })
            }
        }
        if(arr.length < 42) {
            let k = 1;
            for(let i = arr.length; i < 42; i++) {
                arr.push({
                    date: `${state.rightYear}-${state.rightMonth == 12? 1: state.rightMonth + 1}-${k}`,
                    value: k,
                    flag: "next" // 下个月
                })
                k++;
            }
        }
        return arr
    })
    const timeStampArr = computed(() => {
        return [state.startTimeStamp, state.timeStamp].sort((A, B) => A - B)
    })
    function selectDate(date, flag) {
        if(state.firstClick) {
            // console.log("1")
            state.selectDate[0] = date;
            state.selectDate[1] = "";
            state.startTimeStamp = new Date(date).getTime();
            state.timeStamp = undefined;
        } else {
            // console.log("2")
            state.selectDate[1] = date;
            emits("changeDate", state.selectDate)
        }
        state.firstClick = !state.firstClick;
    }
    function mouseover(date, flag) {
        if(state.firstClick) return;
        // console.log(date)
        state.timeStamp = new Date(date).getTime();
        // console.log(timeStampArr.value)
    }
    function changeYear(location, action) {
        if(location == "left") {
            if(action == "prev") {
                state.leftYear--;
                // TODO   联动
                props.splitPanels || state.rightYear--
            } else {
                leftNextYear();
            }
        } else {
            if(action == "prev") {
                rightPrevYear();
            } else {
                state.rightYear++;
                // TODO 联动
                props.splitPanels || state.leftYear++
            }
        }
    }
    function leftNextYear() {
        if(!props.splitPanels) {  // 联动

        } else {
            state.leftYear++;
            if(state.leftYear >= state.rightYear) {
                state.rightYear++;
            }
        }
    }
    function rightPrevYear() {
        if(!props.splitPanels) {  // 联动

        } else {
            state.rightYear--;
            if(state.leftYear >= state.rightYear) {
                state.leftYear--;
            }
        }
    }
    function changeMonth(location, action) {
        if(location == "left") {
            if(action == "prev") {
                leftPrevMonth();
            } else {
                leftNextMonth();
            }
        } else {
            if(action == "prev") {
                rightPrevMonth();
            } else {
                rightNextMonth();
            }
        }
    }
    function leftPrevMonth() {
        if(state.leftMonth == 1) {
            state.leftMonth = 12;
            state.leftYear--;
        } else {
            state.leftMonth--
        }
        if(!props.splitPanels) {    // 联动
            if(state.rightMonth == 1) {
                state.rightMonth = 12;
                state.rightYear--;
            } else {
                state.rightMonth--
            }
        }
    }
    function leftNextMonth() {
        if(!props.splitPanels) {  // 联动

        } else {
            if(state.leftMonth == 12) {
                state.leftMonth = 1;
                state.leftYear++;
                if(state.rightYear == state.leftYear && state.rightMonth == 1) {
                    state.rightMonth++
                }
            } else {
                state.leftMonth++;
                if(state.rightYear == state.leftYear && state.rightMonth == state.leftMonth) {
                    if(state.rightMonth == 12) {
                        state.rightMonth = 1;
                        state.rightYear++;
                    } else {
                        state.rightMonth++;
                    }
                    
                }
            }
        }
    }
    function rightPrevMonth() {
        if(!props.splitPanels) {  // 联动

        } else {
            if(state.rightMonth == 1) {
                state.rightMonth = 12;
                state.rightYear--;
                if(state.rightYear == state.leftYear && state.leftMonth == 12) {
                    state.leftMonth--;
                }
            }else {
                state.rightMonth--;
                if(state.rightYear == state.leftYear && state.rightMonth == state.leftMonth) {
                    if(state.leftMonth == 1) {
                        state.leftYear--;
                        state.leftMonth = 12;
                    } else {
                        state.leftMonth--;
                    }
                }
            }
        }
    }
    function rightNextMonth() {
        if(state.rightMonth == 12) {
            state.rightMonth = 1;
            state.rightYear++;
        } else {
            state.rightMonth++;
        }
        if(!props.splitPanels) {  // 联动
            if(state.leftMonth == 12) {
                state.leftMonth = 1;
                state.leftYear++;
            } else {
                state.leftMonth++
            }
        }
    }
</script>
