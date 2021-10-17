import utils from "../utils"

export default {
    ipClass(state) {
        let {ip_address, binOrdec} = state
        return utils.ipClassifier(ip_address, binOrdec)
    }
}