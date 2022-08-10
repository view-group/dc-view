<template>
    <dc-date-picker placement="top-start" transfer clearable @on-change="changeDate"></dc-date-picker>
    <button type="submit" class="mr-10" @click="validate">验证</button>
    <button type="submit" class="mr-10" @click="validateField">验证姓名</button>
    <button type="submit" class="mr-10" @click="resetFields">重置</button>
    <button type="submit" @click="state.inline = !state.inline">切换</button>
    <dc-form class="mt-20" ref="form" :inline="state.inline" :label-width="70" :model="state.form" :rules="state.rules" :required="true">
        <dc-form-item label="姓名" prop="name" :required="false">
            <dc-input clearable placeholder="请输入姓名" type="text" v-model="state.form.name" />
        </dc-form-item>
        <dc-form-item label="年龄" required prop="age">
            <dc-input placeholder="请输入年龄" type="text" v-model="state.form.age" />
        </dc-form-item>
        <dc-form-item label="性别" prop="sex">
            <dc-input placeholder="请输入性别" type="text" v-model="state.form.sex" />
        </dc-form-item>
        <dc-form-item label="邮箱" required prop="email">
            <dc-input placeholder="请输入邮箱" type="text" v-model="state.form.email" />
        </dc-form-item>
        <dc-form-item label="选择框" prop="select">
            <dc-select transfer v-model="state.form.select" placeholder="请选择啊啊啊" clearable>
                <dc-option-group>
                    <dc-option value="1">一</dc-option>
                    <dc-option value="2">二</dc-option>
                    <dc-option value="3">三</dc-option>
                </dc-option-group>
            </dc-select>
        </dc-form-item>
        <dc-form-item label="选择框" prop="date">
            <dc-date-picker transfer clearable @on-change="changeDate"></dc-date-picker>
        </dc-form-item>
    </dc-form>
</template>

<script setup>
    import { reactive, ref } from "vue";
    const state = reactive({
        form: {
            select: "",
            date: ""
        },
        rules: {
            date: [
                { required: true, trigger: "change" }
            ],
            name: [
                { required: true, message: "请输入姓名", trigger: "blur"},
            ],
            age: [
                { required: true, message: "请输入性别", trigger: "blur" }
            ],
            sex: [
                {
                    trigger: "blur",
                    validator(rule, value, callback) {
                        if(!value) {
                            callback("请输入性别")
                        }
                        callback();
                    }
                }
            ],
            email: [
                { required: true, message: "请输入邮箱", trigger: "blur"},
                { type: "email", message: "请输入正确的邮箱", trigger: "blur"},
            ],
            select: [
                {
                    required: true
                }
            ]
        },
        inline: false
    })
    const form = ref(null);
    const validate = () => {
        form.value.validate(valid => {
            console.log(valid)
        });
    }
    const validateField = () => {
        form.value.validateField("name");
    }
    const resetFields = () => {
        form.value.resetFields();
    }
    function changeDate(date) {
        console.log(date)
        state.form.date = date
    }
</script>