'use strict';

const _ = require('lodash');
const ChatError = require('../libs/error');
const UserLoginStatus = require('../models/mongo/user_login_status');

class Auth {
  static async chatAuth(ctx, next) {
    let login = false;
    if (ctx.query.user_id && ctx.query.device_id) {
      const loginUser = await UserLoginStatus.findOne().byUid(ctx.query.user_id);
      if (loginUser && _.map(loginUser.login_device, 'device_id').includes(ctx.query.device_id)) {
        login = true;
      }
    }
    if (!login) throw new ChatError(ChatError.CODES.UNAUTHORIZED, 'Unauthorized');
    await next();
  }
}

module.exports = Auth;
