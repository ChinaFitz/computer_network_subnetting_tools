import bin2dec from "./conversion/bin2dec"
import dec2bin from "./conversion/dec2bin"
import address_spliter from "./pretty/spliter"
import address_joiner from "./pretty/joiner"
import ipClassifier from "./ip_related/ipClassifier"
import judgeType from "./judgeType"
import patchZero from "./pretty/patchZero"
import bin_ip_address from "./ip_related/bin_ip_address"
import dec_ip_address from "./ip_related/dec_ip_address"
import standard_mask from "./mask_related/standard_mask"
import bits_of_subnet from "./subnet_related/bits_of_subnet"
import num_of_subnet from "./subnet_related/num_of_subnet"
import standard_host_number from "./ip_related/standard_host_number"
import bits_of_hosts from "./subnet_related/bits_of_hosts"
import host_number_in_bin from "./subnet_related/host_number_in_bin"

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
    standard_mask,
    bits_of_subnet,
    num_of_subnet,
    standard_host_number,
    bits_of_hosts,
    host_number_in_bin,
}
