<template>
    <div class="im-chat-box" v-show="chatVisible" :style="imChatBoxStyle" ref="imChatBox">

        <qr-code ref="qrImage"/>

        <login v-if="!user.uid" v-on:login-success="init"/>

        <header class="im-chat-header">
            <div class="im-chat-move" @mousedown="moveChatMsg"></div>
            <div class="im-chat-user">
                <img :src="chatUser.avatar | getDefaultAvatar" alt="" class="im-chat-user-avatar">
                <div class="im-chat-user-info">
                        <span class="im-chat-user-name" :title="chatUser.name">
                            {{ chatUser.name }}
                        </span>
                    <span class="im-chat-user-list-button" v-if="Object.keys(chatMsgGroupUserList).length > 0">
                            {{Object.keys(chatMsgGroupUserList).length}}人
                        </span>
                    <i class="im-icon im-icon-panel-down" v-if="chatUser.type === 2"
                       @click="isShowGroupUserListClick"></i>
                    <span class="im-chat-user-remark" :title="chatUser.remark">
                            {{ chatUser.remark }}
                        </span>
                </div>
            </div>
            <div class="im-chat-setwin">
                <div class="im-icon-close" style="cursor: pointer;" @click="openGroupQRImage"
                     v-if="historyMsgListSelected.type === 2">
                    <img src="../../assets/image/qrcode.png" alt="二维码" title="二维码"
                         style="width: 100%; height: 100%;vertical-align: text-bottom;">
                </div>
                <i class="im-icon im-icon-close" @click="closeChat"></i>
            </div>
            <div class="im-chat-warning" v-if="!webSocketIsOpen" v-html="webSocketWarningText"></div>
        </header>

        <nav style="display: none;">
            <div id="emoji_[smile]"><img src="../../assets/emoji/smile.png" class="im-chat-msg-emoji" title="smile"
                                         alt="smile"></div>
            <div id="emoji_[laughing]"><img src="../../assets/emoji/laughing.png" class="im-chat-msg-emoji"
                                            title="laughing" alt="laughing"></div>
            <div id="emoji_[blush]"><img src="../../assets/emoji/blush.png" class="im-chat-msg-emoji" title="blush"
                                         alt="blush"></div>
            <div id="emoji_[heart_eyes]"><img src="../../assets/emoji/heart_eyes.png" class="im-chat-msg-emoji"
                                              title="heart_eyes" alt="heart_eyes"></div>
            <div id="emoji_[smirk]"><img src="../../assets/emoji/smirk.png" class="im-chat-msg-emoji" title="smirk"
                                         alt="smirk"></div>
            <div id="emoji_[flushed]"><img src="../../assets/emoji/flushed.png" class="im-chat-msg-emoji"
                                           title="flushed" alt="flushed"></div>
            <div id="emoji_[grin]"><img src="../../assets/emoji/grin.png" class="im-chat-msg-emoji" title="grin"
                                        alt="grin"></div>
            <div id="emoji_[kissing_smiling_eyes]"><img src="../../assets/emoji/kissing_smiling_eyes.png"
                                                        class="im-chat-msg-emoji" title="kissing_smiling_eyes"
                                                        alt="kissing_smiling_eyes"></div>
            <div id="emoji_[wink]"><img src="../../assets/emoji/wink.png" class="im-chat-msg-emoji" title="wink"
                                        alt="wink"></div>
            <div id="emoji_[kissing_closed_eyes]"><img src="../../assets/emoji/kissing_closed_eyes.png"
                                                       class="im-chat-msg-emoji" title="kissing_closed_eyes"
                                                       alt="kissing_closed_eyes"></div>
            <div id="emoji_[stuck_out_tongue_winking_eye]"><img
                src="../../assets/emoji/stuck_out_tongue_winking_eye.png" class="im-chat-msg-emoji"
                title="stuck_out_tongue_winking_eye" alt="stuck_out_tongue_winking_eye"></div>
            <div id="emoji_[sleeping]"><img src="../../assets/emoji/sleeping.png" class="im-chat-msg-emoji"
                                            title="sleeping" alt="sleeping"></div>
            <div id="emoji_[worried]"><img src="../../assets/emoji/worried.png" class="im-chat-msg-emoji"
                                           title="worried" alt="worried"></div>
            <div id="emoji_[sweat_smile]"><img src="../../assets/emoji/sweat_smile.png" class="im-chat-msg-emoji"
                                               title="sweat_smile" alt="sweat_smile"></div>
            <div id="emoji_[cold_sweat]"><img src="../../assets/emoji/cold_sweat.png" class="im-chat-msg-emoji"
                                              title="cold_sweat" alt="cold_sweat"></div>
            <div id="emoji_[joy]"><img src="../../assets/emoji/joy.png" class="im-chat-msg-emoji" title="joy"
                                       alt="joy"></div>
            <div id="emoji_[sob]"><img src="../../assets/emoji/sob.png" class="im-chat-msg-emoji" title="sob"
                                       alt="sob"></div>
            <div id="emoji_[angry]"><img src="../../assets/emoji/angry.png" class="im-chat-msg-emoji" title="angry"
                                         alt="angry"></div>
            <div id="emoji_[mask]"><img src="../../assets/emoji/mask.png" class="im-chat-msg-emoji" title="mask"
                                        alt="mask"></div>
            <div id="emoji_[scream]"><img src="../../assets/emoji/scream.png" class="im-chat-msg-emoji"
                                          title="scream" alt="scream"></div>
            <div id="emoji_[sunglasses]"><img src="../../assets/emoji/sunglasses.png" class="im-chat-msg-emoji"
                                              title="sunglasses" alt="sunglasses"></div>
            <div id="emoji_[thumbsup]"><img src="../../assets/emoji/thumbsup.png" class="im-chat-msg-emoji"
                                            title="thumbsup" alt="thumbsup"></div>
            <div id="emoji_[clap]"><img src="../../assets/emoji/clap.png" class="im-chat-msg-emoji" title="clap"
                                        alt="clap"></div>
            <div id="emoji_[ok_hand]"><img src="../../assets/emoji/ok_hand.png" class="im-chat-msg-emoji"
                                           title="ok_hand" alt="ok_hand"></div>
        </nav>

        <div class="im-chat-user-list" v-if="chatMsgGroupUserVisible">
            <div class="im-chat-user-list-item" v-for="item in chatMsgGroupUserList" :key="item.user.uid">
                <img :src="item.user.avatar | getDefaultAvatar">
                <cite>{{item.user.name}}</cite>
            </div>
        </div>

        <main class="im-chat-main" id="chatMsgList">
            <a class="im-list-more" @click="getChatMsgList">{{ chatMsgListHandleMoreText }}</a>
            <template v-for="(item, index) in chatMsgList">
                <div class="im-chat-msg-box" :class="item.isMine ? 'im-chat-msg-mine' : ''" :key="index">
                    <div class="im-chat-msg-user">
                        <img :src="item.user.avatar | getDefaultAvatar">
                        <div class="im-chat-msg-user-remark" v-if="item.isMine">
                            <i>{{ item.createTime }}</i><span>{{ item.user.name }}</span>
                        </div>
                        <div class="im-chat-msg-user-remark" v-else>
                            <span>{{ item.user.name }}</span><i>{{ item.createTime }}</i>
                        </div>
                    </div>
                    <div class="im-chat-msg-text" v-html="item.msgContent"></div>
                </div>
            </template>

        </main>

        <footer class="im-chat-footer">
            <div class="im-chat-feature-holder">
                <div class="im-chat-feature-btn-box">
                    <div class="im-chat-feature-btn im-icon im-icon-emoji im-emoji-box" @click="handleEmoji">
                        <div class="im-emoji-holder" v-if="emojiVisible">
                            <template v-for="(item, index) in emojiList">
                                <i class="im-emoji-control" :key="item.code" @click="selectEmoji(item)"
                                   :title="item.title" :style="{backgroundPosition: '0 ' + index * -25 + 'px'}"></i>
                            </template>
                        </div>
                    </div>
                    <div class="im-chat-feature-btn im-icon im-icon-photo"></div>
                    <div class="im-chat-feature-btn im-icon im-icon-upload"></div>
                </div>
            </div>
            <div class="im-chat-text-holder">
                <textarea placeholder="请输入" ref="himChatText" @blur="chatTextBlur" v-model="chatText"></textarea>
            </div>
            <div class="im-chat-send-box">
                <div class="im-chat-send">
                    <div class="im-chat-send-btn" @click="closeChat">关闭</div>
                    <div class="im-chat-send-btn" @click="sendBtnClick">发送</div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "chat"
    }
</script>

<style scoped>

</style>
