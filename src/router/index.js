import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HelloPage from "../views/HelloPage.vue"
import IpClass from "../views/IpClass.vue"
import IpDetails from "../views/IpDetails.vue"
import IsSameNet from "../views/IsSameNet.vue"
import NetConfigGen from "../views/NetConfigGen.vue"
import Subnetting from "../views/Subnetting.vue"

const routes = [
    {
        name: "HelloPage",
        path: "/helloPage",
        component: HelloPage,
    },
    {
        name: "IpClass",
        path: "/ipClass",
        component: IpClass,
    },
    {
        name: "IpDetails",
        path: "/ipDetails",
        component: IpDetails,
    },
    {
        name: "IsSameNet",
        path: "/isSameNet",
        component: IsSameNet,
    },
    {
        name: "Subnetting",
        path: "/subnetting",
        component: Subnetting,
    },
    {
        name: "NetConfigGen",
        path: "/netConfigGen",
        component: NetConfigGen,
    },
    {
        path: "/",
        redirect: "/helloPage"
    }
]

const router = new VueRouter({
    routes,
})

export default router
