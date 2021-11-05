/*
    @author:  Fitz
    @name:  AND_operation
    @description:  ip地址(2进制) 与 子网掩码(2进制)进行 `与操作`
    @parms:  String ip地址(2进制)   String 子网掩码(2进制)
    @return:  String 网络号/网络地址(2进制)
*/

import spliter from "../pretty/spliter"
import joiner from "../pretty/joiner"

export default function(ip_bin, mask_bin) {
    let ip_bin_arr = spliter(ip_bin)
    let mask_bin_arr = spliter(mask_bin)
    let fin = []
    
    for (let i = 0, len = ip_bin_arr.length; i < len; i++) {
        let ip_bit_arr = []
        let mask_bit_arr = []
        let and_results = []

        for (const bit of ip_bin_arr[i]) {
            ip_bit_arr.push(bit)
        }
        for (const bit2 of mask_bin_arr[i]) {
            mask_bit_arr.push(bit2)
        }

        for (let j = 0, len = ip_bit_arr.length; j < len; j++) {
            let and_result = Number(ip_bit_arr[j]) && Number(mask_bit_arr[j])
            and_results.push(and_result)
        }

        fin.push(and_results)
    }

    fin = fin.map(bits_arr => bits_arr.join(''))

    return joiner(fin)
}
