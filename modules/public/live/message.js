﻿define(function (require, exports, module) {

    var Tool = require('../common/tool');
    require('../common/config');
    require('../common/constant');

    var Message = {};

    //"contentType": 0,   --消息类型： 0文本。1图片
    //"type": 0,   -- 0 主播文本 1 回复文本 2 转发记录 3 主播贴标记录 4 粉丝贴标5.点赞 6订阅,7分享，8关注 9国王邀请，
    //10 有人@ 11主播@ 12直播小视频 13音频 14 红包
    Message.format = function (datas, cid) {
        var messages = [];
        var uid = cid;
        var same = false;
        var me = false;

        for (var i = 0; i < datas.length; i++) {

            var data = datas[i],
                same = uid === data.uid,
                uid = data.uid,
                me = data.uid === cid;

            var atUid = data.atUid;

            var message = {
                ctime: data.createTime,
                time: Tool.formatMsgTime(data.createTime),
                uid: data.uid,
                avatar: data.avatar + Config.AVATAR_100,
                placeholder: Config.avatarImgPath,
                uname: data.nickName,
                me: me,
                same: same,
                mid: data.fragmentId,
                ustatus: data.internalStatus
            };

            if (data.contentType === 0) {

                message.type = Constant.MSGTYPE_TEXT;
                message.content = data.fragment;//标签转换
                message.class = "text";

            } else if (data.contentType === 1) {

                message.type = Constant.MSGTYPE_PIC;
                message.class = "pic msgCard";
                message.file = {
                    original: data.fragmentImage,
                    placeholder: Config.placeholderImgPath
                }
            } else if (data.type === 13 || data.contentType === 13) {

                message.type = Constant.MSGTYPE_AUDIO;
                message.class = "audio msgCard";
                message.title = data.fragment;

                message.file = {
                    original: data.fragmentImage
                }
            } else if (data.type === 12 || data.contentType === 12) {

                message.type = Constant.MSGTYPE_VIDEO;
                message.class = "video msgCard";
                message.title = data.fragment;
                message.file = {
                    original: data.fragmentImage
                }
            }

            messages.push(message)
        }

        var audio = {
            ctime: 1462157542000,
            time: Tool.formatMsgTime(1462157542000),
            uid: 301,
            avatar: "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe?imageView2/1/w/100/h/100/q/90",
            uname: "sman",
            me: true,
            same: true,
            mid: 841,
            ustatus: 1,
            class:"audio msgCard",
            type:4,
            file:{
                original: "https://dn-mdmedia.qbox.me/fe288386-3d26-4eab-b5d2-51eeab82a7f9/2015/12/09/2015-12-09-12-26-54-832.mp3"
            }
        }

        var video = {
            ctime: 1462157542000,
            time: Tool.formatMsgTime(1462157542000),
            uid: 301,
            avatar: "http://cdn.me-to-me.com/FpXdLCD5Nhos0NbWPaLHcegzAiMe?imageView2/1/w/100/h/100/q/90",
            uname: "sman",
            me: true,
            same: true,
            mid: 841,
            ustatus: 1,
            class: "video msgCard",
            type: 5,
            file: {
                original: "http://www.kaltura.com/p/243342/sp/24334200/playManifest/entryId/0_c0r624gh/flavorId/0_w48dtkyq/format/url/protocol/http/a.mp4"
            }
        }

        messages.push(audio);

        messages.push(video);

        console.log(messages);

        return messages;
    };

    Message.cover = function (data) {
        var cover = {
            ctime: data.createTime,
            time: Tool.formatMsgTime(data.createTime),
            uid: data.uid,
            avatar: data.avatar + Config.AVATAR_100,
            placeholder: Config.avatarImgPath,
            uname: data.nickName,
            type: Constant.MSGTYPE_PIC,
            class: "pic msgCard",
            file: {
                original: data.coverImage,
                placeholder: Config.placeholderImgPath
            },
            title: data.title,
            zindex: 10001,
        };

        return cover;
    }

    module.exports = Message;
});