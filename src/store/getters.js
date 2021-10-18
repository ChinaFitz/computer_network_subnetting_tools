import utils from "../utils"

export default {
    // ======================= 路由1: 判断ip地址类型 ========================
    ipClass(state) {
        let {ip_address, binOrdec} = state
        return utils.ipClassifier(ip_address, binOrdec)
    },
    // ======================= 路由1: 判断ip地址类型 ========================

    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================
    
    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================
}