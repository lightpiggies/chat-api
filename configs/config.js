'use strict';

const _ = require('lodash');

const common = {
  dbs: {
    mongo: {},
    redis: {},
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
