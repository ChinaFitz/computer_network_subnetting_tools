import bin2dec from './conversion/bin2dec'
import dec2bin from './conversion/dec2bin'
import address_spliter from './pretty/spliter'
import address_joiner from './pretty/joiner'
import ipClassifier from './ip_related/ipClassifier'
import judgeType from './judgeType'
import patchZero from './pretty/patchZero'
import bin_ip_address from './ip_related/bin_ip_address'
import dec_ip_address from './ip_related/dec_ip_address'
import standard_mask from './mask_related/standard_mask'
import bits_of_subnet from './subnet_related/bits_of_subnet'
import num_of_subnet from './subnet_related/num_of_subnet'
import standard_host_number from './ip_related/standard_host_number'
import bits_of_hosts from './subnet_related/bits_of_hosts'
import host_number_in_bin from './subnet_related/host_number_in_bin'
import AND_operation from './AND_operation'
import host_address_dec from './subnet_related/host_address_dec'
import throttle from './throttle'
import bit_combination_generator from './bit_combination_generator'
import arr_vector_one_to_two from './array_vector/one_to_two'
import calc_host_address from './the_scale_of_host_address'
import required_bits_for_subnets_from_host_nums from './subnet_related/required_bits_for_subnets'
import array_remove_duplicates from './pretty/array_remove_duplicates'

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
    AND_operation,
    host_address_dec,
    throttle,
    bit_combination_generator,
    arr_vector_one_to_two,
    calc_host_address,
    required_bits_for_subnets_from_host_nums,
    array_remove_duplicates,
}
