/*
    @author:  Fitz
    @name:  host_number_in_bin
    @description:  计算主机号(2进制形式)
    @parms:  String ip地址(2进制)    String 子网掩码
    @return:  String 主机号(2进制)
*/

import spliter from '../pretty/spliter'
import dec2bin from '../conversion/dec2bin'
import joiner from '../pretty/joiner'
import AND_operation from '../AND_operation'
import patchZero from '../pretty/patchZero'

export default function (ip_in_bin, mask) {
    // 将子网掩码转换成二进制
    let mask_arr_in_bin = spliter(mask).map(fragment => patchZero(dec2bin(fragment)))

    // 将每一bit都翻转, 得到位翻转后的子网掩码数组
    let mask_after_reverse = mask_arr_in_bin.map(fragment => {
        let container = ''
        for (const bit of fragment) {
            bit = bit === '1' ? '0' : '1' // 翻转每一bit
            container += bit
        }
        return container
    })

    let mask_bit_reverse = joiner(mask_after_reverse)

    // 主机号 = ip && 翻转后的子网掩码
    return AND_operation(ip_in_bin, mask_bit_reverse)
}
