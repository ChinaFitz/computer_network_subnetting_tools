<template>
    <div>
        <div id="known_conditions">
            <el-radio v-model="subnet_type" label="1" border>已知IP地址、子网掩码<span class="need_to_calc">求网络地址</span></el-radio>
            <el-radio v-model="subnet_type" label="2" border>已知网络IP地址、子网掩码<span class="need_to_calc">求可划分的子网数和每个子网的子网号</span></el-radio>
            <el-radio v-model="subnet_type" label="3" border>已知网络IP地址、所需子网个数<span class="need_to_calc">求每个子网的子网掩码及对应的主机地址范围</span></el-radio>
            <el-radio v-model="subnet_type" label="4" border>已知网络IP地址、每个子网的需要容纳的主机数<span class="need_to_calc">求每个子网的子网掩码、对应的主机地址范围</span></el-radio>
        </div>
        <el-button style="margin-top: 12px;" @click="next(subnet_type)">下一步</el-button>
    </div>
</template>


<script>
    import {mapState} from "vuex"

    export default {
        name: "Process1", // 指定组件名
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
            next(subnet_type) {
                if (subnet_type === 0) {
                    alert("请选择一种子网划分问题的类型")
                }else {
                    // this.$store.state.active = 1     // subnetting.vue中加入了url path监听, 所以不再需要
                    this.$router.push({name: "Process2"})
                }
            },
        },
       
    }

</script>

<style lang="less" scoped>
    #known_conditions {
        width: 30%;
        margin: 50px auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .el-radio {
            margin-bottom: 20px;
            text-align: start;
            &:first-child {
                margin-left: 10px;
            }
        }
    }
    
    #btn_container {
        position: relative;
        .el-button {
            height: 40px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 0 auto;
        }
    }
    .need_to_calc {
        color: rgb(207, 41, 41);
        font-weight: bold;
    }
</style>