<template>
    <div>
        <div id="pics">
            <img src="../assets/ipclassifier.png" />
            <img src="../assets/ipclassifier2.png" />
        </div>

        <el-divider></el-divider>

        <div id="main">
            <div id="switch">
                <el-switch v-model="binOrdec" inactive-text="十进制" active-text="二进制" active-color="#ff4949"></el-switch>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label for="ip">ip地址: </label>
            <el-input
                id="ip"
                type="text"
                placeholder="请输入IP地址"
                v-model="ip_address"
                :maxlength="maxlength"
                show-word-limit
                :clearable="true"
                ref="el_input"
            >
            </el-input>
            <div id="result" v-show="ipClass">这是一个 {{ ipClass }} 类地址</div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"
    import utils from "../utils/index"

    export default {
        name: 'IpClass', // 指定组件名
        data: function() {
            return {}
        },
        computed: {
            ...mapGetters([
                "ipClass"
            ]),

            ip_address: {
                get() {
                    return this.$store.state.ip_address
                },
                set(val) {
                    // 修复el-input组件的清空功能
                    if (val === "") {
                        this.$store.state.ip_address = val
                        return
                    }
                    
                    const reg = /(\.|[0-9]){1}/ig
                    let str_len = val.length
                    
                    if( reg.test(val[str_len-1]) ) {
                        if (val.endsWith(".", str_len-1) && val.endsWith(".")) return   // 不能输入两次. 例如: 192..168
                        this.$store.state.ip_address = val
                    }
                    
                    // 十进制下, ip输入不能出现超过255的情况
                    if (!this.binOrdec) {
                        utils.address_spliter(val).forEach(
                            fragment => {
                                if (Number(fragment) > 255) {
                                    this.$message({
                                        showClose: true,
                                        message: '请仔细检查ip地址 !!! ',
                                        type: 'error'
                                    })
                                    return
                                }
                            }
                        )
                    }
                }
            },
            binOrdec: {
                get() {
                    return this.$store.state.binOrdec
                },
                set(val) {
                    this.$store.state.ip_address = ""
                    this.$store.state.binOrdec = val
                    if (val) {
                        this.$refs.el_input.$el.style.width = "330px"
                    }else {
                        this.$refs.el_input.$el.style.width = "200px"
                    }
                }
            },

            // 根据ip地址的进制, 动态改变输入框的文本输入限制
            maxlength() {
                return this.binOrdec? 35 : 15
            }
        },
        watch: {
            binOrdec: {
                immediate: true,
                handler(bool) {
                    this.$nextTick(
                        ()=> {
                            if (bool) {
                                this.$refs.el_input.$el.style.width = "330px"
                            }else {
                                this.$refs.el_input.$el.style.width = "200px"
                            }
                        }
                    )
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #pics {
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 49%;
            height: 350px;
        }
    }

    .el-input {
        width: 200px;
        margin: 20px 0;
    }
</style>
