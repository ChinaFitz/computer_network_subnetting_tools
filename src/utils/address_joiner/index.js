/*
    @author:  Fitz
    @name:  address_joiner
    @description:  将ip地址或子网掩码的数组形式还原成点分法的字符串形式
    @parms:  Array ip地址或子网掩码的数组形式  例子: ["192", "168", "1", "1"]
    @return:  String ip地址或子网掩码点分法的字符串形式 例子: 192.168.1.1
*/

export default function (origin) {
    return origin.join(".")
}