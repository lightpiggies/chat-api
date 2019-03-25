'use strict';

const CODES = {
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  USER_REQUEST_ERR: 11001,
  USER_RESPONSE_ERR: 11002,
  USER_CODE_ERR: 11003,
  USER_NOT_EXIST: 11004,
  USER_PASSWORD_ERR: 11005,
};

class ChatError extends Error {
  constructor(code, msg, err) {
    super(msg);
    this.code = code;
    this.msg = msg;
    this.details = err;
  }
}

ChatError.CODES = CODES;

module.exports = ChatError;
