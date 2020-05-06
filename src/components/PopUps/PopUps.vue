<template>
<div class="im-box-confirm-box" v-if="confirm.isShow" @click="confirm.isShow = false">
    <div class="im-box-confirm">
        <div class="im-box-confirm-header">
            <div class="im-box-confirm-title">{{confirm.title}}</div>
        </div>
        <div class="im-box-confirm-content">
            <div class="im-box-confirm-message">{{confirm.message}}</div>
        </div>
        <div class="im-box-confirm-buttons">
            <div class="im-box-confirm-button im-box-confirm-cancel" @click="confirm.cancelHandle()">
                {{confirm.cancelName}}
            </div>
            <div class="im-box-confirm-button im-box-confirm-ok" @click="confirm.okHandle()">
                {{confirm.okName}}
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "PopUps",
    props: {
        confirm: {}
    },
    methods: {

    }
}
</script>

<style type="text/scss" lang="scss">
.im-box-confirm-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    text-align: center;

    .im-box-confirm {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background-color: #fff;
        width: 85%;
        border-radius: 3px;
        font-size: 16px;
        overflow: hidden;
        backface-visibility: hidden;
        transition: .2s;
    }

    .im-box-confirm-header {
        padding: 15px 0 0;
    }

    .im-box-confirm-title {
        text-align: center;
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        font-weight: 700;
        color: #333;
    }

    .im-box-confirm-content {
        padding: 10px 20px 15px;
        border-bottom: 1px solid #ddd;
        min-height: 36px;
        position: relative;
    }

    .im-box-confirm-message {
        color: #999;
        margin: 0;
        text-align: center;
        line-height: 36px;
    }

    .im-box-confirm-buttons {
        display: flex;
        height: 40px;
        line-height: 40px;
    }

    .im-box-confirm-button {
        line-height: 35px;
        display: block;
        background-color: #fff;
        flex: 1;
        margin: 0;
        border: 0;
        cursor: pointer;
    }

    .im-box-confirm-cancel {
        width: 50%;
        border-right: 1px solid #ddd;
    }

    .im-box-confirm-ok {
        color: #26a2ff;
        width: 50%;
    }
}
</style>
