/*
    @author:  Fitz
    @name:  bits_of_subnet
    @description:  根据ip地址的类型和子网掩码计算出子网号位数
    @parms:  String ip地址类型,  String 子网掩码
    @return:  Number 子网号位数
*/

import standard_mask from "../mask_related/standard_mask";
import spliter from "../pretty/spliter";
import dec2bin from "../conversion/dec2bin";
import patchZero from "../pretty/patchZero";

export default function (ipClass, mask) {
    const flag = standard_mask[ipClass]["flag"]     // 子网号开始的标记
    let counter = 0

    // 二进制的子网掩码数组
    let mask_dec_arr = spliter(mask).map(
        fragment => {
            let need_to_patch = dec2bin(fragment)
            return patchZero(need_to_patch)
        }
    )

    // 只取子网掩码会出现片段
    mask_dec_arr = mask_dec_arr.slice(flag, mask_dec_arr.length)
    
    mask_dec_arr.forEach(
        fragment => {
            let bit_arr = fragment.split("")    // 每个子网掩码片段被分解成 8bit 组成的数组
            bit_arr.filter(
                bit=> {
                    if (bit === "1") counter++
                }
            )
        }
    )
    return counter
}