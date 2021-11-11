<template>
    <div>
        <div id="miss_subnet_type" v-if="subnet_type === '0'">
            <el-empty description="请在步骤1中选择一种问题类型"></el-empty>
            <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
        </div>

        <div id="required_conditions" v-else>
            <div id="notice" v-if="subnet_type === '4'">
                <span>如果只知道子网中最大的主机数, 则尝试每个子网都填入该数或依次减少其他子网的主机数</span>
                <br />
                <br />

                <span style="color: rgb(65,184,131); font-weight: bold; font-size: 17px;">
                    例如: 有3个地方要用网络, 最多主机的地方总共有16台, 则可以是[16, 16, 16] 或 [16, 12, 10]
                </span>

                <br />
                <br />
                <span style="color: red; font-weight: bold; font-size: 25px;"
                    >这个工具支持因为子网不能容下所需的主机数而导致需要子网再划分的情况!!!</span
                >
            </div>

            <div class="conditions_group">
                <span>IP地址(仅支持十进制):</span>
                <el-input
                    type="text"
                    placeholder="请输入ip地址"
                    v-model="ip_address"
                    :maxlength="15"
                    show-word-limit
                    :clearable="true"
                    size="small"
                    :style="{ marginLeft: '21px', width: '200px' }"
                    ref="el_input"
                ></el-input>
            </div>

            <div class="conditions_group" v-if="subnet_type === '1' || subnet_type === '2'">
                <span style="margin-right: 20px;"> 子网掩码(仅支持十进制): </span>
                <el-autocomplete
                    class="inline-input"
                    v-model="subnet_mask"
                    :fetch-suggestions="suggestions"
                    placeholder="请输入子网掩码"
                    :maxlength="15"
                    show-word-limit
                    :clearable="true"
                    size="small"
                ></el-autocomplete>
            </div>

            <div class="conditions_group" v-else-if="subnet_type === '3'">
                <span>所需子网个数:</span>
                <el-input
                    type="text"
                    placeholder="所需子网个数"
                    v-model.number="required_subnets_num"
                    :maxlength="15"
                    show-word-limit
                    :clearable="true"
                    size="small"
                    :style="{ marginLeft: '21px', width: '200px' }"
                ></el-input>
            </div>

            <div class="conditions_group" v-else>
                <span>每个子网的需容纳的主机数( 传值方式示例: [6, 24, 16, 32, 29] ):</span>
                <el-input
                    type="text"
                    placeholder="每个子网的需容纳的主机数"
                    v-model="hosts_num_in_each_subnet"
                    :clearable="true"
                    size="small"
                    :style="{ marginLeft: '21px', width: '200px' }"
                ></el-input>
            </div>

            <div class="conditions_group">
                <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
                <el-button style="margin-top: 12px;" v-if="subnet_type" @click="next()">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from '../../utils'
    import { mapState } from 'vuex'

    export default {
        name: 'Process2', // 指定组件名
        data: function() {
            return {}
        },
        computed: {
            ...mapState(['subnet_type', 'binOrdec', 'hosts_num_in_each_subnet']),

            ip_address: {
                get() {
                    return this.$store.state.ip_address
                },
                set(val) {
                    // 修复el-input组件的清空功能
                    if (val === '') {
                        this.$store.state.ip_address = val
                        return
                    }

                    const reg = /(\.|[0-9]){1}/gi
                    let str_len = val.length

                    if (reg.test(val[str_len - 1])) {
                        if (val.endsWith('.', str_len - 1) && val.endsWith('.')) return // 不能输入两次. 例如: 192..168
                        this.$store.state.ip_address = val
                    }

                    // 十进制下, ip输入不能出现超过255的情况
                    if (!this.binOrdec) {
                        utils.address_spliter(val).forEach(fragment => {
                            if (Number(fragment) > 255) {
                                this.$message.closeAll()
                                this.$message({
                                    showClose: true,
                                    message: '请仔细检查ip地址 !!! ',
                                    type: 'error',
                                })
                                return
                            }
                        })
                    }
                },
            },

            subnet_mask: {
                get() {
                    return this.$store.state.subnet_mask
                },
                set(val) {
                    // 修复el-input组件的清空功能
                    if (val === '') {
                        this.$store.state.subnet_mask = val
                        return
                    }

                    const reg = /(\.|[0-9]){1}/gi
                    let str_len = val.length

                    if (reg.test(val[str_len - 1])) {
                        if (val.endsWith('.', str_len - 1) && val.endsWith('.')) return // 不能输入两次. 例如: 192..168
                        this.$store.state.subnet_mask = val
                    }

                    // 十进制下, ip输入不能出现超过255的情况
                    if (!this.binOrdec) {
                        utils.address_spliter(val).forEach(fragment => {
                            if (Number(fragment) > 255) {
                                this.$message.closeAll()
                                this.$message({
                                    showClose: true,
                                    message: '请仔细检查子网掩码 !!! ',
                                    type: 'error',
                                })
                                return
                            }
                        })
                    }
                },
            },

            required_subnets_num: {
                get() {
                    return this.$store.state.required_subnets_num
                },
                set(num) {
                    // 清空
                    if (num === '') {
                        this.$store.state.required_subnets_num = ''
                    } else if (num < 1) {
                        this.$store.state.required_subnets_num = 1
                        alert('所需子网数要大于等于1')
                    } else {
                        this.$store.state.required_subnets_num = num
                    }
                },
            },
        },
        methods: {
            // 子网掩码自动填充用
            suggestions(queryString, cb) {
                var advices = this.advices
                var results = queryString ? advices.filter(this.createFilter(queryString)) : advices
                // 调用 callback 返回建议列表的数据
                cb(results)
            },
            createFilter(queryString) {
                return restaurant => {
                    return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                }
            },
            loadAll() {
                return [{ value: '255.0.0.0' }, { value: '255.255.0.0' }, { value: '255.255.255.0' }]
            },
            // 子网掩码自动填充用

            pre() {
                // this.$store.state.active = 0     // subnetting.vue中加入了url path监听, 所以不再需要
                this.$router.push({ name: 'Process1' })
            },
            next() {
                // this.$store.state.active = 2     // subnetting.vue中加入了url path监听, 所以不再需要
                if (!this.ip_address || !this.required_subnets_num) {
                    alert('请检查是否漏掉必要的两个条件')
                    return
                }
                this.$router.push({ name: 'Process3' })
            },
        },
        mounted() {
            this.advices = this.loadAll()
        },
    }
</script>

<style lang="less" scoped>
    #required_conditions {
        .conditions_group {
            display: block;
            margin: 20px auto;
        }
    }

    #notice {
        margin: 50px auto;
        padding: 15px;
        border: 1px solid rgb(150, 145, 145);
        box-shadow: 7px -5px 10px 0px gray;
    }
</style>
