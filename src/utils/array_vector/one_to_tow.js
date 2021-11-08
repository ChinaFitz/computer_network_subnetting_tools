/*
    @author:  Fitz
    @name:  one_to_two
    @description:  将一维数组转换为二维
    @parms:  Number 每个数组的元素个数   Array 源数组
    @return:  Array
*/

export default function(num, arr) {
    let result = []
    while (arr.length > 0) {
        let v = arr.splice(0, num)
        result.push(v)
    }
    return result
}
