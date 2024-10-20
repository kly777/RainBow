// 导入axios库
import axios from "axios";
import axiosRetry from 'axios-retry';
// 导入vue的h函数和element-plus的ElNotification组件
import {h} from "vue";
import {ElNotification} from "element-plus";

// 创建axios实例
const req = axios.create({
    baseURL: "https://brainbow.top/api/", // 设置请求的基础URL
    timeout: 7000, // 设置请求超时时间
    withCredentials: true, // 请求是否携带cookie
});


// 请求拦截器
req.interceptors.request.use(
    (config) => {
        // 从localStorage中获取token
        const token = localStorage.getItem("token");
        if (token) {
            // 如果有token，则将token添加到请求头中
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("请求拦截器错误", error);
        return Promise.reject(error);
    }
);

// 响应拦截器
req.interceptors.response.use(
    (response) => {
        // 处理成功的响应
        return response;
    },
    (error) => {
        let message = "异常问题，请联系管理员！";
        const status = error.response?.status;
        if (status) {
            const statusMessages: Record<number, string> = {
                302: "接口重定向了！",
                400: "参数不正确！",
                401: "您未登录，或者登录已经超时，请先登录！",
                403: "您没有权限操作！",
                404: `请求地址出错: ${error.response.config.url}`,
                408: "请求超时！",
                409: "系统已存在相同数据！",
                500: "服务器内部错误！",
                501: "服务未实现！",
                502: "网关错误！",
                503: "服务不可用！",
                504: "服务暂时无法访问，请稍后再试！",
                505: "HTTP 版本不受支持！"
            };
            message = statusMessages[status] || message;
        }

        ElNotification({
            title: "error",
            message: h("i", {style: "color: red"}, message),
        });

        console.error("响应拦截器错误", error);

        return Promise.reject(message);
    }
);


axiosRetry(req, {
    retries: 3, // 设置重试次数
    retryDelay: (retryCount) => {
        return retryCount * 1000; // 重试间隔函数，返回重试间隔毫秒数
    },
});
// 导出axios实例
export default req;