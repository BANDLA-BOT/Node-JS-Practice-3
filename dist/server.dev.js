"use strict";

var express = require("express");

var mongoose = require("mongoose");

var fs = require('fs');

var bcrypt = require('bcrypt');

var cors = require("cors");

var _require = require("body-parser"),
    urlencoded = _require.urlencoded;

var app = express();
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors());
PORT = 8000;
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
var dashboard = fs.readFileSync('./index.html', 'utf-8'); //CREATE

app.post('/users', function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body.password);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(userModel.create({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password),
            email: req.body.email
          }));

        case 4:
          user = _context.sent;
          res.json({
            status: "ok"
          });
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.json({
            status: "error",
            error: " Duplicate email"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //LOGIN

app.post('/login', function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(userModel.findOne({
            email: req.body.email,
            password: req.body.password
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            res.json({
              status: 'okay',
              user: true
            });
          } else {
            res.json({
              status: 'Error',
              user: false
            });
          }

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
mongoose.connect("mongodb://localhost:27017/CRUD").then(function () {
  console.log("Connected to DB"); //run server

  app.listen(PORT, function () {
    console.log("Server Running on " + PORT);
  });
})["catch"](function (err) {
  return console.log(err);
});
//# sourceMappingURL=server.dev.js.map
