import {create} from "./himAxios";

//

// 游客 登录
export function userLoginByTourist(apiBaseUrl, uid) {
    return create(apiBaseUrl)({
        url: "/api/user/login/byTourist",
        method: "post",
        params: {
            uid
        }
    });
}
export function register(apiBaseUrl,userName,pwd) {
    return create(apiBaseUrl)({
        url: "/api/user/login/register",
        method: "post",
        data: {
            userName,
            pwd
        }
    });
}

// 账号密码登陆
export function userLoginByPassword(apiBaseUrl, uid,pwd) {

    var x =  create(apiBaseUrl)({
        url: "/api/user/login/loginByPassword",
        method: "post",
        data: {
            uid,
            pwd,
        }
    });
    console.log(x);
    return x;
}
