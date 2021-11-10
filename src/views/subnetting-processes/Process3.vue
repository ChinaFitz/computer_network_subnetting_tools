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
            <el-table
                :data="type2_dataTable[0]"
                border stripe 
                style="width: 100%"
                :header-cell-style="{backgroundColor: '#ffeead', color: '#d9534f'}"
            >
                <el-table-column prop="ip" label="分配到的网络ip" width="180" align="center"></el-table-column>
                <el-table-column prop="mask" label="子网掩码" width="180" align="center"></el-table-column>
            </el-table>

            <el-table
                :data="type2_dataTable[1]"
                border stripe 
                style="width: 100%"
            >
                <el-table-column prop="serial_num" label="子网序号" width="180" align="center"></el-table-column>
                <el-table-column prop="cur_subnet_network_address" label="该子网的网络地址" width="180" align="center"></el-table-column>
            </el-table>
        </div>

        <div id="type3" v-else-if="subnet_type === '3'">
            <el-table
                :data="type3_dataTable[0]"
                border stripe 
                style="width: 100%"
                :header-cell-style="{backgroundColor: '#ffeead', color: '#d9534f'}"
            >
                <el-table-column prop="ip" label="分配到的网络ip" width="180" align="center"></el-table-column>
                <el-table-column prop="required_subnets_num" label="所需子网个数" align="center"></el-table-column>
            </el-table>

            <el-table
                :data="type3_dataTable[1]"
                border stripe 
                style="width: 100%"
                :header-cell-style="{color: 'rgb(224, 44, 44)'}"
            >
                <el-table-column prop="serial_num" label="子网序号" width="180" align="center"></el-table-column>
                <el-table-column prop="mask" label="子网掩码" width="180" align="center"></el-table-column>
                <el-table-column prop="the_scale_of_host_address" label="主机地址范围(第一个地址可做该子网的网络地址)" width="325" align="center"></el-table-column>
            </el-table>
        </div>

        <div id="type4" v-else-if="subnet_type === '4'">

            <div id="type4_info">
                <el-table
                :data="table_datas_from_hosts_num_in_each_subnet[0]"
                border stripe 
                style="width: 100%"
                :header-cell-style="{backgroundColor: '#ffeead', color: '#d9534f'}"
                >
                    <el-table-column prop="ip" label="分配到的网络ip" align="center"></el-table-column>
                </el-table>

                <el-table
                :data="table_datas_from_hosts_num_in_each_subnet[1]"
                border stripe 
                style="width: 100%"
                :header-cell-style="{backgroundColor: '#ffeead', color: '#d9534f'}"
                >
                    <el-table-column prop="serial_num" label="子网序号" align="center"></el-table-column>
                    <el-table-column prop="required_host_num" label="要求当前子网能够容纳的主机数" align="center"></el-table-column>
                </el-table>
            </div>

            <el-table
                :data="type4_dataTable"
                border stripe 
                style="width: 100%"
                :header-cell-style="{color: 'rgb(224, 44, 44)'}"
            >
                <el-table-column prop="serial_num" label="子网序号" width="180" align="center"></el-table-column>
                <el-table-column prop="mask" label="子网掩码" width="180" align="center"></el-table-column>
                <el-table-column prop="the_scale_of_host_address" label="主机地址范围(第一个地址可做该子网的网络地址)" width="325" align="center"></el-table-column>
            </el-table>
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

    export default {
        name: 'Process3', // 指定组件名
        data: function() {
            return {
                
            }
        },
        computed: {
            ...mapState([
                'ip_address',
                'subnet_type',
                'hosts_num_in_each_subnet',
            ]),
            ...mapGetters([
                'type1_network_address',
                'type2_dataTable',
                "type3_dataTable",
                "type4_dataTable",
            ]),

            table_datas_from_hosts_num_in_each_subnet() {
                
                const hosts_num_in_each_subnet = JSON.parse(this.hosts_num_in_each_subnet)
                const ip = this.ip_address

                let source_table = [
                    [
                        {ip,},
                    ],
                ]

                source_table[1] = hosts_num_in_each_subnet.map(
                    (host_num, index) => {
                        return {
                            serial_num: index + 1,
                            required_host_num: host_num,
                        }
                    }
                )
                return source_table
            },
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

    #set_type_style(@num) {
        #type@{num} {
            .el-table {
                margin: 40px auto;
            }
        }
    }

    each(range(1, 4, 1), #(@the_num){
        #set_type_style(@the_num);
    });
</style>
