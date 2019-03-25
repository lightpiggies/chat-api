const request = require('request');
const Promise = require('bluebird');
const _ = require('lodash');
const querystring = require('querystring');

class Fetch {
  static doRequest(method, url, qs, params, headers, json = true) {
    const options = {
      method,
      uri: url,
      qs,
      headers,
      body: params,
      json: true,
    };
    if (!json) {
      options.body = querystring.stringify(params);
      options.headers = _.merge(options.headers || {}, { 'Content-Type': 'application/x-www-form-urlencoded' });
    }
    return new Promise((resolve, reject) => {
      request(options, (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  }
}


module.exports = Fetch;
