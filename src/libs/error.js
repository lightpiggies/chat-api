'use strict';

const CODES = {
  INTERNAL_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
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
