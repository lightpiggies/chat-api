'use strict';

const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const config = require('../../../configs/config.js');

mongoose.set('debug', true);

const serverStr = `${config.dbs.mongo.user}:${config.dbs.mongo.password}@${config.dbs.mongo.host}:${config.dbs.mongo.port}`;
const connStr = `mongodb://${serverStr}/${config.dbs.mongo.dbs.CHAT}`;
const conn = mongoose.createConnection(connStr, config.mongo.options, (err) => {
  if (err) {
    logger.warn('mongodb connection error', err);
  }
});

mongoose.connection.once('open', () => {
  logger.info('mongodb event open');

  mongoose.connection.on('connected', () => {
    logger.warn('mongodb event connected');
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('mongodb event disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    logger.warn('mongodb event reconnected');
  });

  mongoose.connection.on('error', (err) => {
    logger.warn('mongodb event error', err);
  });
});

module.exports = {
  conn,
  mongoose,
};
