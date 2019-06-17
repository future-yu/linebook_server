const Koa = require('koa');
const router = require('./routes');
const cors = require('koa-cors');

let app = new Koa();

app.use(cors());

app.use(router.routes())
    .use(router.allowedMethods());

app.listen(8081, function () {
    console.log('listen in 8081')
})
