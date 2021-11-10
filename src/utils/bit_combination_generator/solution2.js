/*
    @author:  Fitz
    @name:  bit_combination_generator
    @description:  二进制位(bin)的组合生成器
    @parms:  Number 组合的bit位数
    @return:  Array
*/

// 这种解法更容易理解

export default function (bits) {
    let result = []

    if (bits === 1) {
        result.push(['0'], ['1'])
        return result
    } else {
        if (bits > 1) {
            let r = gen(--bits)
            for (let i = 0, len = r.length; i < len; i++) {
                const ele = r[i]
                result.push(['0', ...ele], ['1', ...ele])
            }
        }
        return result
    }
}
