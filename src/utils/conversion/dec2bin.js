import judgeType from "../judgeType"
/*
    @author:  Fitz
    @name:  dec2bin
    @description:  十进制转二进制
    @parms:  String
    @return:  String
*/
export default function (dec_String) {
    let target
    let bin_string = ""
    let result = []

    if (judgeType(dec_String) === "Number") {
        target = dec_String
    }else {
        target = Number(dec_String)
    }

    
    while (target !== 0) {
        let remainder = target % 2
        target = parseInt(target / 2)
        result.unshift(remainder)
    }

    result.forEach(
        digit => {
            bin_string += digit
        }
    )

    return bin_string
}
