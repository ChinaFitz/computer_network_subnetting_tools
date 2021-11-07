<template>
    <div>
        <div
            id="miss_subnet_type"
            v-if="!subnet_type"
        >
            <el-empty description="请在上一步中选择一种问题类型"></el-empty>
            <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
        </div>
    </div>
</template>


<script>

    export default {
        name: "Process2", // 指定组件名
        data: function () {
            return {
                
            }
        },
        computed: {
            subnet_type: {
                get() {
                    return this.$store.state.subnet_type
                },
                set(type) {
                    this.$store.state.subnet_type = type
                },
            },
        },
        methods: {
            pre() {
                this.$router.push({name: "Process1"})
            }
        }
    }

</script>

<style lang="less" scoped>
    
</style>