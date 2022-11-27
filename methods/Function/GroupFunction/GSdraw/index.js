var FiveStarArr = [
    '白草净华·纳西妲(草)',
    '霓霆快雨·刻晴(雷)',
    '冻冻回魂夜·七七(冰)',
    '蒲公英骑士·琴(风)',
    '晨曦的暗面·迪卢克(火)',
    '浅蔚轻行·提纳里(草)',
];

var FourStarArr = [
    '香菱(火)',
    '班尼特(火)',
    '安伯(火)',
    '雷泽(雷)',
    '北斗(雷)',
    '菲谢尔(雷)',
    '丽莎(雷)',
    '行秋(水)',
    '芭芭拉(水)',
    '凝光(岩)',
    '诺艾尔(岩)',
    '重云(冰)',
    '凯亚(冰)',
    '砂糖(风)',
    '武器·弓藏',
    '武器·祭礼大剑',
    '武器·笛剑',
    '武器·西风剑',
    '武器·匣里龙吟',
    '武器·祭礼剑',
    '武器·钟剑',
    '武器·西风大剑',
    '武器·雨裁',
    '武器·祭礼大剑',
    '武器·西风长枪',
    '武器·匣里灭辰'
];

var ThreeStarArr = [
    '武器·讨龙英杰谭',
    '武器·魔导绪论',
    '武器·黑缨枪',
    '武器·黎明神剑',
    '武器·冷刃',
    '武器·沐浴龙血的剑',
    '武器·以理服人',
    '武器·神射手之誓',
    '武器·弹弓',
    '武器·鸦羽弓',
];

var FiveStarRate = 500; // 越大越稀有
var FourStarRate = 500; // 越大越稀有

function GSdrawonce()
{
    let t = Math.floor(Math.random() * 100000);

    if(t % FiveStarRate < FiveStarArr.length) // 抽卡出金
    {
        return FiveStarArr[t % FiveStarRate] + ' (5⭐)';
    }

    if(t % FourStarRate < FourStarArr.length) // 抽卡出紫
    {
        return FourStarArr[t % FourStarRate] + ' (4⭐)';
    }

    return ThreeStarArr[t % ThreeStarArr.length] ;
}

function GSdraw()
{
    let t = Math.floor(Math.random() * 100000);

    let res = '';

    let onceDraw = Math.floor(Math.random() * 9);
    for(let i = 0; i < onceDraw; i++)
        res += GSdrawonce() + '\n';
    
    res += FourStarArr[t % FourStarArr.length] + ' (4⭐)' + '\n';

    for(let i = 0; i < 9 - onceDraw; i++)
        res += GSdrawonce() + '\n';

    return res;
}

module.exports = {
    GSdraw
}