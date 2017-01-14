'use strict';

const router = require('koa-router')();

const Tesseract = require('tesseract.js');


router
    .get('/', async(ctx) => {
        ctx.body = 'Processing';
    })
    .post('/', async(ctx) => {
        console.log(ctx.request.files);

        if (ctx.request.files &&
            ctx.request.files.length > 0) {
            let result = await Tesseract.recognize(ctx.request.files[0].path)
                .then(function (result) {
                    return result;
                })

            ctx.body = result.text;
        }
    });

module.exports = router;