// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");
const config = require('../../../../config')

const TbpClient = tencentcloud.tbp.v20190627.Client;

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
// 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
const clientConfig = {
  credential: {
    secretId: "", // 此处隐私项省去
    secretKey: "",
  },
  region: "",
  profile: {
    httpProfile: {
      endpoint: "tbp.tencentcloudapi.com",
    },
  },
};

// 区分和谁聊天
function chat(msg, id)
{
    return new Promise(
        (resolve)=>{
            // 实例化要请求产品的client对象,clientProfile是可选的
            const client = new TbpClient(clientConfig);
            const params = {
                "BotId": "", // 此处隐私项省去
                "BotEnv": "release",
                "TerminalId": String(id),
                "InputText": msg.replace(config.BotName, '你')
            };

            client.TextProcess(params).then(
            (data) => {
                resolve(String(data.ResponseText)
                .replace(new RegExp('登录腾讯云小微app或小程序', 'gm'), '问问我 查看帮助')
                .replace(new RegExp('小微', 'gm'), config.BotName)
                .replace('我不明白您的意思', `${config.BotName}还不太懂[CQ:face,id=9]`));
            },
            (err) => {
                console.error("chat bot error", err);
                resolve(`哇啊, ${config.BotName}的语言模块又坏掉了~\n(TBP Connection Error)`);
            }
            );
        }
    )
}

module.exports = {
    chat
}