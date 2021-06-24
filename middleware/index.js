const express = require('express');
const auth = require('./auth');
const router = express.Router();

router.post('/news/register', auth.register);

module.exports = router;