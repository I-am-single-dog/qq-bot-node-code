'use strict'
var config = require('./config');

var LocalHost = config.LocalHost;
var Port = config.recPort;

var http = require('http');
var fun = require('./methods/index')

function serve(req, res)
{
    getMessage(req, res);    
}

http.createServer(serve).listen(Port, LocalHost);

function getMessage(req, res)
{
    if(req.method == 'POST')
    {
        let data;
        let body = '';
        req.on('data',item=>{
            body += item;
        })
        req.on('end', ()=>{
            data = JSON.parse(body);
            router(data);
        })
    }
    
    res.end();
}

function router(data)
{
    if(data.post_type == 'message')
    {
        if(data.message_type=='private')
            fun.gotPrivateMessage(data.user_id, data.message);
        if(data.message_type=='group')
            fun.gotGroupMessage(data.group_id, data.user_id, data.message, data.sub_type);
    }
    if(data.post_type == 'notice')
    {
        if(data.sub_type == 'poke')
        {
            if(data.group_id && data.target_id == config.BotQQ)
                fun.gotGroupPoke(data.group_id);
        }
    }
}

process.on('uncaughtException', function (err) {
    console.error('uncaught exception: ' + err);
})