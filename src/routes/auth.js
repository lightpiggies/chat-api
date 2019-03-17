'use strict';

const router = require('koa-router')();
const _ = require('lodash');

router.post('/register', async (ctx, next) => {
  await next();
});

router.post('/login', async (ctx, next) => {
  await next();
});

module.exports = router;
