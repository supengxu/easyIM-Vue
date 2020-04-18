<template>

    <div class="im-box"
         ref="imBox">
        <div class="im-box-move" @mousedown="moveImBox"></div>

        <div class="im-box-confirm-box" v-if="confirm.isShow" @click="confirm.isShow = false">
            <div class="im-box-confirm">
                <div class="im-box-confirm-header">
                    <div class="im-box-confirm-title">{{confirm.title}}</div>
                </div>
                <div class="im-box-confirm-content">
                    <div class="im-box-confirm-message">{{confirm.message}}</div>
                </div>
                <div class="im-box-confirm-buttons">
                    <div class="im-box-confirm-button im-box-confirm-cancel" @click="confirm.cancelHandle()">{{confirm.cancelName}}</div>
                    <div class="im-box-confirm-button im-box-confirm-ok" @click="confirm.okHandle()">{{confirm.okName}}</div>
                </div>
            </div>
        </div>

        <div class="user-qrcode-box" v-if="userQRCodeVisible" @click="userQRCodeCloseHandle">
            <div class="user-qrcode">
                <img :src="userQRCodeImg" alt="" style="display: block;" @click.stop="downloadImg(userQRCodeImg)">
                <div class="user-qrcode-download" @click.stop="downloadImg(userQRCodeImg)">点击/长按保存二维码</div>
                <div class="user-uid" @click.stop="">用户ID: {{user.uid}}</div>
            </div>
        </div>
        <login v-if="!user.uid" @click="isShowClick" v-on:login-success="init" v-on:user-logout="userLogout"/>

        <header class="im-panel-header">
            <div class="im-header-user">
                <img class="im-header-user-avatar" :src="user.avatar | getDefaultAvatar" alt="头像">
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
                <div class="im-header-qrcode-box" @click="userQRCodeClick">
                    <img src="../../assets/image/qrcode.png" alt="二维码" title="二维码" style="width: 100%; height: 100%;">
                </div>
                <i class="im-icon im-icon-ring-open"></i>
                <i class="im-icon im-icon-panel-down" @click="isShowClick"></i>
            </div>
        </header>

        <nav class="im-tab-nav">
            <ul class="im-tab">
                <li v-for="item in imTabList"
                    :key="item.index"
                    class="im-tab-item"
                    :class="{'im-tab-item-selected': item.isSelected}"
                    @click="imTabSelectedHandle(item.index)">
                    {{ item.title }}
                    <div class="im-tab-badge"
                         v-if="item.index === 1 && user.profile.friendAskCount > 0">
                        new
                    </div>
                </li>
            </ul>
        </nav>

        <!-- 历史消息-->
        <main class="im-panel-body" v-if="imTabSelectedIndex === 0">
            <div class="im-user-warning-box" v-if="!webSocketIsOpen">
                <div class="im-chat-warning" style="top: 0;" v-html="webSocketWarningText"></div>
            </div>
            <div class="im-chat-reconnect" v-if="!webSocketIsReconnect">
                <a href="javascript:" @click="init">重新连接</a>
            </div>
            <div class="im-panel-searchbar">
                <div class="im-panel-searchbar-inner">
                    <img src="../../assets/image/search.png" class="im-panel-search">
                    <input type="search" placeholder="搜索" class="im-panel-searchbar-core">
                </div>
            </div>

            <div class="im-list-empty" v-if="Object.keys(historyMsgList).length === 0">
                暂无数据
            </div>

            <ul class="im-panel-user-list">

                <template v-for="(item) in sortHistoryMsgList">
                    <li @click="handleChat(item)" :key="item.type + item.id">
                        <div class="im-user-left">
                            <img :src="item.avatar | getDefaultAvatar" alt="" class="im-user-avatar">
                        </div>
                        <div class="im-user-right">
                            <div class="im-user-info">
                                <span class="im-user-name" :title="item.name">
                                    {{ item.name }}
                                </span>
                                <span class="im-user-remark" :title="item.lastMsgContent">
                                    {{ item.lastMsgContent }}
                                </span>
                            </div>
                        </div>
                        <div class="im-panel-badge" v-if="item.unMsgCount > 0">{{ item.unMsgCount > 99 ? '99+' : item.unMsgCount }}</div>
                    </li>
                </template>
            </ul>

        </main>

        <!-- 朋友-->
        <main class="im-panel-body"  v-if="imTabSelectedIndex === 1">

            <div class="im-new-friend" @click="newFriendClick">
                <span>{{ newFriendVisible ? '返回' : '新的朋友'}}</span>
                <span style="color: red;" v-if="!newFriendVisible && user.profile.friendAskCount > 0">
                        {{user.profile.friendAskCount}}
                    </span>
            </div>

            <div class="im-list-empty"
                 v-if="(newFriendVisible && newFriendList.length === 0)
                            || (!newFriendVisible && Object.keys(userFriendList).length === 0)">
                暂无数据
            </div>

            <ul class="im-panel-user-list" v-if="!newFriendVisible">

                <template v-for="(item) in userFriendList">
                    <li @click="friendClick(item)" :key="item.friendUid">
                        <div class="im-user-left">
                            <img :src="item.user.avatar | getDefaultAvatar" alt="" class="im-user-avatar">
                        </div>
                        <div class="im-user-right">
                            <div class="im-user-info">
                                <span class="im-user-name" :title="item.remark ? item.remark : item.user.name">
                                    {{ item.remark ? item.remark : item.user.name }}
                                </span>
                                <span class="im-user-remark" :title="item.user.remark">
                                    {{ item.user.remark }}
                                </span>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>

            <div v-if="newFriendVisible">
                <ul class="im-panel-user-list">

                    <template v-for="item in newFriendList">
                        <li :key="item.id">
                            <div class="im-user-left">
                                <img :src="item.user && item.user.avatar | getDefaultAvatar" alt="" class="im-user-avatar">
                            </div>
                            <div class="im-user-right">
                                <div class="im-user-info">
                                <span class="im-user-name" :title="item.user && item.user.name">
                                    {{ item.user && item.user.name }}
                                </span>
                                    <span class="im-user-remark" :title="item.remark">
                                    {{ item.remark }}
                                </span>
                                </div>
                            </div>
                            <div class="im-user-button" :style="{color: item.status !== 0 ? '#ccc' : ''}">
                                <span @click="askAck(item, 1)">{{ item.status | askAckStatusFilterName }}</span>
                                <span v-if="item.status === 0" @click="askAck(item, 2)" style="margin-left: 3px;">拒绝</span>
                            </div>
                        </li>
                    </template>
                </ul>
                <div v-if="newFriendList.length !== 0" class="im-new-friend-list-more" @click="getUserFriendAskList">
                    {{ newFriendLoadMore ? '加载更多' : '没有更多了'}}
                </div>
            </div>

        </main>

        <!-- 群组-->
        <main class="im-panel-body"  v-if="imTabSelectedIndex === 2">

            <div class="im-group-create">
                <input type="text" v-show="createGroupVisible" v-model="createGroupName" placeholder="输入群昵称" style="">
                <span class="im-group-create-button" @click="createGroup">{{ createGroupVisible ? '提交' : '新建'}}</span>
                <span class="im-group-create-button"  v-show="createGroupVisible" @click="createGroupClose">取消</span>
            </div>

            <div class="im-list-empty" v-if="Object.keys(userGroupList).length === 0">
                暂无数据
            </div>

            <ul class="im-panel-user-list">

                <template v-for="(item) in userGroupList">
                    <li @click="groupClick(item)" :key="item.groupId">
                        <div class="im-user-left">
                            <img :src="item.group.avatar | getDefaultAvatar" alt="" class="im-user-avatar">
                        </div>
                        <div class="im-user-right">
                            <div class="im-user-info">
                                <span class="im-user-name" :title="item.group.name">
                                    {{ item.group.name }}
                                </span>
                                <span class="im-user-remark" :title="item.group.remark">
                                    {{ item.group.remark }}
                                </span>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>

        </main>

        <footer class="im-panel-footer">
            <div class="im-panel-theme" @click="themeVisible = !themeVisible">
                <img src="../../assets/image/theme.png" alt="更换主题">
            </div>
            <div class="im-panel-theme-list" v-if="themeVisible">
                <div class="im-panel-theme-item" v-for="(item, index) in themeList" :key="index" @click="changeTheme(index, true)">
                    <div v-if="item['background-image']" :style="item"></div>
                    <div v-else></div>
                </div>
            </div>
        </footer>

    </div>

</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
