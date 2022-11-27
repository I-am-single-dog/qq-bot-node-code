function randImage() {
    let URLS = [
        'https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302',
        // 'https://api.paugram.com/wallpaper/?source=sina&category=cn',
        // 'https://api.paugram.com/wallpaper/?source=sina&category=jp',
    ]
    let url = URLS[Math.floor(Math.random() * URLS.length)];
    return `[CQ:image,cache=0,file=${url}]`;
}

module.exports = {
    randImage
}