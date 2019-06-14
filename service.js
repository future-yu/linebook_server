const request = require('request');
const cheerio = require('cheerio');
const {cookie, host} = require('./config');

function get(url) {
    return new Promise((resolve, reject) => {
        request({
            uri:url,
            method:'GET',
            headers:{
                Cookie:cookie
            }
        },function (err,response,data) {
            if(err){
                reject(err)
            }
            resolve({
                response,
                data
            })
        })

    })
}

function parseItems(html){
    let $ = cheerio.load(html);
    let allData=[];
    $('.itg tr').each((index,item)=>{
        if(index>0){
            let img = $(item).find('.glthumb img');
            let img_url = img.attr('src')||img.attr('data-src');
            let target_a = $(item).find('.gl3c a');
            let $target_a = $(target_a);
            allData.push({
                img_url,
                title:$target_a.find('.glink').text(),
                target_url:$target_a.attr('href')
            })
        }
    });
    return allData;
}

async function searchItems() {
    let res = await get(host);
    let allData = parseItems(res.data);
    return allData;
}

module.exports = {
    searchItems
}
