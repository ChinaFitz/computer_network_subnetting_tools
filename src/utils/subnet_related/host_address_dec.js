/*
    @author:  Fitz
    @name:  host_address_dec
    @description:  计算主机地址范围(10进制)
    @parms:  String 网络地址(10进制)    Boolean ip地址的进制
    @return:  String 主机地址范围  例: "192.168.1.0 ~ 192.168.1.255"
*/

import ipClassifier from '../ip_related/ipClassifier'
import standard_mask from '../mask_related/standard_mask'
import spliter from '../pretty/spliter'
import joiner from '../pretty/joiner'

export default function (network_address_dec, binOrdec = false) {
    let ipClass = ipClassifier(network_address_dec, binOrdec)
    let flag = standard_mask[ipClass]['flag'] // 计算出主机地址能够变换的最开始位置
    const fin_flag = 3 // 主机地址能够变换的最终位置

    let network_address_dec_arr = spliter(network_address_dec)

    // 深拷贝两份数组
    let begin = [...network_address_dec_arr]
    // 处理主机地址的开头部分
    let change = +begin[flag]
    change++ // 0不能作为主机地址
    begin[flag] = change.toString()

    // 处理主机地址结束结束部分
    let end = [...begin]

    while (flag !== fin_flag + 1) {
        end[flag] = flag === 3 ? '254' : '255'
        flag++
    }

    let from = joiner(begin)
    let to = joiner(end)
    return {
        from,
        to,
    }
}
