import { createApp } from 'vue'
import App from './App.vue'
import DcView from "../src/index"
import "../src/styles/index.scss";
import "./style/common.scss"

// import '../lib/dc-view.css';

import { createRouter, createWebHistory } from "vue-router"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/menu',
            component: () => import('./views/menu.vue')
        },
        {
            path: '/tooltip',
            component: () => import('./views/tooltip.vue')
        },
        {
            path: '/ellipsis',
            component: () => import('./views/ellipsis.vue')
        },
        {
            path: '/form',
            component: () => import('./views/form.vue')
        },
        {
            path: '/input',
            component: () => import('./views/input.vue')
        }
    ]
})
createApp(App).use(router).use(DcView).mount('#app')
