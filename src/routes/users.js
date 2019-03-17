'use strict';

const router = require('koa-router')();
const _ = require('lodash');

router.get('/:id', async (ctx, next) => {
  const uid = ctx.params.id;

  await next();
});

router.put('/:id', async (ctx, next) => {
  const uid = ctx.params.id;

  await next();
});

module.exports = router;
