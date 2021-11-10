import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import HelloPage from '../views/HelloPage.vue'
import IpClass from '../views/IpClass.vue'
import IpDetails from '../views/IpDetails.vue'
import IsSameNet from '../views/IsSameNet.vue'
import NetConfigGen from '../views/NetConfigGen.vue'
import Subnetting from '../views/Subnetting.vue'
import Process1 from '../views/subnetting-processes/Process1'
import Process2 from '../views/subnetting-processes/Process2'
import Process3 from '../views/subnetting-processes/Process3'

const routes = [
    {
        name: 'HelloPage',
        path: '/helloPage',
        component: HelloPage,
    },
    {
        name: 'IpClass',
        path: '/ipClass',
        component: IpClass,
    },
    {
        name: 'IpDetails',
        path: '/ipDetails',
        component: IpDetails,
    },
    {
        name: 'IsSameNet',
        path: '/isSameNet',
        component: IsSameNet,
    },
    {
        name: 'Subnetting',
        path: '/subnetting',
        component: Subnetting,
        redirect: '/subnetting/process1',
        children: [
            {
                name: 'Process1',
                path: 'process1',
                component: Process1,
            },
            {
                name: 'Process2',
                path: 'process2',
                component: Process2,
            },
            {
                name: 'Process3',
                path: 'process3',
                component: Process3,
            },
        ],
    },
    {
        name: 'NetConfigGen',
        path: '/netConfigGen',
        component: NetConfigGen,
    },
    {
        path: '/',
        redirect: '/helloPage',
    },
]

const router = new VueRouter({
    routes,
})

export default router
