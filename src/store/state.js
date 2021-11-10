export default {
    // =============== 判断IP地址类型 ==============
    
    // ip_address: "192.168.10.0",
    ip_address: "202.207.175.0",
    subnet_mask: "",
    ip_address2: "", // <判断两ip是否属于同一个网络>路由专用
    subnet_mask2: "", // <判断两ip是否属于同一个网络>路由专用
    binOrdec: false,    // false为10进制, true为2进制
    
    
    // ======================== 路由4(子网划分)  开始 ========================
    active: 0,  // 子网划分的步骤条
    // subnet_type: "0",  // 子网划分的问题类型, 总共有4种
    subnet_type: "4",  // 子网划分的问题类型, 总共有4种
    required_subnets_num: 1,    // 所需子网数
    // hosts_num_in_each_subnet: "",  // 每个子网需要能容纳的主机数
    // hosts_num_in_each_subnet: "[100, 50, 50]",  // 每个子网需要能容纳的主机数
    hosts_num_in_each_subnet: "[38,46,56]",  // 每个子网需要能容纳的主机数
    // ======================== 路由4(子网划分)  结束 ========================

    // =============== 判断IP地址类型 ==============
}
