/*
    @author:  Fitz
    @name:  calc_host_address
    @description:  根据(网络)ip地址和子网号位数计算出主机地址范围
    @parms:  String 十进制(网络)ip地址    Number 子网号位数
    @return:  String 主机地址范围  示例: "192.168.1.0 ~ 192.168.1.255"
*/

import bin_ip_address from '../ip_related/bin_ip_address'
import ipClassifier from '../ip_related/ipClassifier'
import spliter from '../pretty/spliter'
import standard_mask from '../mask_related/standard_mask'
import dec_ip_address from '../ip_related/dec_ip_address'
import joiner from '../pretty/joiner'

export default function (ip, required_bits_for_subnet) {
    let ipClass = ipClassifier(ip)
    let bin_ip_address_arr = spliter(bin_ip_address(ip))
    const flag = standard_mask[ipClass]['flag']

    for (let i = flag, len = bin_ip_address_arr.length; i < len; i++) {
        // 当不是C类地址时意味着至少改变两段
        if (flag < 3 && i === len - 1) {
            // 最后一段要全为1
            bin_ip_address_arr[i] = '11111111'
        } else {
            let cur_fragment = bin_ip_address_arr[i]
            let cur_fragment_arr = cur_fragment.split('')
            cur_fragment_arr = cur_fragment_arr.map((bit, index) => {
                if (index >= required_bits_for_subnet) {
                    bit = '1'
                }
                return bit
            })
            bin_ip_address_arr[i] = cur_fragment_arr.join('')
        }
    }

    // 主机地址的结束范围
    let host_address_end = dec_ip_address(joiner(bin_ip_address_arr))

    return `${ip} ~ ${host_address_end}`
}
