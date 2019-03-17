'use strict';

const router = require('koa-router')();

router.all('/ok', async (ctx, next) => {
  ctx.state.data = '';
  await next();
});

module.exports = router;
