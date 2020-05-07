import Cookies from "js-cookie";

export function setUid(value) {
    Cookies.set("UID", value, {
        expires: 365,
        path: "/"
    });
}

export function getUid() {
    let uid = Cookies.get("UID", {
        path: "/"
    });
    if (isEmpty(uid)) {
        return null;
    }
    return uid;
}

export function delUid() {
    Cookies.remove("UID", {
        path: "/"
    });
}

export function setSid(value) {
    Cookies.set("SID", value, {
        expires: 365,
        path: "/"
    });
}

export function getSid() {
    let sid = Cookies.get("SID", {
        path: "/"
    });
    if (isEmpty(sid)) {
        return null;
    }
    return sid;
}

export function delSid() {
    Cookies.remove("SID", {
        path: "/"
    });
}
// 判断字符是否为空的方法
function  isEmpty(obj) {
    return (!obj || typeof obj === "undefined" || obj === null || obj === "");
}

export function  setUserCheckCode(value) {
    Cookies.set("USER_CHECK_CODE", value, {
        expires: 1,
        path: "/"
    });
}
export function  getUserCheckCode() {
    return Cookies.get("USER_CHECK_CODE", {
        path: "/"
    });
}
export function  delUserCheckCode() {
    return Cookies.remove("USER_CHECK_CODE", {
        path: "/"
    });
}
export function  setGroupCheckCode(value) {
    Cookies.set("GROUP_CHECK_CODE", value, {
        expires: 1,
        path: "/"
    });
}
export function  getGroupCheckCode() {
    return Cookies.get("GROUP_CHECK_CODE", {
        path: "/"
    });
}
export function  delGroupCheckCode() {
    return Cookies.remove("GROUP_CHECK_CODE", {
        path: "/"
    });
}
