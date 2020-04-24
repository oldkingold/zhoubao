
const storage = {

    //设置值 time 毫秒
    set(key,value,time = 3600*24*7*1000){
        localStorage.setItem(key,value)
        localStorage.setItem(key+"_timeout",new Date().valueOf() + time)
    },
    //获取值
    get(key){
        var v = localStorage.getItem(key)
        var vt = localStorage.getItem(key+"_timeout")
        if(v && vt && vt > new Date().valueOf()) { 
            return v
        }else {
            console.log("值已过期")
            return ""
        }
    },
    //移除值
    remove(key){
        localStorage.removeItem(key)
        localStorage.removeItem(key+"_timeout")
    },

}

export default storage