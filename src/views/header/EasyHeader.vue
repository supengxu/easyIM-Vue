<template>
    <header class="im-panel-header">
        <div class="im-header-user">
            <img class="im-header-user-avatar" :src="null|getDefaultAvatar" alt="头像">
            <div class="im-header-user-content">
                <div class="im-header-user-name" :title="user.name">
                    {{ user.name }}
                </div>
                <div class="im-header-user-remark" :title="user.remark">
                    {{ user.remark }}
                </div>
            </div>
        </div>

        <div class="im-header-setwin">
            <div class="im-header-out-login" @click="userOutClick" title="登出">
                <img src="../../assets/image/out-login.png" alt="登出" style="width: 100%; height: 100%;">
            </div>
            <div class="im-header-qrcode-box" @click="openUserQRCodeClick">
                <img src="../../assets/image/qrcode.png" alt="二维码" title="二维码"
                     style="width: 100%; height: 100%;">
            </div>
            <i class="im-icon im-icon-ring-open"></i>
            <i class="im-icon im-icon-panel-down" @click="isShowClick"></i>
        </div>
    </header>
</template>

<script>
    import {delSid, delUid} from "../../utils/cookieUtil";
    import QrCode from "../../components/QrCode/QrCode";

    export default {
        name: "easyHeader",
        components: {
            QrCode
        },
        props: {
            user: {
                profile: {},
                sid: null
            },
            confirmInit: {}
        },
        methods: {
            // 聊天界面的移动
            moveChatMsg(e) {
                // let ele = e.target;
                //算出鼠标相对元素的位置
                const _this = this;
                // let disX = e.clientX - ele.offsetLeft;
                // let disY = e.clientY - ele.offsetTop;
                let disX = e.clientX - this.$refs.imChatBox.offsetLeft;
                let disY = e.clientY - this.$refs.imChatBox.offsetTop;
                let disW = this.$refs.imChatBox.clientWidth;
                let disH = this.$refs.imChatBox.clientHeight;
                _this.isMove = true;
                document.onmousemove = (e) => {
                    // 鼠标按下并移动的事件
                    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    // 判断是否到了临界值, 因为用了 transform: translate(-50%, -50%); 所以要除 2
                    if ((top > (disH / 2)) && ((_this.clientHeight - top) > (disH / 2))) {
                        _this.chatMsgListPositionX = top + 'px';
                    }
                    if ((left > (disW / 2)) && ((_this.clientWidth - left) > (disW / 2))) {
                        _this.chatMsgListPositionY = left + 'px';
                    }
                };
                document.onmouseup = () => {
                    _this.isMove = false;
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            userOutClick() {
                this.confirmInit(
                    "提示",
                    "确定登出吗?",
                    () => {
                        // 确定了
                        this.userOut();
                    },
                    () => {
                        // 取消了登出现在不做任何行为
                    }
                );
            },
            // 登出
            userOut() {
                delUid();
                delSid();
                this.$emit("userLogout")
            },
            openUserQRCodeClick() {
                this.$emit("user-qr-code-click")
            },
            isShowClick() {
                // 传递到父组件
                this.$emit("on-is-show-click");
            },
        },
        filters: {
            getDefaultAvatar(avatar) {
                if (avatar === null || avatar === "" || avatar === "") {
                    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWAgMAAABBb5lxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURUxpcfDw8OPj4+Dg4FOJnTQAAAABdFJOUwBA5thmAAABUElEQVRYw+3Yy22EMBAGYDpLFUMOPlCCS3AVrmNLYJugBB9yy4UDKwHJhhj5Mdj/slYekn3+NPJ4PGNB87ICq2kQtV4x9l5ZZZVV9hvsjdpLnk30ufosG+6sy7HlrqjNsfGLkcqwYWMyw/TGXtNs21q8uYDN34zSbLKsT7LRMoUxmWQGY4NlXQmmLRM/yKwKi3qO6aLR/jJ7NFOB3RBR4iKZB5kq0Vlgny5Y1y8EjRpbBoHNty7DDDYGwaE6s4meneQrex5nn48tVZllI5fowdOmsGh90WiqVKbguWFVAEuP3TfwPQX7dJ9IbYrt3Ux0STBNBwPOY06woPwe0y4TR2wmbx0x4zPJs8VX3pk4bAyYG85hOmSCYxNFq2eYiZlkWKyc27mzhWEUs4ljfcRGjsmIDU+wrrJCzGBVYEuvInZjVFu/ASurrLL/y64N9sv6AwiKosleKgwtAAAAAElFTkSuQmCC";
                }
                return avatar;
            },
        }

    }
</script>

<style type="text/scss" lang="scss">
    //截断文本  元素必须是 block 或 inline-block 级。
    @mixin text-overflow() {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .im-panel-header {
        position: relative;
        background-color: rgba(230, 230, 230, 0.7);
        color: #fff;
        height: 80px;
        padding: 7px 10px;
        zoom: 1;
        font-size: 16px;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.06), 0 2px 0 0 rgba(0, 0, 0, 0.01);
        overflow: hidden;

        .im-header-user {
            padding-left: 8px;
            margin-top: 12px;
            display: flex;
            align-items: center;

            .im-header-user-avatar {
                flex: 0 0 auto;
                display: inline-block;
                width: 52px;
                height: 52px;
                border-radius: 50%;
            }

            .im-header-user-content {
                margin-left: 8px;
                overflow: hidden;
            }

            .im-header-user-name {
                margin-top: 1px;
                color: #000;
                @include text-overflow;
            }

            .im-header-user-remark {
                margin-top: 1px;
                font-size: 13px;
                color: rgba(0, 0, 0, 0.6);
                @include text-overflow;
            }
        }

        .im-header-out-login {
            display: inline-block;
            width: 22px;
            height: 22px;
            cursor: pointer;
        }

        .im-header-qrcode-box {
            display: inline-block;
            width: 22px;
            height: 22px;
            cursor: pointer;
        }

        .im-header-setwin {
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }
</style>
