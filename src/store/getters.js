import utils from "../utils"
import { Message } from 'element-ui';

export default {
   
    // ======================= 路由1: 判断ip地址类型 ========================
    ipClass(state) {
        try {
            let {ip_address, subnet_mask, binOrdec} = state
            if (ip_address === "" || subnet_mask === "") return
            return utils.ipClassifier(ip_address, binOrdec)
        } catch (e) {
            Message({
                message: "请仔细检查ip地址和子网掩码是否有错误!",
                type: "error",
                duration: 1500,
            })
            return
        }
        
    },
    // ======================= 路由1: 判断ip地址类型 ========================

    
    
    
    
    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================

    // 1. ip地址的对立进制 2进制=>10进制, 反之...
    convert_ip_address(state) {
        try {
            let {ip_address, subnet_mask, binOrdec} = state
            if (ip_address === "" || subnet_mask === "") return
            if (binOrdec) {
                // 十进制形式的结果
                return utils.dec_ip_address(ip_address)
            }else {
                // 二进制形式的结果
                return utils.bin_ip_address(ip_address)
            }
        } catch (error) {
            Message({
                message: "请仔细检查ip地址和子网掩码是否有错误!",
                type: "error",
                duration: 1500,
            })
            return
        }
    },

    // 2. 子网号位数
    bits_of_subnet(state, getters) {
        try {
            let {ip_address, subnet_mask} = state
            let {ipClass} = getters

            if (ip_address === "" || ipClass === undefined || subnet_mask === "") return
            return utils.bits_of_subnet(ipClass, subnet_mask)
        } catch (error) {
            Message({
                message: "请仔细检查ip地址和子网掩码是否有错误!",
                type: "error",
                duration: 1500,
            })
            return
        }
    },


    // 3-4. 可用子网数 (结果包含: 新版路由器 + 旧版路由器)
    num_of_subnet(state, getters) {
        try {
            let {bits_of_subnet} = getters
            if (bits_of_subnet === undefined) return 0
            return utils.num_of_subnet(bits_of_subnet)
        } catch (error) {
            Message({
                message: "请仔细检查ip地址和子网掩码是否有错误!",
                type: "error",
                duration: 1500,
            })
            return
        }
    },


    // 5. 主机号位数
    bits_of_hosts(state, getters) {
        try {
            let {ip_address, subnet_mask} = state
            let {ipClass} = getters

            if (ip_address === "" || ipClass === undefined || subnet_mask === "") return

            return utils.bits_of_hosts(ipClass, subnet_mask)
        } catch (error) {
            Message({
                message: "请仔细检查ip地址和子网掩码是否有错误!",
                type: "error",
                duration: 1500,
            })
            return
        }
    },


    // ======================= 路由2: IP地址详情 (需要子网掩码) ========================
}