<template>
    <div class="user-qrcode-box" v-if="userQRCodeVisible" @click="userQRCodeCloseHandle">
        <div class="user-qrcode"  >
            <img :src="userQRCodeImg" alt="" style="display: block;" @click.stop="downloadImg(userQRCodeImg)">
            <div class="user-qrcode-download" @click.stop="downloadImg(userQRCodeImg)">点击/长按保存二维码</div>
            <div class="user-uid" @click.stop="">用户ID: {{user.uid}}</div>
        </div>
    </div>
</template>

<script>
import {userQRCheckCode} from "../../api/userIndex";
import {delSid, delUid} from "../../utils/cookieUtil";
let QRCode = require("qrcode");
export default {
    name: "QrCode",
    props:{
        user: {
            profile: {},
            sid: null
        },
    },
    data() {
        return {
            userQRCodeImg: null,
            userQRCodeVisible: false,
            groupQRCodeImg: process.env.VUE_APP_GROUP_QR_CODE_URL,
            groupQRCodeVisible: false,
            userQRCodeUrl:process.env.VUE_APP_USER_QR_CODE_URL,
            apiBaseUrl:process.env.VUE_APP_API_BASE,
        }
    },
    methods: {
        // 点击下载图片
        downloadImg(url) {
            // 生成一个a元素
            var a = document.createElement("a");
            // 创建一个单击事件
            var event = new MouseEvent("click");
            // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
            a.download = this.user.name;
            // 将生成的URL设置为a.href属性
            a.href = url;
            // 触发a的单击事件
            a.dispatchEvent(event);
        },
        userQRCodeClick() {
            console.log("我进入了userQRCodeClick")
            if (this.userQRCodeImg) {
                console.log("我进入了222")
                this.userQRCodeVisible = true;
                return false;
            }else {
                console.log("我进入了")
                userQRCheckCode(this.apiBaseUrl)
                    .then(response => {
                        console.log("我进入了核心")
                        if (response.code !== 0) {
                            this.requestErr(response.code, response.message);
                            return false;
                        }
                        var opts = {
                            errorCorrectionLevel: "H",
                            type: "image/jpeg",
                            rendererOpts: {
                                quality: 0.3
                            }
                        };
                        let qrCodeUrl = this.userQRCodeUrl + response.data;
                        console.log(qrCodeUrl);
                        // 生成二维码
                        QRCode.toDataURL(qrCodeUrl, opts, (error, url) => {
                            if (error) {
                                alert(error);
                                return false;
                            }
                            this.userQRCodeVisible = true;
                            console.log(this.userQRCodeVisible)
                            this.userQRCodeImg = url;
                            console.log(this.userQRCodeImg)
                        });
                    })

                    .catch(() => {
                    });
            }
        },
        // 关闭用户二维码
        userQRCodeCloseHandle() {
            this.userQRCodeVisible = false;
        },
        // 请求错误处理
        requestErr(code, message) {
            // 登录失效的
            if (code === 1) {
                delUid();
                delSid();
            }
            // 向父组件传递出去
            this.$emit("on-request-err", code, message);
        },
    }
}
</script>

<style scoped type="text/scss" lang="scss">
.user-qrcode-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;

    .user-qrcode {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
    }

    .user-qrcode-download {
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }

    .user-uid {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }
}

.group-qrcode-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;

    .group-qrcode {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
    }

    .group-qrcode-download {
        cursor: pointer;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }

    .group-id {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
    }
}
</style>
