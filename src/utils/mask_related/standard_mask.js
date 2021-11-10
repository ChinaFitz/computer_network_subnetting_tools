/*
    @author:  Fitz
    @name:  standard_mask
    @description:  每个类型IP对应的标准子网掩码, 其中flag用于标记子网号的开始的位置
*/
export default {
    A: {
        mask: '255.0.0.0',
        flag: 1,
    },
    B: {
        mask: '255.255.0.0',
        flag: 2,
    },
    C: {
        mask: '255.255.255.0',
        flag: 3,
    },
}
