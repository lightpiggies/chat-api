'use strict';

const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: true,
      json: true,
      stringify: true,
    }),
  ],
});

module.exports = logger;
