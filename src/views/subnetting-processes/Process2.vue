<template>
    <div>
        <div id="miss_subnet_type" v-if="subnet_type === '0'">
            <el-empty description="请在上一步中选择一种问题类型"></el-empty>
            <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
        </div>

        <div id="required_conditions" v-else>
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

            <div class="conditions_group">
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
            </div>

            <div class="conditions_group">
                <el-button style="margin-top: 12px;" @click="pre">上一步</el-button>
                <el-button style="margin-top: 12px;" v-if="subnet_type" @click="next()">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from "../../utils"
    import {mapState} from "vuex"

    export default {
        name: 'Process2', // 指定组件名
        data: function() {
            return {}
        },
        computed: {
            ...mapState([
                "subnet_type",
                "binOrdec",
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
</style>
