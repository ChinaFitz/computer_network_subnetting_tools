import utils from '../index'

/*
    @author:  Fitz
    @name:  ipClassifier
    @description:  ip地址分类器
    @parms:  String ip地址, Bool ip地址的进制(false=>十进制    true=>二进制)
    @return:  String 分类(A-E)
*/
export default function (ip, binOrdec) {
    if (ip === '') return null

    // 判断ip类型只需要取出ip地址的第一段即可
    let ip_fragment = utils.address_spliter(ip)[0]
    // 如果是十进制, 需要先转换成二进制
    if (!binOrdec) {
        ip = utils.dec2bin(ip_fragment)
    }
    ip = utils.patchZero(ip)
    ip = ip.split('').slice(0, 4)

    let location_of_zero = ip.indexOf('0')
    switch (location_of_zero) {
        case 0:
            return 'A'
        case 1:
            return 'B'
        case 2:
            return 'C'
        case 3:
            return 'D'
        case -1:
            return 'E'
    }
}
