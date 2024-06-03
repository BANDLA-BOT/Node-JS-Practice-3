"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = require("express").Router();

var _require = require('../models/user'),
    User = _require.User,
    validate = _require.validate;

var bcrypt = require('bcrypt');

router.post('/', function _callee(req, res) {
  var _validate, error, user, salt, hashPassword;

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

          if (!user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(409).send({
            message: "User already existed with this email id"
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.genSal(Number(process.env.SALT)));

        case 11:
          salt = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 14:
          hashPassword = _context.sent;
          _context.next = 17;
          return regeneratorRuntime.awrap(new User(_objectSpread({}, req.body, {
            password: hashPassword
          })).save());

        case 17:
          res.status(201).send({
            message: "User created successfully"
          });
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            message: "Internal server error"
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
});
//# sourceMappingURL=users.dev.js.map
