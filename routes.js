const Routes = require('koa-router');
const {searchItems,getItemDetail,getThumbPage} = require('./service');
const {formatUrl} = require('./utils')
const {host} = require('./config');

let router = new Routes();

router.get('/',async function (ctx,next) {


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
})

module.exports = router;
