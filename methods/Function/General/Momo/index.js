const sdmsg = require('../../../SendMessage/index')
const config = require('../../../../config')

const {exec} = require('child_process')

function callNlp(msg)
{
    return new Promise((resolve, reject)=>{
        exec(`python3 ./methods/Function/General/Momo/jionlp/main.py '${msg}'`, 
        (err, stdout, stderr)=>{
            if(err || stderr){
                console.error('nlpCall:' + String(err));
                reject({});
            }
            else 
            {
                let str = stdout.substring(
                    stdout.indexOf('{'),
                    stdout.indexOf('}')
                ) + '}';
                str = str.replace(new RegExp(`'`, 'g'), '"')
                resolve(JSON.parse(str));
            }
        })
    })
}

/*
data={
    type: '',
    definition: '',
    time: [] or {},
        point: {}
}
*/

var SuccSet = `备忘录设置成功，${config.BotName}会记得提醒你的\n(不过${config.BotName}还不能保证解析准确度，请仅供参考~)`;
var FailSet = `备忘录设置失败了，${config.BotName}会努力学会的……`;

function calcTimeInterval(time) // 计算到当前时间的间隔
{
    time+=' UTC+08:00';
    let date = new Date(Date.parse(time)); // 转换时区
    return date.getTime() - Date.now() - config.MomoPreMinute * 60 * 1000;
}

async function setMomo(data, msg, id, sdMsgFunc)
{
    if(data.type == 'time_point')
    {
        let tmin = calcTimeInterval(data.time[0]);
        setTimeout(()=>{
            sdMsgFunc(
                id, 
                `${config.BotName}提醒你，你设置的提醒事件还有几分钟就开始了哦~\n\n内容如下:\n`
                + msg
            )
        }, tmin);

        sdMsgFunc(id, SuccSet);
    }

    else if(data.type == 'time_span')
    {
        let tmin = calcTimeInterval(data.time[0]);
        let tmout = calcTimeInterval(data.time[1]);

        setTimeout(()=>{
            sdMsgFunc(
                id, 
                `${config.BotName}提醒你，你设置的提醒事件还有几分钟就开始了哦~\n\n内容如下:\n`
                + msg
            )
        }, tmin);

        setTimeout(()=>{
            sdMsgFunc(
                id, 
                `${config.BotName}提醒你，你设置的提醒事件还有几分钟就结束了哦~\n\n内容如下:\n`
                + msg
            )
        }, tmout);

        sdMsgFunc(id, SuccSet);
    }

    else sdMsgFunc(id, FailSet);
}

async function setPrivateMomo(msg, uid)
{
    callNlp(msg).then(data=>{
        setMomo(data, msg, uid, sdmsg.sendPrivateMessage);
    }).catch(err=>{
        console.error(err);
    })
}

async function setGroupMomo(msg, gid)
{
    callNlp(msg).then(data=>{
        setMomo(data, msg, uid, sdmsg.sendGroupMessage);
    }).catch(err=>{
        console.error(err);
    })
}

module.exports={
    setPrivateMomo,
    setGroupMomo
}