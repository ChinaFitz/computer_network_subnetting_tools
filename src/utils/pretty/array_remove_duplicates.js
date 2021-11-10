/*
    @author:  Fitz
    @name:  array_remove_duplicates
    @description:  数组去重
    @parms:  Array
    @return:  Array 去重后的数组
*/

export default function (arr) {
    return new Array(...new Set(arr))
}
