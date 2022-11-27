const config = require('../../../config');

const draw = require('./Draw/index').draw;
const GSdraw = require('./GSdraw/index').GSdraw;
const randImage = require('./RandImage/index').randImage;
const randMusic = require('./RandMusic/index').randMusic;
const chat = require('../General/index').chat;

function help() {
    return `可以向${config.BotName}下达这些指令哦:\n` +
        `·原神抽卡\n` +
        `·来份瑟图\n` +
        `·来首宅歌\n` +
        `·今日运势 (找不到图了，帮帮忙~)\n` +
        `懒蛋程序员还在开发中啦~\n`+
        `当然你也可以加${config.BotName}好友来实现${config.BotName}备忘录等功能啦~具体的话，到时候再问${config.BotName}吧`
}

async function funRouter(msg, uid, gid) {
    if (msg.indexOf('今日运势') != -1)
        return draw(uid);

    if (msg.indexOf('原神抽卡') != -1)
        return GSdraw();

    if (msg.indexOf('来份壁纸') != -1)
        return randImage();

    if (msg.indexOf('来首宅歌') != -1)
        return await randMusic();

    if (msg.indexOf('查看帮助') != -1)
        return help();

    // 不知道干啥了其实就是聊天
    return await chat(msg.replace(/\[.*?\]/g, ''), gid);
}

module.exports = {
    funRouter
}