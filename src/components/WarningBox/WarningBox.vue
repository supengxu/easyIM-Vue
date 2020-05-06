<template>
    <div class="im-user-warning-box">
        <div class="im-chat-warning" style="top: 0;" v-html="webSocketWarningText"/>
    </div>
</template>

<script>
    export default {
        name: "WarningBox",
        data(){
            return {
                webSocketWarningText:
                    "连接断开,正在尝试重连 <i class='dotting'></i>",
            }
        }
    }
</script>

<style scoped>
    .im-user-warning-box {
        height: 25px;
        background-color: rgba(0, 0, 0, 0);
    }
    .im-chat-warning {
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        height: 25px;
        line-height: 25px;
        color: #e6a26d;
        font-size: 12px;
        /*background-color: #fdf6eb;*/
        background-color: rgba(253, 246, 235, 0.9);
        text-align: center;
        z-index: 3;
        opacity: 0.8;
    }
</style>
