'use strict';

const _ = require('lodash');
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
schema.statics.findByUid = function findByUid(uid) {
  return this.find({ user_id: uid });
};

function removeObjFromArray(mongooseArray, objArray) {
  _.forEach(objArray, obj => mongooseArray.pull(obj.id));
}

schema.statics.pullFromMongooseArray = function pullFromMongooseArray(mongooseArray, predicate) {
  const subDocTobePulled = _.pickBy(mongooseArray, predicate);
  removeObjFromArray(mongooseArray, subDocTobePulled);
};

schema.statics.dropFromMongooseArray = function dropFromMongooseArray(mongooseArray, number) {
  const subDocTobeDrop = _.take(mongooseArray, number);
  removeObjFromArray(mongooseArray, subDocTobeDrop);
};

// query helper
schema.query.byUid = function byUid(uid) {
  return this.where({ user_id: uid });
};

const UserLoginStatus = conn.model('user_login_status', schema);

module.exports = UserLoginStatus;
