'use strict';
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const betterbody = require('koa-better-body')();
const logger = require('koa-logger');
const multer = require('koa-multer');

const index = require('./api/routes/index');
const processing = require('./api/routes/processing');

// middlewares
app.use(convert(betterbody));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

app.use(async (ctx, next) => {
  try {
    await next()

    if (ctx.status === 404) ctx.throw(404)
  } catch (err) {
    console.error(err);
    ctx.status = err.status || 500
  }
});

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/processing', processing.routes(), processing.allowedMethods())

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;
