'use strict';

const ChatError = require('../libs/error');

class RequestFilter {
  /**
   * @param  {string array} fields
   * @param  {boolean} trim
   */
  static queryNotNullOrEmptyFilter(fields = [], trim = true) {
    return async (ctx, next) => {
      for (const k of fields) {
        let v = ctx.query[k];
        if (v === undefined) {
          throw new ChatError(ChatError.CODES.BAD_REQUEST, `缺少参数：${k}`);
        } else if (v === null) {
          throw new ChatError(ChatError.CODES.BAD_REQUEST, `${k}不能为null`);
        }

        if (trim && typeof v === 'string') {
          v = v.trim();
        }

        if (v === '') {
          throw new ChatError(ChatError.CODES.BAD_REQUEST, `${k}不能为空`);
        }

        ctx.query[k] = v;
      }
      await next();
    };
  }
}

module.exports = RequestFilter;
