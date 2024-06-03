"use strict";

var mongoose = require('mongoose');

var USER = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required"]
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});
var userModel = mongoose.model('User', USER);
module.exports = userModel;
//# sourceMappingURL=model.dev.js.map
