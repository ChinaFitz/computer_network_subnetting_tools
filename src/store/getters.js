import utils from '../utils'
import { Message } from 'element-ui'

export default {
    // ======================= 路由1: 判断ip地址类型 ========================
    ipClass(state) {
        try {
            let { ip_address, subnet_mask, binOrdec } = state
            if (ip_address === '' || subnet_mask === '') return
            return utils.ipClassifier(ip_address, binOrdec)
        } catch (e) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },
    // ======================= 路由1: 判断ip地址类型 ========================

    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================

    // 1. ip地址的对立进制 2进制=>10进制, 反之...
    convert_ip_address(state) {
        try {
            let { ip_address, subnet_mask, binOrdec } = state
            if (ip_address === '' || subnet_mask === '') return
            if (binOrdec) {
                // 十进制形式的结果
                return utils.dec_ip_address(ip_address)
            } else {
                // 二进制形式的结果
                return utils.bin_ip_address(ip_address)
            }
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 2. 子网号位数
    bits_of_subnet(state, getters) {
        try {
            let { ip_address, subnet_mask } = state
            let { ipClass } = getters

            if (ip_address === '' || ipClass === undefined || subnet_mask === '') return
            return utils.bits_of_subnet(ipClass, subnet_mask)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 3-4. 可用子网数 (结果包含: 新版路由器 + 旧版路由器)
    num_of_subnet(state, getters) {
        try {
            let { bits_of_subnet } = getters
            if (bits_of_subnet === undefined) return 0
            return utils.num_of_subnet(bits_of_subnet)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 5. 主机号位数
    bits_of_hosts(state, getters) {
        try {
            let { ip_address, subnet_mask } = state
            let { ipClass } = getters

            if (ip_address === '' || ipClass === undefined || subnet_mask === '') return

            return utils.bits_of_hosts(ipClass, subnet_mask)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 6. 主机号(10进制)
    host_number_in_dec(state, getters) {
        try {
            let result = utils.address_spliter(getters.host_number_in_bin).map(fragment => utils.bin2dec(fragment))
            return utils.address_joiner(result)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 7. 主机号(2进制)
    host_number_in_bin(state, getters) {
        try {
            let { binOrdec, subnet_mask: mask } = state

            if (binOrdec) {
                var ip = state.ip_address
            } else {
                var ip = getters.convert_ip_address
            }

            if (ip === '' || mask === '') return

            return utils.host_number_in_bin(ip, mask)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 8. 主机数
    hosts(state, getters) {
        try {
            let { bits_of_hosts } = getters
            if (bits_of_hosts > 0) {
                return 2 ** bits_of_hosts
            } else if (bits_of_hosts === undefined) {
                return
            } else {
                return 0
            }
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 9. 可用主机数
    useful_hosts(state, getters) {
        try {
            let hosts = getters.hosts
            if (hosts > 0) {
                return hosts - 2
            } else if (hosts === undefined) {
                return
            } else {
                return 0
            }
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 10. 网络地址(10进制)
    network_address_dec(state, getters) {
        try {
            let { network_address_bin } = getters
            return utils.dec_ip_address(network_address_bin)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 11. 网络地址(2进制)
    network_address_bin(state, getters) {
        try {
            let { ip_address, subnet_mask, binOrdec } = state
            if (ip_address === '' || subnet_mask === '') return

            if (!binOrdec) {
                ip_address = getters.convert_ip_address
            }

            let subnet_mask_arr = utils.bin_ip_address(subnet_mask)

            return utils.AND_operation(ip_address, subnet_mask_arr)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // 12. 主机地址范围(10进制)
    host_address_dec(state, getters) {
        try {

            let { ip_address } = state
            let {bits_of_subnet} = getters

            return utils.calc_host_address(ip_address, bits_of_subnet)
        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },
    // 13. 主机地址范围(2进制)
    host_address_bin(state, getters) {
        try {

            let { host_address_dec } = getters
            const start_and_end_Arr = host_address_dec.split(" ~ ")
            let start = utils.bin_ip_address(start_and_end_Arr[0])
            let end = utils.bin_ip_address(start_and_end_Arr[1])

            return `${start} ~ ${end}`

        } catch (error) {
            Message({
                message: '请仔细检查ip地址和子网掩码是否有错误!',
                type: 'error',
                duration: 1500,
            })
            return
        }
    },

    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================

    // ======================= 路由3: 判断两个ip是否属于同一个网络 ======================
    calc_network_address() {
        return function(ip_address, subnet_mask) {
            try {
                if (ip_address === '' || subnet_mask === '') return

                // 将ip转为二进制
                let ip_address_bin = utils.patchZero(utils.bin_ip_address(ip_address))

                // 将子网掩码转为二进制
                let subnet_mask_arr = utils.bin_ip_address(subnet_mask)

                let network_address_dec = utils.dec_ip_address(utils.AND_operation(ip_address_bin, subnet_mask_arr))

                return network_address_dec
            } catch (error) {
                Message({
                    message: '请仔细检查ip地址和子网掩码是否有错误!',
                    type: 'error',
                    duration: 1500,
                })
                return
            }
        }
    },
    network_address_1(state, getters) {
        let { ip_address, subnet_mask } = state
        let { calc_network_address } = getters

        return calc_network_address(ip_address, subnet_mask)
    },
    network_address_2(state, getters) {
        let { ip_address2, subnet_mask2 } = state
        let { calc_network_address } = getters

        return calc_network_address(ip_address2, subnet_mask2)
    },

    // ======================= 路由3: 判断两个ip是否属于同一个网络 ======================

    // ========================== 路由4: 子网划分 ==============================

    /*
        @author:  Fitz
        @name:  calc_the_num_of_subnets_and_its_network_address
        @description:  根据ip和子网掩码计算出子网个数和每个子网的网络地址
        @parms:  String ip地址    String 子网掩码
        @return:  Object
                    [
                        [
                            {
                                ip: ip_address,
                                mask: subnet_mask,
                            }
                        ],
                        
                        [
                            {
                                serial_num: "1",
                                cur_subnet_network_address: "111111",
                            }
                        ]
                    ]
    */
    calc_the_num_of_subnets_and_its_network_address() {
        return function(ip_address, subnet_mask) {
            try {
                if (ip_address === '' || subnet_mask === '') return

                // 最终结果都将被保存到该数组中
                let final_results = [
                    // type2_dataTable[0]
                    [
                        {
                            ip: ip_address,
                            mask: subnet_mask,
                        },
                    ],

                    // type2_dataTable[1]
                    [],
                ]

                let ipClass = utils.ipClassifier(ip_address)
                let flag = utils.standard_mask[ipClass]['flag'] // 根据ip类型确定子网号开始统计的部分

                let ip_address_bin_arr = utils.address_spliter(utils.bin_ip_address(ip_address))

                ip_address_bin_arr = ip_address_bin_arr.slice(0, flag)

                let mask_bin_arr = utils.address_spliter(utils.bin_ip_address(subnet_mask))

                mask_bin_arr = mask_bin_arr.slice(flag)

                // 得到子网掩码中1的位数
                let bit_is_one_counter = (() => {
                    let counter = 0
                    for (let i = 0, len = mask_bin_arr.length; i < len; i++) {
                        for (const bit of mask_bin_arr[i]) {
                            if (bit === '1') {
                                counter++
                            } else {
                                break
                            }
                        }
                    }
                    return counter
                })()

                let bit_combine_arr = utils.bit_combination_generator(bit_is_one_counter)
                bit_combine_arr = bit_combine_arr.map(combine => {
                    while (combine.length < (4 - ip_address_bin_arr.length) * 8) {
                        combine.push('0')
                    }
                    return combine
                })

                for (let i = 0, len = bit_combine_arr.length; i < len; i++) {
                    const type2_dataTable2 = {
                        serial_num: i + 1,
                    }

                    let cur = bit_combine_arr[i]
                    let decompose = utils.arr_vector_one_to_two(8, cur)

                    let cur_subnet_network_address = [...ip_address_bin_arr] // 深复制一份ip, 不影响原ip

                    decompose.forEach(item => {
                        item = item.join('')
                        cur_subnet_network_address.push(item)
                    })

                    cur_subnet_network_address = cur_subnet_network_address
                        .map(fragment => utils.bin2dec(fragment))
                        .join('.')

                    type2_dataTable2['cur_subnet_network_address'] = cur_subnet_network_address

                    final_results[1].push(type2_dataTable2)
                }

                return final_results
            } catch (error) {
                Message({
                    message: '请仔细检查ip地址和子网掩码是否有错误!',
                    type: 'error',
                    duration: 1500,
                })
                return
            }
        }
    },
    // ========================== 问题1: 根据ip、子网掩码求网络地址  ===============================
    type1_network_address(state, getters) {
        let { ip_address, subnet_mask } = state
        let { calc_network_address } = getters
        return [
            {
                ip: ip_address,
                mask: subnet_mask,
                network_address: calc_network_address(ip_address, subnet_mask),
            },
        ]
    },
    // ==================== 问题2: 根据ip、子网掩码求能分配的子网数及每个子网的网络地址 =============
    type2_dataTable(state, getters) {
        let { ip_address, subnet_mask } = state
        let { calc_the_num_of_subnets_and_its_network_address } = getters
        return calc_the_num_of_subnets_and_its_network_address(ip_address, subnet_mask)
    },
    // =================== 问题3: 已知网络IP地址、所需子网个数求每个子网的子网掩码及对应的主机地址范围 =================
    type3_dataTable(state, getters) {
        let { ip_address: ip, required_subnets_num } = state
        let {calc_the_num_of_subnets_and_its_network_address} = getters


        let final_results = [
            [
                {
                    ip,
                    required_subnets_num,
                }
            ],
        ]
        
        // 子网掩码需要用于做子网号的bit数
        let required_bit = Math.ceil(Math.log2(required_subnets_num))

        const ipClass = utils.ipClassifier(ip)
        const flag = utils.standard_mask[ipClass]["flag"]

        // 子网掩码计算结果将基于这个变量进行修改
        let temp_mask_bin_arr = utils.address_spliter(utils.bin_ip_address(utils.standard_mask[ipClass]["mask"]))    // 该数组是2进制形式的标准子网掩码
        temp_mask_bin_arr.splice(flag)


        var patcher = []
        for (let i = 0; i < required_bit; i++) {
            patcher.push("1")
        }
        
        while ((4 - temp_mask_bin_arr.length) * 8 !== patcher.length) {
            patcher.push("0")
        }

        patcher = utils.arr_vector_one_to_two(8, patcher).map(
            bit_arr => bit_arr.join("")
        )
        let mask_bin_arr = [...temp_mask_bin_arr, ...patcher]
        let mask = utils.address_joiner(mask_bin_arr.map(
            fragment => utils.bin2dec(fragment)
        ))
        
        let c = calc_the_num_of_subnets_and_its_network_address(ip, mask)[1]

        c = c.map(
            obj => {
                return {
                    mask,
                    serial_num: obj.serial_num,
                    the_scale_of_host_address: utils.calc_host_address(obj.cur_subnet_network_address, required_bit),
                }
            }
        )

        final_results[1] = c
        return final_results
    }
    // ========================== 路由4: 子网划分 ==============================
}
