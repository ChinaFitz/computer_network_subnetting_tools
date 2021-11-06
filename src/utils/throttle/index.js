/*
    @author:  Fitz
    @name:  throttle
    @description:  节流函数
    @parms:  Function 回调函数  Number 间隔时间    Object 存放定时器的对象(由于vuex中this为undefined, 需要存到其他位置)
    @return:  Function
*/


export default function(cb, time, timer_saver, ...args) {
    let isLocked = false
    let args_for_cb = Array.prototype.slice.call(arguments, 3)
    return function() {
        if (!isLocked) {
            let result = cb.apply(this, args_for_cb)
            isLocked = true
            timer_saver = setTimeout(() => {
                isLocked = false
                clearTimeout(timer_saver)
            }, time)
            return result
        }
        // console.dir(Function.prototype)
    }
}
