'use strict';

const router = require('koa-router')();
const _ = require('lodash');
const UserLoginStatus = require('../models/mongo/user_login_status');
const ChatError = require('../libs/error');

router.get('/:id', async (ctx, next) => {
  const uid = ctx.params.id;

  await next();
});

router.put('/:id', async (ctx, next) => {
  const uid = ctx.params.id;

  await next();
});

router.get('/:id/login_devices', async (ctx, next) => {
  const uid = ctx.state.user;
  const userLoginDevices = await UserLoginStatus.findOne().byUid(uid).then(ul => _.get(ul, 'login_device', []));
  ctx.state.data = {
    total: userLoginDevices.length,
    items: _.map(userLoginDevices, d => _.pick(d, ['device_id', 'device_type', 'login_at'])),
  };
  await next();
});

router.delete('/:id/login_devices/:did', async (ctx, next) => {
  const uid = ctx.state.user;
  const deviceId = ctx.state.device;
  const tobeDelDeviceId = ctx.params.did;
  if (tobeDelDeviceId === deviceId) throw new ChatError(ChatError.CODES.BAD_REQUEST, '此为当前设备，无法删除!');

  const userLogins = await UserLoginStatus.findOne().byUid(uid);
  UserLoginStatus.pullFromMongooseArray(userLogins.login_device, d => d.device_id === tobeDelDeviceId);
  const newUserLogins = await userLogins.save();

  ctx.state.data = {
    total: _.get(newUserLogins, 'login_device.length', 0),
    items: _.map(newUserLogins.login_device, d => _.pick(d, ['device_id', 'device_type', 'login_at'])),
  };
  await next();
});

module.exports = router;
