/*
    @author:  Fitz
    @name:  host_number_in_bin
    @description:  计算主机号(2进制形式)
    @parms:  String ip地址(2进制)    String 子网掩码
    @return:  String 主机号(2进制)
*/

import spliter from "../pretty/spliter"
import dec2bin from "../conversion/dec2bin"
import joiner from "../pretty/joiner"

export default function(ip_in_bin, mask) {

    let host_number_result_arr = []

    // 将子网掩码转换成二进制
    let mask_arr_in_bin = spliter(mask).map(
        fragment => dec2bin(fragment)
    )
    // 将每一bit都翻转
    let mask_after_reverse = mask_arr_in_bin.map(
        fragment => {
            let container = ""
            for (const bit of fragment) {
                bit = bit === "1"? "0" : "1"  // 翻转每一bit
                container += bit
            }
            return container
        }
    )


    ip_in_bin = spliter(ip_in_bin)
    for (let i = 0, len = ip_in_bin.length; i < len; i++) {
        let ip_bit_arr = []
        let mask_bit_arr = []
        let and_results = []

        for (const bit of ip_in_bin[i]) {
            ip_bit_arr.push(bit)
        }
        for (const bit2 of mask_after_reverse[i]) {
            mask_bit_arr.push(bit2)
        }

        for (let j = 0, len = ip_bit_arr.length; j < len; j++) {
            let and_result = Number(ip_bit_arr[j]) && Number(mask_bit_arr[j])
            and_results.push(and_result)
        }
        
        host_number_result_arr.push(and_results)
    }
    
    
    host_number_result_arr = host_number_result_arr.map(
        fragment_arr => fragment_arr.join("")
    )
    let host_number_result = joiner(host_number_result_arr)
    
    return host_number_result
}
