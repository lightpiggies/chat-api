'use strict';

const router = require('koa-router')();
const _ = require('lodash');
const moment = require('moment');
const UserService = require('../service/user');
const UserLoginStatus = require('../models/mongo/user_login_status');
const CONSTANT = require('../utils/constants');
const requestFilter = require('../filter/request');

router.get('/username_exists',
  requestFilter.queryNotNullOrEmptyFilter(['username']),
  async (ctx) => {
    const exists = await UserService.usernameExists(ctx.query.username);
    ctx.state.data = {
      exists,
    };
  });

router.post('/register', async (ctx) => {
  const user = await UserService.registerUser(ctx.request.body);
  ctx.state.data = user;
});

router.post('/login', async (ctx) => {
  const userLoginInfo = await UserService.userLogin(ctx.request.body);
  const loginTime = moment();
  const uid = userLoginInfo.user_id;
  const device = {
    device_id: ctx.query.device_id,
    device_type: ctx.query.device_type,
  };
  const userLogins = await UserLoginStatus.findOne().byUid(uid);

  if (!userLogins) {
    // 此人以前没登陆过
    await new UserLoginStatus({
      user_id: uid,
      login_device: [{ ...device, login_at: loginTime }],
    }).save();
  } else if (_.isUndefined(userLogins.login_device) || _.isEmpty(userLogins.login_device)) {
    // 此人的所有登陆设备都被删除了
    userLogins.login_device = [{ ...device, login_at: loginTime }];
    await userLogins.save();
  } else {
    // 此人有登录过的设备
    UserLoginStatus.pullFromMongooseArray(userLogins.login_device, d => (d.device_id === device.device_id));
    userLogins.login_device.push({ ...device, login_at: loginTime });
    const deviceLimit = CONSTANT.USER_LOGIN_LIMIT.MAX_DEVICES;
    const deviceLength = userLogins.login_device.length;
    if (deviceLength > deviceLimit) { // 当设备数超过限制, 删掉以前的设备
      UserLoginStatus.dropFromMongooseArray(userLogins.login_device, deviceLength - deviceLimit);
    }
    await userLogins.save();
  }

  // todo: 应该返回用户的基本信息
  ctx.state.data = {
    user_id: uid,
    ...device,
    login_at: loginTime,
  };
});

module.exports = router;
