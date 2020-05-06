<template>
    <div class="user-login-box" ref="login">
        <div class="user-login-list" v-show="isLoginByPassword">
            <a class="user-login-button" href="javascript:" @click="touristLogin(12)">
                <img src="../../assets/image/user-1-default.png" alt="游客登录">
                <span>男游客</span>
            </a>
            <a class="user-login-button" href="javascript:" @click="touristLogin(13)">
                <img src="../../assets/image/user-1-default.png" alt="游客登录">
                <span>女游客</span>
            </a>
            <a class="user-login-button" href="javascript:" @click="showLoginByPassword">
                <img src="../../assets/image/user-1-default.png" alt="游客登录">
                <span>账号密码登陆</span>
            </a>
        </div >
        <div class="login_box" v-show="!isLoginByPassword">

            <div class="login_panel">
                <button type="button" @click="showLoginByPassword" ><</button>
                <div class="login_title">
                    <p>输入账号进行安全登录</p>
                </div>
                <input  v-model="account" type="text"  placeholder="请输入账号">
                <input v-model="password" type="password" placeholder="请输入密码">
                <input class="bt" @click="loginByPassword" type="submit" value="登录">
                <input class="back" @click="registerAccount" type="submit" value="注册" >
            </div>
        </div>
    </div>
</template>

<script>
    import {register, userLoginByPassword, userLoginByTourist} from "../../api/userLogin";
    import {setSid,setUid,delSid,delUid} from "../../utils/cookieUtil"
    import md5 from 'js-md5'
    export default {
        name: "login",
        data(){
            return {
                isLoginByPassword: true,
                password: '',
                account:'',
            }
        },
        methods:{
            showLoginByPassword(){
                this.isLoginByPassword = !this.isLoginByPassword
            },
            // 账号密码登陆
            loginByPassword(){
                if (this.account!=null||this.password!=null){
                    this.password = md5(md5(this.password))
                }



                userLoginByPassword(process.env.VUE_APP_API_BASE,parseInt(this.account),this.password)
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
                    this.$emit("login-success");})
                    .catch(()=>{})
            },
            registerAccount(){
                if (this.account!=null||this.password!=null){
                    this.password = md5(md5(this.password))
                }

                register(process.env.VUE_APP_API_BASE,this.account,this.password)
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
                        this.$emit("login-success");})
                    .catch(()=>{})
            },
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
/*登录框*/
.login_box {
    z-index: 99;
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    margin-left: -90px;
    margin-top: -130px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 10px #999;
}
/*登录*/
.login_panel {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 270px;
    height: 540px;
    padding: 0 55px;
    transform: translate(-50%, -50%);
    /* background: #fff; */
    border-radius: 6px;
    overflow: hidden;
    .login_title,span {
        text-align: center;
        p {
            margin-top: 15px;
            color: #999999;
            font-size: 15px;
        }
    }
    label {
        display: block;
        font-size: 12px;
        line-height: 18px;
        color: #a9a8a5;
        margin-top: 10px;
    }
    input {
        display: inline;
        height: 35px;
        margin-top: 15px;
        padding: 0 5%;
        line-height: 42px;
        font-size: 14px;
        color: #333333;
        border-radius: 4px;
        outline: 0;
        border: 0;
        width: 90%;
        background: #d7e8fc;
    }
    .bt {
        margin-top: 35px;
        width: 100%;
        color: #ffffff;
        background: #379df6;
        cursor: pointer;
        :hover {
            background-color: #2f86f6;
        }
    }
    .back {
        margin-top: 10px;
        width: 100%;
        color: #ffffff;
        background: #379df6;
        cursor: pointer;
        :hover {
            background-color: #2f86f6;
        }
    }

}
</style>
