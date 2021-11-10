export default {
    ip_address: '',
    subnet_mask: '',
    ip_address2: '', // <判断两ip是否属于同一个网络>路由专用
    subnet_mask2: '', // <判断两ip是否属于同一个网络>路由专用
    binOrdec: false, // false为10进制, true为2进制

    // ======================== 路由4(子网划分)  开始 ========================
    active: 0, // 子网划分的步骤条
    subnet_type: '0', // 子网划分的问题类型, 总共有4种
    required_subnets_num: 1, // 所需子网数
    hosts_num_in_each_subnet: '', // 每个子网需要能容纳的主机数
    // ======================== 路由4(子网划分)  结束 ========================
}
