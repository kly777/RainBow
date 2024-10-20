// src/stores/user.js
import {defineStore} from "pinia";
import req from "../../utils/req";
import {h, ref} from "vue";
import {ElNotification} from "element-plus";

export const useAuthStore = defineStore("auth", () => {
    const isLogin = ref(Boolean(localStorage.getItem("is_login")));

    async function login(userInfo: any) {
        await req
            .post("/login/", userInfo)
            .then((response) => {
                if (response.status === 200) {
                    ElNotification({
                        title: "成功",
                        message: h("i", {style: "color: teal"}, "登录成功"),
                    });
                    isLogin.value = true;
                    return response.data;
                } else {
                    return Promise.reject("登录异常!");
                }
            })
            .then(function (r) {
                if (r.status) {
                    localStorage.setItem("is_login", "true");
                    localStorage.setItem("token", r.token);
                    localStorage.setItem("user_id", r.user_id);
                    localStorage.setItem("user_name", r.user_name);
                } else {
                    alert("登录失败");
                }
            })
            .catch((error) => alert(error));
    }

    async function logout() {
        localStorage.removeItem("is_login");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        await req.post("/logout/")
            .then((response) => {
                if (response.status === 200) {
                    ElNotification({
                        title: "成功",
                        message: h("i", {style: "color: teal"}, "退出成功"),
                    });
                    isLogin.value = false;
                    return response.data;
                } else {
                    return Promise.reject("登出异常!");
                }
            });
    }

    return {
        login,
        logout,
        isLogin,
    };
});
