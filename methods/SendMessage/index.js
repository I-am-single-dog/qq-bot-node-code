// SendMessage
var axios = require('axios'); 
var config = require('../../config.js');
var LocalHost = config.LocalHost;
var SendPort = config.SendPort;

function sendPrivateMessage(uid, msg)
{
    axios.post(`http://${LocalHost}:${SendPort}/send_private_msg`, {
        user_id: uid,
        message: msg,
    }).then(res=>{
        console.log(`发送私聊消息给${uid}: ${msg}`);
    }).catch(err=>{
        console.error(err);
    })
}

function sendGroupMessage(gid, msg)
{
    axios.post(`http://${LocalHost}:${SendPort}/send_group_msg`, {
        group_id: gid,
        message: msg,
    }).then(res=>{
        console.log(`发送群聊消息给${gid}: ${msg}`);
    }).catch(err=>{
        console.error(err);
    })
}

function sendGroupSign(gid)
{
    axios.post(`http://${LocalHost}:${SendPort}/send_group_sign`, {
        group_id: gid,
    }).then(()=>{
        console.log(`发送群打卡给${gid}`);
    }).catch(err=>{
        console.error(err);
    })
}

module.exports = {
    sendPrivateMessage,
    sendGroupMessage,
    sendGroupSign,
}