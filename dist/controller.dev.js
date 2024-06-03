"use strict";

var bcrypt = require('bcrypt');

var User = require('./model');

exports.signUp = function (req, res) {
  var user = new User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });
};
//# sourceMappingURL=controller.dev.js.map
