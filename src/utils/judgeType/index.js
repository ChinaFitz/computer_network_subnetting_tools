/*
    @author:  Fitz
    @name:  judgeType
    @description:  判断对象的数据类型
    @parms:  Object
    @return:  String
*/
export default obj => {
    switch (Object.prototype.toString.call(obj)) {
        case '[object String]':
            return 'String'
        case '[object Number]':
            return 'Number'
        case '[object Boolean]':
            return 'Boolean'
        case '[object Null]':
            return 'Null'
        case '[object Undefined]':
            return 'Undefined'
        case '[object Array]':
            return 'Array'
        case '[object Object]':
            return 'Object'
        case '[object Function]':
            return 'Function'
        case '[object Symbol]':
            return 'Symbol'
        case '[object Set]':
            return 'Set'
        case '[object Map]':
            return 'Map'
    }
}
