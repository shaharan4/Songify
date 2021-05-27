const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  account_name: {type: String},
  account_pw: {type: String},
  account_profile_pic: {type: String},
  account_email: {type: String},
  user_state: {type: Object},
  stories:  {type: Array},
  mixtapes: {type: Array},
  friend_system: {type: Object},
  state: {type: Object}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;