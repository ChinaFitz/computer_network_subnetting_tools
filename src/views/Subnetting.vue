<template>
    <div id="container">
        <div id="steps">
            <el-steps :active="active" align-center finish-status="success">
                <el-step title="步骤1" description="子网划分题目的类型"></el-step>
                <el-step title="步骤2" description="填写计算所需的条件"></el-step>
                <el-step title="步骤3" description="计算得出需要的结果"></el-step>
            </el-steps>
        </div>

        <div id="figure">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Subnetting', // 指定组件名
        data: function() {
            return {}
        },
        computed: {
            ...mapState(['active']),
        },
        watch: {
            $route: {
                immediate: true,
                deep: true,
                handler({ name }) {
                    switch (name) {
                        case 'Process1':
                            this.$store.state.active = 0
                            break
                        case 'Process2':
                            this.$store.state.active = 1
                            break
                        case 'Process3':
                            this.$store.state.active = 3
                            break
                    }
                },
            },
        },
    }
</script>

<style lang="less" scoped>
    #figure {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
