<template>
    <div id="container">
        <div id="input_container1">
            <span>IP地址1: </span>
            <el-input
                type="text"
                v-model="ip_address1"
                :maxlength="15"
                show-word-limit
                :clearable="true"
                size="small"
                style="width: 200px"
                placeholder="请输入IP地址1"
            ></el-input>
            <br />
            <br />
            <span>子网掩码1: </span>
            <el-autocomplete
                class="inline-input"
                v-model="subnet_mask1"
                :fetch-suggestions="suggestions"
                placeholder="请输入子网掩码1"
                :maxlength="15"
                show-word-limit
                :clearable="true"
                size="small"
                style="width: 200px"
            ></el-autocomplete>
            <br />
            <br />
            <div>
                <span>网络地址1:</span>
                <span>{{ network_address_1 }}</span>
            </div>
        </div>

        <div id="input_container2">
            <span>IP地址2: </span>
            <el-input
                type="text"
                v-model="ip_address2"
                :maxlength="15"
                show-word-limit
                :clearable="true"
                size="small"
                style="width: 200px"
                placeholder="请输入IP地址2"
            ></el-input>
            <br />
            <br />
            <span>子网掩码1: </span>
            <el-autocomplete
                class="inline-input"
                v-model="subnet_mask2"
                :fetch-suggestions="suggestions"
                placeholder="请输入子网掩码2"
                :maxlength="15"
                show-word-limit
                :clearable="true"
                size="small"
                style="width: 200px"
            ></el-autocomplete>
            <br />
            <br />
            <div>
                <span>网络地址2:</span>
                <span>{{ network_address_2 }}</span>
            </div>
        </div>

        <div id="compare_result">
            <span v-if="isSameNetWork === undefined">等待输入地址/子网掩码</span>
            <span v-else-if="isSameNetWork">两个IP <span style="color: red;">属于同一个网络</span></span>
            <span v-else>两个IP <span style="color: red;">不属于属于同一个网络</span></span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import utils from "../utils"

    export default {
        name: 'IsSameNet', // 指定组件名
        data: function() {
            return {
                advices: [],
            }
        },
        mounted() {
                this.advices = this.loadAll()
        },
        methods: {
                suggestions(queryString, cb) {
                    var advices = this.advices;
                    var results = queryString ? advices.filter(this.createFilter(queryString)) : advices;
                    // 调用 callback 返回建议列表的数据
                    cb(results);
                },
                createFilter(queryString) {
                    return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                    };
                },
                loadAll() {
                    return [
                        { "value": "255.0.0.0" },
                        { "value": "255.255.0.0" },
                        { "value": "255.255.255.0" },
                    ]
                },
        },
        computed: {
            ...mapGetters([
                "network_address_1",
                "network_address_2",
            ]),
            ip_address1: {
                get() {
                    return this.$store.state.ip_address
                },
                set(new_address) {
                    this.$store.state.ip_address = new_address
                },
            },
            subnet_mask1: {
                get() {
                    return this.$store.state.subnet_mask
                },
                set(new_mask) {
                    this.$store.state.subnet_mask = new_mask
                },
            },
            ip_address2: {
                get() {
                    return this.$store.state.ip_address2
                },
                set(new_address) {
                    this.$store.state.ip_address2 = new_address
                },
            },
            subnet_mask2: {
                get() {
                    return this.$store.state.subnet_mask2
                },
                set(new_mask) {
                    this.$store.state.subnet_mask2 = new_mask
                },
            },
            isSameNetWork() {
                let {ip_address1,
                    ip_address2,
                    subnet_mask1,
                    subnet_mask2,
                    network_address_1,
                    network_address_2,
                } = this
                
                // 有任何一个ip或子网掩码未输入, 都会提示  `等待输入`
                if (!(ip_address1 && ip_address2 && subnet_mask1 && subnet_mask2)) return
                
                let isSameNetwork_arr = utils.address_spliter(network_address_1).filter(
                    (fragment, index, thisArr) => {
                        let fragment2 = utils.address_spliter(network_address_2)[index]
                        fragment = Number(fragment)
                        fragment2 = Number(fragment2)
                        return fragment === fragment2
                    }
                )

                return isSameNetwork_arr.length === 4
            }
        },
    }
</script>

<style lang="less" scoped>
    #container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #input_container1,
    #input_container2 {
        margin: 0 50px;

        & span {
            margin-right: 50px;
        }
        & span:first-of-type {
            margin-right: 67px;
        }
    }

    #compare_result {
        width: 200px;
        height: 50px;
        position: fixed;
        left: 50%;
        margin-left: -100px;
        top: 350px;
    }
</style>
