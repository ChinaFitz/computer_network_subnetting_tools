/*
    @author:  Fitz
    @name:  bin2dec
    @description:  二进制转十进制
    @parms:  String
    @return:  String
*/
export default function (bin_String) {
    let dec_String = Number(`0b${bin_String}`)
    return dec_String.toString()
}
