'use strict';

const router = require('koa-router')();
const SystemRouter = require('./system');
const UserRouter = require('./users');
const AuthRouter = require('./auth');

router.use('/system', SystemRouter.routes(), SystemRouter.allowedMethods());
router.use('/users', UserRouter.routes(), UserRouter.allowedMethods());
router.use('/auth', AuthRouter.routes(), AuthRouter.allowedMethods());

module.exports = router;
