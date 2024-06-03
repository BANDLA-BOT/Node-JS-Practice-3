"use strict";

var router = require("express").Router();

var _require = require("../models/user"),
    User = _require.User;

var bcrypt = require("bcrypt");

var Joi = require("joi");

router.post("/", function _callee(req, res) {
  var _validate, error, user, validPassword, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _validate = validate(req.body), error = _validate.error;

          if (!error) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(400).send({
            message: error.details[0].message
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            message: "Invalid Email or Password"
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 11:
          validPassword = _context.sent;

          if (validPassword) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            message: "Invalid Email or Password"
          }));

        case 14:
          token = user.generateAuthToken();
          res.status(200).send({
            data: token,
            message: "logged in successfully"
          });
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            message: "Internal Server Error"
          });

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
});

var validate = function validate(data) {
  var schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  return schema.validate(data);
};

module.exports = router;
//# sourceMappingURL=auth.dev.js.map
