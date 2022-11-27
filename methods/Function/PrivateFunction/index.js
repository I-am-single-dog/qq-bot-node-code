const chat = require('../General/index').chat;
const config = require('../../../config');
const momo = require('../General/Momo/index')

function help()
{
    return `可以跟${config.BotName}说:\n${config.BotName}备忘录\n%&#@……\n让我到时候提醒你~\n`+
    `不过${config.BotName}还不能保证解析准确性，所以绝对绝对不要将${config.BotName}备忘录作为唯一提醒哦~`;
}

async function funRouter(msg, uid)
{
    if(msg.indexOf('查看帮助') != -1)
        return help();

    if(msg.indexOf(`${config.BotName}备忘录`) != -1)
    {
        momo.setPrivateMomo(msg.replace(`${config.BotName}备忘录`, ''), uid);
        return '';
    }

    return await chat(msg, uid);
}

module.exports={
    funRouter
}