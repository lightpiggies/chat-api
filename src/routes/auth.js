'use strict';

const router = require('koa-router')();
const _ = require('lodash');
const moment = require('moment');
const UserService = require('../service/user');
const UserLoginStatus = require('../models/mongo/user_login_status');

router.post('/register', async (ctx, next) => {
  const user = await UserService.registerUser(ctx.request.body);
  ctx.state.data = user;
  await next();
});

router.post('/login', async (ctx, next) => {
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
    // 此人有登陆过的设备
    const deviceIds = _.map(userLogins.login_device, 'device_id');
    if (!deviceIds.includes(device.device_id)) {
      const newDevices = _.drop(userLogins.login_device); // 删掉第一个设备
      newDevices.push({ ...device, login_at: loginTime }); // 把新设备放到尾部
      userLogins.login_device = newDevices;
      await userLogins.save();
    }
  }

  // todo: 应该返回用户的基本信息
  ctx.state.data = {
    user_id: uid,
    ...device,
    login_at: loginTime,
  };
  await next();
});

module.exports = router;
