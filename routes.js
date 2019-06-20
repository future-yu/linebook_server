const Routes = require('koa-router');
const {searchItems,getItemDetail,getThumbPage,getTagItems} = require('./service');
const {formatUrl} = require('./utils');
const {host} = require('./config');
const fs = require('fs')
const path = require('path')

let router = new Routes();


router.get('/',async function (ctx,next) {
    ctx.type='text/html'
    ctx.body = fs.readFileSync(path.join(__dirname,'./public/index.html'))
});

router.get('/search',async function (ctx,next) {
    let query = ctx.request.query;
    ctx.body = await searchItems(formatUrl(host,{
        f_cats:304,
        page:query.page,
        f_search:query.input
    }))
});

router.get('/detail',async function (ctx,next) {
    let query = ctx.request.query;
    ctx.body = await getItemDetail(query.target)
});

router.get('/thumb/page',async function (ctx,next) {
    let query = ctx.request.query;
    ctx.body = await getThumbPage(query.target)
});


router.get('/tag/item',async function (ctx,next) {
    let query = ctx.request.query;
    ctx.body = await searchItems(query.target)

});

module.exports = router;
