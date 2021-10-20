import utils from "../utils"

export default {
   
    // ======================= 路由1: 判断ip地址类型 ========================
    ipClass(state) {
        let {ip_address, binOrdec} = state
        if (ip_address === "") return
        return utils.ipClassifier(ip_address, binOrdec)
    },
    // ======================= 路由1: 判断ip地址类型 ========================

    
    
    
    
    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================

    // 1. ip地址的对立进制 2进制=>10进制, 反之...
    convert_ip_address(state) {
        let {ip_address, binOrdec} = state
        if (ip_address === "") return
        if (binOrdec) {
            // 十进制形式的结果
            return utils.dec_ip_address(ip_address)
        }else {
            // 二进制形式的结果
            return utils.bin_ip_address(ip_address)
        }
    },

    // 2. 子网号位数
    bits_of_subnet(state, getters) {
        let {subnet_mask} = state
        let {ipClass} = getters

        if (ipClass === undefined || subnet_mask === "") return
        return utils.bits_of_subnet(ipClass, subnet_mask)
    },


    // 可用子网数 (结果包含: 新版路由器 + 旧版路由器)
    num_of_subnet(state, getters) {
        let {bits_of_subnet} = getters
        if (bits_of_subnet === undefined) return
        return utils.num_of_subnet(bits_of_subnet)
    },
    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================
}