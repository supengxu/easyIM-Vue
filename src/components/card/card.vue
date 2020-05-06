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
        name: "card"
    }
</script>

<style scoped>

</style>
