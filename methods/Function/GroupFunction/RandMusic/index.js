const axios = require('axios');

async function randMusic() {
    return new Promise(
        (resolve) => {
            let URLS = [
                'https://api.paugram.com/acgm/'
            ]
            let url = URLS[Math.floor(Math.random() * URLS.length)];

            axios.get(url).then(data => {
                let id = JSON.parse(data).id;
                console.log(`得到歌曲id:${id}`);
                resolve(`[CQ:music,type=163,id=${id}]`);
            }).catch(err => {
                console.error(err);
                resolve('');
            })

        }
    )

}

module.exports = {
    randMusic
}