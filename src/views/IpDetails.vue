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

        <div>
            所有需要计算的项目
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
                        this.$refs.el_input.$el.style.width = '300px'
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
                handler(num) {
                    this.$nextTick(() => {
                        if (num) {
                            this.$refs.el_input.$el.style.width = '300px'
                        } else {
                            this.$refs.el_input.$el.style.width = '200px'
                        }
                    })
                },
            },
        },
    }
</script>

<style lang="less" scoped>
    .el-input {
        margin: 20px 0;
    }
</style>
