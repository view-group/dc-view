<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <span class="item"><router-link to="/menu">menu</router-link></span>
  <span class="item"><router-link to="/tooltip">tooltip</router-link></span>
  <span class="item"><router-link to="/ellipsis">ellipsis</router-link></span>
  <span class="item"><router-link to="/form">form</router-link></span>
  <span class="item"><router-link to="/input">input</router-link></span>
  <div style="margin: 50px">
      <router-view></router-view>
  </div>
</template>

<script setup>
  import {ref, reactive, onMounted} from "vue";
  const state = reactive({
    form: {
      name: "",
      age: ""
    },
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
      
    }
  })
  const inline = ref(true)
  const form = ref();
  const aa = () => {
    form.value.resetFields("name", (flag) => {
      console.log(flag)
    })
  }
  onMounted(() => {
      // console.log(form.value.a)
  })
</script>

<style>
.item {
  margin-right: 10px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
