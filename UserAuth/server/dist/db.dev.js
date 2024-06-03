"use strict";

var mongoose = require('mongoose');

module.exports = function () {
  try {
    mongoose.connect(process.env.DB);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    console.log("Could not connected to DB");
  }
};
//# sourceMappingURL=db.dev.js.map
