import bin2dec from "./conversion/bin2dec"
import dec2bin from "./conversion/dec2bin"
import address_spliter from "./pretty/spliter"
import address_joiner from "./pretty/joiner"
import ipClassifier from "./ip_related/ipClassifier"
import judgeType from "./judgeType"
import patchZero from "./pretty/patchZero"
import bin_ip_address from "./ip_related/bin_ip_address"
import dec_ip_address from "./ip_related/dec_ip_address"

export default {
    bin2dec,
    dec2bin,
    judgeType,
    address_spliter,
    ipClassifier,
    patchZero,
    bin_ip_address,
    address_joiner,
    dec_ip_address,
}