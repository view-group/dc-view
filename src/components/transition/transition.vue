<template>
    <transition
      :name="props.name"
      @before-enter="state.beforeEnterUse"
      @enter="state.enterUse"
      @after-enter="state.afterEnterUse"
      @before-leave="state.beforeLeaveUse"
      @leave="state.leaveUse"
      @after-leave="state.afterLeaveUse"
    >
      <slot></slot>
    </transition>
</template>

<script setup>
import { reactive, defineProps, getCurrentInstance } from "vue";
    const current = getCurrentInstance();
    current.name = "DcTransition"
    const props = defineProps({
        name: String,
        type: {
            type: String,
            default: "opacity"
        },
        time: {
            type: Number,
            default: 0.3
        },
        beforeEnter: Function,
        enter: Function,
        afterEnter: Function,
        beforeLeave: Function,
        leave: Function,
        afterLeave: Function
    })
    const state = reactive({
        beforeEnterUse: null,
        enterUse: null,
        afterEnterUse: null,
        beforeLeaveUse: null,
        leaveUse: null,
        afterLeaveUse: null
    })
    const beforeEnterInner = el => {
        if(props.type == "opacity") {
            el.style.transition = `${props.time}s opacity ease-in-out`;
        }
        if(props.type == "height") {
            // 给元素设置过渡效果
            el.style.transition = `${props.time}s height ease-in-out`;
            // 高度变化时，让其内容隐藏
            el.style.overflow = 'hidden';
        }
        if(props.type == "width") {
            el.style.transition = `${props.time}s width ease-in-out`;
            el.style.overflow = 'hidden';
        }
    }
    const enterInner = (el) =>  {
        if(props.type == "opacity") {
            el.style.opacity = 0;
            setTimeout(() => {
                el.style.opacity = 1;
            }, 0)
        }
        if(props.type == "height") {
            el.style.height = 'auto';
            // 保存元素原来的高度
            const endHeight = window.getComputedStyle(el).height;
            el.style.height = '0px';
            // 强制浏览器回流，否则浏览器会合并两次元素的高度更改（回流重绘的知识
            setTimeout(() => {
                el.style.height = endHeight;
            }, 0) 
        }
        if(props.type == "width") {
            el.style.width = 'auto';
            // 保存元素原来的高度
            const endWidth = window.getComputedStyle(el).width;
            el.style.width = '0px';
            // 强制浏览器回流，否则浏览器会合并两次元素的高度更改（回流重绘的知识
            setTimeout(() => {
                el.style.width = endWidth;
            }, 0) 
        }
    }
    const afterEnterInner = el => {
        if(props.type == "opacity") {
            el.style.transition = '';
        }
        if(props.type == "height") {
            // 收尾工作，展示完过渡效果之后，设为原来的值
            el.style.transition = '';
            el.style.overflow = 'visible';
        }
        if(props.type == "width") {
            el.style.transition = '';
            el.style.overflow = 'visible';
        }
    }
    const beforeLeaveInner = el => {
        if(props.type == "opacity") {
            el.style.transition = `${props.time}s opacity`;
        }
        if(props.type == "height") {
            // 给元素设置过渡效果
            el.style.transition = `${props.time}s height ease-in-out`;
            // 高度变化时，让其内容隐藏
            el.style.overflow = 'hidden';
        }
        if(props.type == "width") {
            el.style.transition = `${props.time}s width ease-in-out`;
            el.style.overflow = 'hidden';
        }
    }
    const leaveInner = el => {
        if(props.type == "opacity") {
            el.style.opacity = 0;
        }
        if(props.type == "height") {
            el.style.height = '0px';
        }
        if(props.type == "width") {
            el.style.width = '0px';
        }
    }
    const afterLeaveInner = el => {
        if(props.type == "opacity") {
            el.style.transition = '';
            el.style.opacity = 1;
        }
        if(props.type == "height") {
            // 收尾工作，展示完过渡效果之后，设为原来的值
            el.style.transition = '';
            el.style.overflow = 'visible';
        }
        if(props.type == "width") {
            el.style.transition = '';
            el.style.overflow = 'visible';
        }
    }
    state.beforeEnterUse = props.beforeEnter || beforeEnterInner;
    state.enterUse = props.enter || enterInner;
    state.afterEnterUse = props.afterEnter || afterEnterInner;
    state.beforeLeaveUse = props.beforeLeave || beforeLeaveInner;
    state.leaveUse = props.leave || leaveInner;
    state.afterLeaveUse = props.afterLeave || afterLeaveInner;
</script>
