function draw(uid)
{
    var drawPic = [
        'https://preview.qiantucdn.com/original_origin_pic/18/12/20/1fff24558c78c8de39cdd1214ed34fa0.png!w1024_new_small_1',
    ];
    let date = new Date();
    let t = date.getDate() ^ date.getMonth() ^ date.getFullYear();
    t ^= uid;
    t = t % drawPic.length;
    return `[CQ:at,qq=${uid}] 魔法啊魔法请告诉我，你的今日运势是[CQ:face,id=145][CQ:image,file=${drawPic[t]}]`;
}

module.exports={
    draw
}