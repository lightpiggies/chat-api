'use strict';

const _ = require('lodash');

const common = {
  dbs: {
    mongo: {
      user: 'root',
      password: '',
      host: '127.0.0.1',
      port: '27017',
      options: {
        useNewUrlParser: true,
        keepAlive: 1,
      },
      dbs: {
        CHAT: 'chat',
      },
    },
    redis: {},
  },
  user: {
    domain: 'http://127.0.0.1:5001',
  },
};

const stgConf = {};
const prodConf = {};

const env = {
  PROD: ['prod', 'production'],
};

let config = _.merge({}, common);
if (env.PROD.includes(process.env.NODE_ENV)) config = _.merge(config, prodConf);
else config = _.merge(config, stgConf);

module.exports = config;
