"use strict";

var express = require('express');

var dotenv = require('dotenv');

var cors = require('cors');

var connection = require('./db');

var userRoutes = require('./routes/users');

var authRoutes = require('./routes/auth');

dotenv.config();
var app = express();
var port = process.env.PORT || 8080; //DB

connection(); //middlewares

app.use(express.json());
app.use(cors()); //routes

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.listen(port, function () {
  console.log('Server running on ' + port);
});
//# sourceMappingURL=server.dev.js.map
