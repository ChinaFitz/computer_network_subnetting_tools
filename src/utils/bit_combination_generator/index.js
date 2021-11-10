/*
    @author:  Fitz
    @name:  bit_combination_generator
    @description:  二进制位(bin)的组合生成器
    @parms:  Number 组合的bit位数
    @return:  Array
*/

/* 
    示例:
        input: 3

        output:
            [
                ['0', '0', '0'],
                ['0', '0', '1'],
                ['0', '1', '0'],
                ['0', '1', '1'],
                ['1', '0', '0'],
                ['1', '0', '1'],
                ['1', '1', '0'],
                ['1', '1', '1']
            ]

*/

// 该算法下: 极限支持位数n为23, 平均计算时间: 6~8s   体验较好的计算位数n为20

export default function (n) {
    var result = []
    function bit_combination_generator(n, arr = [], i = 0) {
        function printTheArray(arr, n) {
            var single_result = []
            for (let i = 0; i < n; i++) {
                single_result.push(arr[i].toString())
            }
            return single_result
        }

        if (i === n) {
            let single_result = printTheArray(arr, n)
            result.push(single_result)
            return
        }

        arr[i] = 0
        bit_combination_generator(n, arr, i + 1)

        arr[i] = 1
        bit_combination_generator(n, arr, i + 1)
    }
    bit_combination_generator(n)
    return result
}
