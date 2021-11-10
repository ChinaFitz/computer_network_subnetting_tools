/*
    @author:  Fitz
    @name:  patchZero
    @description:  二进制不足8位时, 在高位进行补0操作
    @parms:  String 需要补0的二进制数
    @return:  String 标准的8位二进制数
*/

export default function (bin) {
    let bin_arr = bin.split('')
    let len = bin_arr.length

    if (len === 8) {
        return bin
    }
    while (len < 8) {
        bin_arr.unshift('0')
        len = bin_arr.length
    }
    return bin_arr.join('')
}
