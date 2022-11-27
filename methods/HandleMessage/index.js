// HandleMessage
const sdmsg = require('../SendMessage/index')
const config = require('../../config.js')
const gfunc = require('../Function/GroupFunction/index')
const pfunc = require('../Function/PrivateFunction/index');

async function gotPrivateMessage(uid, msg)
{
    sdmsg.sendPrivateMessage(uid, await pfunc.funRouter(msg, uid));
}

async function gotGroupMessage(gid, uid, msg, type = 'normal')
{
    if(type == 'normal')
    {
        if(msg.indexOf(config.BotName) != -1 || msg.indexOf(`[CQ:at,qq=${config.BotQQ}]`) != -1)
        {
            sdmsg.sendGroupMessage(gid, await gfunc.funRouter(msg, uid, gid));
        }
    }
}

function gotGroupPoke(gid)
{
    sdmsg.sendGroupMessage(gid, '啊呜~\n[CQ:image,subType=8,file=https://i0.hdslb.com/bfs/article/bf5be1af7fb5f625c67940c15d087b6f0a5a4f17.png@942w_1364h_progressive.webp]');
}

module.exports={
    gotPrivateMessage,
    gotGroupMessage,
    gotGroupPoke
}