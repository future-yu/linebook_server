const request = require('request');
const cheerio = require('cheerio');
const {cookie} = require('./config');
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
    let items=[];
    let allData={}
    $('.itg tr').each((index,item)=>{
        if(index>0){
            let img = $(item).find('.glthumb img');
            let img_url = img.attr('data-src')||img.attr('src');
            let target_a = $(item).find('.gl3c a');
            let $target_a = $(target_a);
            items.push({
                img_url,
                title:$target_a.find('.glink').text(),
                target_url:$target_a.attr('href')
            })
        }
    });
    allData['items']=items;
    let maxEl = $('.ptt td')[($('.ptt td').length-2)];
    allData['max'] = $(maxEl).text();
    return allData;
}

function parseItemDetail(html){
    let $ = cheerio.load(html);
    let allData={
        tags:[],
        thumbs:[]
    };
    $('#taglist table tr').each((index,item)=>{
        let tag_name = $(item).children(':first-child').text()
        let tag_value = []
        $(item).children(':last-child').find('a').each((index,item)=>{
            tag_value.push({
                value:$(item).text(),
                target:$(item).attr('href')
            })
        })
        allData['tags'].push({
            tag_name,
            tag_value
        })
    });
    $('.gdtm div').each((index,item)=>{
        let img_style = $(item).attr('style')
        allData['thumbs'].push({
            full_target:$(item).find('a').attr('href'),
            thumb_src:img_style
        })
    });
    let max = $('.ptt td')[($('.ptt td').length-2)]
    allData['max'] = $(max).text();
    return allData

}

function parseThumbPage(html){
    let $ = cheerio.load(html);
    let allData=[];
    $('.gdtm div').each((index,item)=>{
        let img_style = $(item).attr('style')
        allData.push({
            full_target:$(item).find('a').attr('href'),
            thumb_src:img_style
        })
    });
    return allData;
}


async function searchItems(url) {
    let res = await get(url);
    let allData = parseItems(res.data);
    return allData;
}
async function getItemDetail(target){
    let res = await get(target);
    return parseItemDetail(res.data);
}

async function getThumbPage(target){
    let res = await get(target);
    return parseThumbPage(res.data);
}
module.exports = {
    searchItems,
    getItemDetail,
    getThumbPage
}
