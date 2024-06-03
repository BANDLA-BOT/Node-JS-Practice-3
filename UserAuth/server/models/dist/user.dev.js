"use strict";

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var Joi = require('joi');

var passwordComplexity = require('joi-password-complexity');

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.generateAuthToken = function () {
  var token = jwt.sign({
    _id: this._id
  }, process.env.ACCESS_KEY, {
    expiresIn: "7d"
  });
  return token;
};

var User = mongoose.model("user", userSchema);

var validate = function validate(data) {
  var schema = Joi.object({
    firstName: Joi.string().required().label("First name"),
    lastName: Joi.string().required().label("Last name"),
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password")
  });
  return schema.validate(data);
};

module.exports = {
  User: User,
  validate: validate
};
//# sourceMappingURL=user.dev.js.map
