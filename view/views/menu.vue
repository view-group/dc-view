<template>
    <dc-menu :activeIndex="state.activeIndex" @changeIndex="value => state.activeIndex = value" :fold="state.fold">
        <template v-for="item in state.menuList" :key="item.title">
            <dc-sub-menu v-if="item.children" :index="item.title" >
                <template #icon>
                    <div>{{item.icon}}</div>
                </template>
                <template #title>
                    <div>{{item.title}}</div>
                </template>
                <dc-menu-item v-for="item2 in item.children" :key="item2.title" :index="item2.title">
                    <template #icon>
                        <div>{{item2.icon}}</div>
                    </template>
                    <div>{{item2.title}}</div>
                </dc-menu-item>
            </dc-sub-menu>
            <dc-menu-item v-else :index="item.title">
                <template #icon>
                    <div>{{item.icon}}</div>
                </template>
                <div>{{item.title}}</div>
            </dc-menu-item>
        </template>
    </dc-menu>
    <button @click="state.fold = !state.fold">按钮</button>
</template>

<script setup>
import { reactive } from "vue";
const state = reactive({
    form: {},
    rules: {
        name: [
            { required: true, message: "请输入姓名", trigger: "blur"},
        ],
        age: [
            {
                required: true,
                message: "请输入性别",
                trigger: "blur"
            }
        ]
    },
    menuList: [
        {
            title: "菜单1",
            icon: "图标"
        },
        {
            title: "菜单2",
            icon: "图标"
        },
        {
            title: "菜单3",
            icon: "图标"
        },
        {
            title: "菜单4",
            icon: "图标",
            children: [
                {
                    title: "菜单4-1",
                    icon: "图标"
                },
                {
                    title: "菜单4-2",
                    icon: "图标"
                },
                {
                    title: "菜单4-3",
                    icon: "图标"
                }
            ]
        }
    ],
    inline: false,
    activeIndex: "",
    fold: false
})
</script>