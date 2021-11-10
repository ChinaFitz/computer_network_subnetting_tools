/*
    @author:  Fitz
    @name:  required_bits_for_subnets_from_host_nums
    @description:  根据ip类型和需要容纳的主机数计算出需要拿出多少bits来作为子网号位数
    @parms:  String ip地址类型    Number 所需子网数
    @return:  Number 子网号的bits数
*/

export default function (ipClass, require_host_nums) {
    // 未子网划分时, 主机号位数
    let origin_host_bits

    switch (ipClass) {
        case "A":
            origin_host_bits = 24
            break
        case "B":
            origin_host_bits = 16
            break
        case "C":
            origin_host_bits = 8
            break
       
    }
    // 满足需要容纳的主机数时, 主机号的位数为
    let host_bits = Math.ceil(Math.log2(require_host_nums))
    // 最终子网号位数为
    return origin_host_bits - host_bits
}
