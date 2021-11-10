/*
    @author:  Fitz
    @name:  bits_of_hosts
    @description:  计算主机号的位数
    @parms:  String ip地址类型    String 子网掩码
    @return:  Number 主机号位数
*/

import standard_host_number from '../ip_related/standard_host_number'
import bits_of_subnet from './bits_of_subnet'

export default function (ipClass, mask) {
    let num1 = bits_of_subnet(ipClass, mask)
    let num2 = standard_host_number(ipClass)

    return num2 - num1
}
