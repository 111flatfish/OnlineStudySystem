import axios from "axios"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/json';
// 每次请求允许携带cookie信息
// instance.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    let token = window.localStorage.getItem("token");
    window.console.log(token);
    if(token){
        // config.headers.Authorization = token;
        config.headers.token = token;
    }
    return config;
},function (err) {
        return Promise.reject(err);
})

export default axios;