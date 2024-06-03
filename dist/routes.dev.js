"use strict";

var _require;

var express = require('express');

router = express.Router(), (_require = require('./controller'), sigUp = _require.sigUp, _require);
router.post('/register', signUp);
router.post('/login', signIn);
module.exports = router;
//# sourceMappingURL=routes.dev.js.map
