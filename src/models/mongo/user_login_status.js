'use strict';

const { mongoose, conn } = require('../../libs/db_connection/mongo');

const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: {
    type: String,
    index: true,
  },
  login_device: [{ device_id: String, device_type: String, login_at: Date }],
});

// static method
schema.statics.findByUid = function(uid) {
  return this.find({ user_id: uid });
};

// query helper
schema.query.byUid = function(uid) {
  return this.where({ user_id: uid });
}

const UserLoginStatus = conn.model('user_login_status', schema);

module.exports = UserLoginStatus;
