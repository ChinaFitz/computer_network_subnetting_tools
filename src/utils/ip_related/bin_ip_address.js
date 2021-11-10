import utils from '../index'

/*
    @author:  Fitz
    @name:  bin_ip_address
    @description:  将十进制的ip地址转换为二进制, 也可用于子网掩码
    @parms:  String 十进制ip地址
    @return:  String 二进制ip地址
*/
export default function (dec_ip) {
    let bin_ip_address_array = utils.address_spliter(dec_ip).map(fragment => {
        let need_patchZero = utils.dec2bin(fragment)
        return utils.patchZero(need_patchZero)
    })
    let bin_ip_address = utils.address_joiner(bin_ip_address_array)
    return bin_ip_address
}
