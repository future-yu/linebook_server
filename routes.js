const Routes = require('koa-router');
const {} = require('./service');

let router = new Routes();

router.get('/',async function (ctx,next) {


});

router.post('/',async function (ctx,next) {
    ctx.body = 'hello'
});


module.exports = router;
