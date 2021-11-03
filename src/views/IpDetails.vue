<template>
    <div id="container">
        <div id="switch">
            <el-switch v-model="binOrdec" active-text="二进制" active-color="#ff4949" inactive-text="十进制">
            </el-switch>
        </div>

        <span>IP地址:</span>
        <el-input
            type="text"
            placeholder="请输入ip地址"
            v-model="ip_address"
            :maxlength="binOrdec ? 35 : 15"
            show-word-limit
            :clearable="true"
            size="small"
            :style="{ marginLeft: '21px' }"
            ref="el_input"
        ></el-input>

        <br />

        <span style="margin-right: 20px;">
            子网掩码(仅支持十进制):
        </span>
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

        <el-divider></el-divider>

        <div id="details">
            <el-descriptions :column="1" border>
                
                <el-descriptions-item
                    v-for="(item, index) in details" :key="index"
                    :labelStyle="{ 'text-align': 'center', 'background-color': index%2===0?'#E1F3D8':'#DCDCDC', 'font-size': '14px', 'color': 'black' }"
                    :contentStyle="{ 'text-align': 'center', 'background-color': index%2===0?'#E1F3D8':'#DCDCDC', 'font-size': '14px', 'color': 'black' }"
                    :label="item.label"
                >
                    {{ item.result }}
                </el-descriptions-item>
            
            </el-descriptions>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import utils from '../utils'

    export default {
        name: 'IpDetail', // 指定组件名
        data: function() {
            return {
                advices: [],
                details: [
                    {
                        label: "iP地址的二进制形式:",
                        result: null,
                    },
                    {
                        label: "iP地址分类:",
                        result: null
                    },
                    {
                        label: "子网号位数:",
                        result: null
                    },
                    {
                        label: "可用子网数(子网号全为0或1会冲突):",
                        result: null
                    },
                    {
                        label: "新路由器的可用子网数(子网号全为0或1不再冲突):",
                        result: null
                    },
                    {
                        label: "主机号位数:",
                        result: null
                    },
                    {
                        label: "主机号(10进制):",
                        result: null
                    },
                    {
                        label: "主机号(2进制):",
                        result: null
                    },
                    {
                        label: "主机数:",
                        result: null
                    },
                    {
                        label: "可用主机数:",
                        result: null
                    },
                    {
                        label: "网络地址(10进制):",
                        result: null
                    },
                    {
                        label: "网络地址(2进制):",
                        result: null
                    },
                    {
                        label: "主机地址范围(子网不参与计算)(10进制):",
                        result: null
                    },
                    {
                        label: "主机地址范围(子网不参与计算)(2进制):",
                        result: null
                    },
                ],
            }
        },
        mounted() {
            this.advices = this.loadAll()
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
        },
        computed: {

            ...mapGetters([
                "convert_ip_address",
                "ipClass",
                "bits_of_subnet",
                "num_of_subnet",
                "bits_of_hosts",
            ]),

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
            binOrdec: {
                get() {
                    return this.$store.state.binOrdec
                },
                set(val) {
                    this.$store.state.ip_address = ''
                    this.$store.state.binOrdec = val
                    if (val) {
                        this.$refs.el_input.$el.style.width = '330px'
                    } else {
                        this.$refs.el_input.$el.style.width = '200px'
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

        },
        watch: {
            binOrdec: {
                immediate: true,
                handler(bool) {
                    this.$nextTick(() => {
                        if (bool) {
                            this.$refs.el_input.$el.style.width = '330px'
                            // 输入为二进制时, 显示十进制结果
                            this.details[0].label = "iP地址的十进制形式:"
                        } else {
                            this.$refs.el_input.$el.style.width = '200px'
                            // 输入为十进制时, 显示二进制结果
                            this.details[0].label = "iP地址的二进制形式:"
                        }
                    })
                },
            },
            convert_ip_address: {
                immediate: true,
                handler(val) {
                    this.details[0].result = val
                },
            },
            ipClass: {
                immediate: true,
                handler(c) {
                    this.details[1].result = c ? `${c}类地址` : null
                }
            },
            bits_of_subnet: {
                immediate: true,
                handler(num) {
                    this.details[2].result = num
                }
            },
            num_of_subnet: {
                immediate: true,
                handler(obj) {
                    this.details[3].result = obj.old_router
                    this.details[4].result = obj.new_router
                }
            },
            bits_of_hosts: {
                immediate: true,
                handler(num) {
                    this.details[5].result = num
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .el-input {
        margin: 20px 0;
    }

    #details {
        width: 65%;
        margin: 0 auto;
    }

    .el-descriptions-item_cell {
        background-color: red!important;
    }
</style>
