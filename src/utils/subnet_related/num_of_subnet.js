/*
    @author:  Fitz
    @name:  num_of_subnet
    @description:  根据子网号位数分别返回旧版可用子网数和新版下的可用子网数
    @parms:  Number 子网号位数
    @return:  Object 旧版可用子网数 和 新版下的可用子网数
*/

export default function(bits_of_subnet) {
    if (bits_of_subnet < 1) {
        return {
            old_router: 0,
            new_router: 0,
        }
    } else {
        return {
            old_router: 2 ** bits_of_subnet - 2,
            new_router: 2 ** bits_of_subnet,
        }
    }
}
