'use strict';

const router = require('koa-router')();
const SystemRouter = require('./system');
const UserRouter = require('./users');
const AuthRouter = require('./auth');
const Auth = require('../middlewares/auth');

router.use('/system', SystemRouter.routes(), SystemRouter.allowedMethods());
router.use('/auth', AuthRouter.routes(), AuthRouter.allowedMethods());

router.use(Auth.chatAuth);
router.use('/users', UserRouter.routes(), UserRouter.allowedMethods());

module.exports = router;
