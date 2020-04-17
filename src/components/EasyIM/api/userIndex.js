import { create } from "./himAxios";

//

// 登录用户信息
export function userLoginInfo(apiBaseUrl, query) {
    return create(apiBaseUrl)({
        url: "/api/user/loginInfo",
        method: "get",
        params: query
    });
}
// 获取用户信息
export function userRead(apiBaseUrl, query) {
    return create(apiBaseUrl)({
        url: "/api/user/read",
        method: "get",
        params: query
    });
}
// 获取二维码验证信息
export function userQRCheckCode(apiBaseUrl, query) {
    return create(apiBaseUrl)({
        url: "/api/user/getQRCheckCode",
        method: "get",
        params: query
    });
}
