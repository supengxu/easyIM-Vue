import { create } from "./himAxios";

//

// 游客 登录
export function userLoginByTourist(apiBaseUrl,uid) {
    return create(apiBaseUrl)({
        url: "/api/user/login/byTourist",
        method: "post",
        params:{
            uid
        }
    });
}

// QQ 登录
export function userLoginByQq(apiBaseUrl, code, redirect_uri) {
    return create(apiBaseUrl)({
        url: "/api/user/login/byQq",
        method: "post",
        params: {
            code,
            redirect_uri
        }
    });
}
