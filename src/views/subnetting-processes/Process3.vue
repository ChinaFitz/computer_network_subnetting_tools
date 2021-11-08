<template>
    <div>
        <div id="type1" v-if="subnet_type === '1'">
            <el-table
                :data="type1_network_address"
                border stripe 
                style="width: 100%"
            >
                <el-table-column prop="ip" label="ip地址" width="180" align="center"></el-table-column>
                <el-table-column prop="mask" label="子网掩码" width="180" align="center"></el-table-column>
                <el-table-column prop="network_address" label="网络地址" width="180" align="center"></el-table-column>
            </el-table>
        </div>

        <div id="type2" v-else-if="subnet_type === '2'">
            2号问题
        </div>

        <div id="type3" v-else-if="subnet_type === '3'">
            3号问题
        </div>

        <div id="type4" v-else-if="subnet_type === '4'">
            4号问题
        </div>

        <div id="miss_subnet_type" v-else>
            <el-empty description="请在步骤1中选择一种问题类型"></el-empty>
        </div>

        <div class="conditions_group">
            <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import utils from '../../utils'

    export default {
        name: 'Process3', // 指定组件名
        data: function() {
            return {
                
            }
        },
        computed: {
            ...mapState(['subnet_type']),
            ...mapGetters(['type1_network_address']),
        },
        methods: {
            pre() {
                this.$router.push({ name: 'Process2' })
            },
        },
    }
</script>

<style lang="less" scoped>
    .conditions_group {
        display: block;
    }
</style>
