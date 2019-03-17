'use strict';

const Koa = require('koa');
const _ = require('lodash');
const bodyparser = require('koa-bodyparser');
const router = require('./routes/router');
const ChatError = require('./libs/error');

const app = new Koa();

app.use(bodyparser());

// error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ChatError) {
      if (err.code <= 500) ctx.status = err.code;
      ctx.body = {
        errcode: err.code,
        errmsg: err.msg,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        errcode: ChatError.CODES.INTERNAL_ERROR,
        errmsg: '请求出错，请稍后再试',
        data: ctx.state.ret,
      };
    }
  }
});

// formatting output
app.use(async (ctx, next) => {
  await next();
  if (!_.isUndefined(ctx.state.data)) {
    ctx.body = {
      errcode: 0,
      data: ctx.state.data,
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
