import utils from "../index"

/*
    @author:  Fitz
    @name:  bin_ip_address
    @description:  将二进制的ip地址转换为十进制
    @parms:  String 二进制ip地址
    @return:  String 十进制ip地址
*/
export default function (bin_ip) {
    let dec_ip_address_array = utils.address_spliter(bin_ip).map(
        fragment => {
            return utils.bin2dec(fragment)
        }
    )
    let dec_ip_address = utils.address_joiner(dec_ip_address_array)
    return dec_ip_address
}