/*
    @author:  Fitz
    @name:  address_spliter
    @description:  将ip地址或子网掩码通过点分的方法, 分解成包含4个元素的数组
    @parms:  String ip地址或子网掩码    例子: 192.168.1.1
    @return:  Array ip地址或子网掩码被分解后的数组  例子: ["192", "168", "1", "1"]
*/

export default function (origin) {
    return origin.split(".")
}