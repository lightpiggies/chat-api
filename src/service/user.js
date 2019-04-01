'use strict';

const Fetch = require('../libs/fetch');
const config = require('../../configs/config');
const ChatError = require('../libs/error');

class UserService extends Fetch {
  static async doRequest(options) {
    let resp;
    try {
      resp = await super.doRequest(options.method, `${config.user.domain}/${options.path}`, options.qs, options.params, options.headers);
    } catch (err) {
      throw new ChatError(ChatError.CODES.USER_REQUEST_ERR, '请求 user system 出错，请稍后再试', err);
    }
    if (resp.statusCode === 200) {
      if (resp.body.errcode === 0) {
        return resp.body.data;
      }
      throw new ChatError(ChatError.CODES.USER_CODE_ERR, 'user system 返回错误，请稍后再试', resp.body);
    }
    const err = new ChatError(ChatError.CODES.USER_RESPONSE_ERR, 'user system 出错，请稍后再试', resp.body);
    throw err;
  }

  static registerUser(infos) {
    return UserService.doRequest({
      method: 'POST',
      path: 'users',
      params: infos,
    });
  }

  static userLogin(infos) {
    return UserService.doRequest({
      method: 'POST',
      path: 'auth/login',
      params: infos,
    }).catch((e) => {
      if (e.details.errcode === 11001) throw new ChatError(ChatError.CODES.USER_NOT_EXIST, '用户不存在');
      if (e.details.errcode === 11002) throw new ChatError(ChatError.CODES.USER_PASSWORD_ERR, '密码错误');
      throw e;
    });
  }

  /**
   * 检查用户名是否已存在
   * @param {string} username
   * @returns {boolean}
   */
  static usernameExists(username) {
    return UserService.doRequest({
      method: 'GET',
      path: 'users/',
      qs: {
        filter: `{"username":"${username}"}`,
      },
    }).then(users => users.total > 0);
  }
}

module.exports = UserService;
