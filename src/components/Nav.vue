<template>
    <el-menu class="el-menu-demo" mode="horizontal" text-color="#409eff" active-text-color="#42b983" :router="true">
        <el-menu-item
            :index="nav.index"
            v-for="nav in navs"
            :key="nav.index"
            :class="{ hello_page_style: nav.index === '/helloPage' }"
        >
            {{ nav.title }} 
            <span style="color: red;">{{ nav.subtitle }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: 'Nav', // 指定组件名
        data() {
            return {
                navs: [
                    {
                        index: '/helloPage',
                        title: '计算机网络工具',
                        subtitle: '',
                    },
                    {
                        index: '/ipClass',
                        title: '判断IP地址类型',
                    },
                    {
                        index: '/ipDetails',
                        title: 'IP地址详情',
                        subtitle: '(需要子网掩码)',
                    },
                    {
                        index: '/isSameNet',
                        title: '判断两个IP是否属于同一个网络',
                        subtitle: '',
                    },
                    {
                        index: '/subnetting',
                        title: '子网划分',
                        subtitle: '',
                    },
                    {
                        index: '/netConfigGen',
                        title: '局域网配置生成器',
                        subtitle: '',
                    },
                ],
            }
        },
        methods: {},
    }
</script>

<style lang="less" scoped>
    .el-menu {
        width: 95%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .el-menu-item {
        flex-grow: 1;
        flex-shrink: 0;
        font-weight: bold;
        font-size: 15px;
        &:first-of-type {
            font-size: 25px;
            position: relative;
            left: -30px;
            top: 0;
        }
    }

    .hello_page_style {
        color: black !important;
        border: none !important;
    }
</style>
