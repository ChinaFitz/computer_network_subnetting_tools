/*
    @author:  Fitz
    @name:  standard_host_number
    @description:  每一类型的IP地址的标准的主机号位数
    @parms:  String ip地址类型
    @return:  Number 主机号位数
*/

export default function (ipClass) {
    switch (ipClass) {
        case 'A':
            return 24
        case 'B':
            return 16
        case 'C':
            return 8
        default:
            return
    }
}
