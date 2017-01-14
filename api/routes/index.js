const router = require('koa-router')();


router
    .get('/', async(ctx) => {
        ctx.body = 'HI';
    })

module.exports = router;

