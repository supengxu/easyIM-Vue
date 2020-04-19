<template>
    <div class="user-login-box" ref="login">
        <div class="user-login-list">
            <a class="user-login-button" href="javascript:" @click="touristLogin(12)">
                <img src="../../assets/image/user-1-default.png" alt="游客登录">
                <span>男游客</span>
            </a>
            <a class="user-login-button" href="javascript:" @click="touristLogin(13)">
                <img src="../../assets/image/user-1-default.png" alt="游客登录">
                <span>女游客</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {userLoginByQq, userLoginByTourist} from "../../api/userLogin";
    import {setSid,setUid,delSid,delUid} from "../../utils/cookieUtil"

    export default {
        name: "login",
        methods:{
            // 游客登录
            touristLogin(uid) {
                // 先退出
                this.userOut();
                userLoginByTourist(process.env.VUE_APP_API_BASE,uid)
                    .then(response => {
                        if (response.code !== 0) {
                            this.requestErr(response.code, response.message);
                            return false;
                        }
                        let data = response.data;
                        // 设置登录信息
                        setUid(data.uid);
                        setSid(data.sid);
                        // 登录成功, 重新初始化
                        this.$emit("login-success");
                    })
                    .catch(() => {});
            },
            // QQ 登录
            qqLogin(code, redirectUri) {
                this.userOut();
                userLoginByQq(this.apiBaseUrl, code, redirectUri)
                    .then(response => {
                        if (response.code !== 0) {
                            this.requestErr(response.code, response.message);
                            return false;
                        }
                        let data = response.data;
                        // 设置登录信息
                        setUid(data.uid);
                        setSid(data.sid);
                        // 登录成功, 重新初始化
                        this.init();
                    })
                    .catch(() => {});
            },
            userOut() {
                delUid();
                delSid();
                this.$emit("user-logout")

            },
            wsOut() {
                this.webSocketWarningText = "异地登录请重新登录";
                // 修改重连状态
                this.webSocketIsReconnect = false;
                if (this.webSocket) {
                    console.log("关闭websocket");
                    // 关闭 websocket
                    this.webSocket.close();
                }
            },
        }
    }
</script>

<style scoped type="text/scss" lang="scss">
.user-login-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 999;

    .user-login-list {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        display: flex;
    }

    .user-login-button:first-child {
        margin-left: 0;
    }

    .user-login-button {
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
        text-align: center;

        img {
            width: 50px;
            height: 50px;
        }

        span {
            display: block;
            color: #ffffff;
        }

        &:hover {
            opacity: 0.7;
        }
    }
}
</style>
